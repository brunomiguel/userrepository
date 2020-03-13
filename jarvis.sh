#!/bin/bash
DIR="$(cd -P -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P)"

#set -x

source "$DIR/config"
export PKGEXT
export COMPRESSXZ
export PACKAGER
export GPGKEY

export BUILDDIR="$DIR/cache"
export PKGDEST="$BUILDDIR/bin"
export SRCDEST="$BUILDDIR/src"

usage() {
    echo -e "$(tput bold)\e[33m\nHi. I'm Jarvis.\e[0m$(tput bold)\nTo use me, specify one of the following options:$(tput sgr0)\n\t-a: add package to repository\n\t-b: build, deploy and sync repository to webserver folder\n\t-d: delete package\n\t-r: update submodules\n\t-h: print this help message\n" ;
}

build() {
    if [ ! -f "$DIR/captains.log" ]
    then
        touch "$DIR/captains.log"
    fi

    pushd "$DIR/pkgbuild" || exit

        for f in *; do
            if [ -d "$f" ]; then
                echo "\n[1;33m;Processing $f...\e[0m"
                pushd "$f" || exit
                if [ -f "PKGBUILD" ]; then
                    echo "Found PKGBUILD for $f. Building..."
                    # clean build force overwrite
                    PACMAN=aurman makepkg -c -C -L -s -f --nosign --noconfirm --needed -r --skippgpcheck --skipint &> makepkg.log
                        if [ $? -ne 0 ]
                        then
                            echo -e "\n!!! ERROR !!! in $f\n" > "$DIR/captains.log"
                        fi
                fi
                popd || exit
            fi
        done
    popd || exit

}

refresh() {
    pushd "$DIR/pkgbuild" || exit
    	echo -e "\n\e[1;33mUpdating submodules...\e[0m"

        # update all submodules
        for D in */; do
            cd "$D" || exit;
            #echo -e "\e[1m$D\e[0m";
            git clean -x -d -f -q > ../noise.log 2>&1;
            git stash drop --quiet > ../noise.log 2>&1;
            git pull -q > ../noise.log 2>&1;
            if [ $? -ne 0 ]
            then
            	echo -e "$D updated\n";
            fi
            if [ -f "../noise.log" ]
            then
            	rm ../noise.log
            fi
            cd ..;
        done
    popd || exit
}

deploy() {
    # move built packages to cache/
    pushd "$DIR/repository" || exit
        for f in *${PKGEXT}; do
            [ -f "$f" ] || break
            echo "Archiving $f..."
            mv "$f" "$BUILDDIR"
        done

        # add built packages to repository database
        for f in ${PKGDEST}/*${PKGEXT}; do
            [ -f "$f" ] || break
            echo "Deploying $f..."
            mv "$f" "./"
            repo-add -s -v "${REPONAME}.db.tar.gz" "$(basename "$f")"
        done
    popd || exit
}

sync() {
    rsync --copy-links --delete -avr "$DIR/repository/" "$REMOTE"
}

add() {
    git submodule add --force https://aur.archlinux.org/"$pkg" ./pkgbuild/"$pkg"
}

delete() {
    git rm --cached "$DIR/pkgbuild/${OPTARG}"
    rm -rf "$DIR/pkgbuild/${OPTARG}"
    git commit -m "Removed ${OPTARG} submodule"
    rm -rf ".git/modules/$DIR/pkgbuild/${OPTARG}"
    git config -f .gitmodules --remove-section "submodule.pkgbuild/${OPTARG}"
    git config -f .git/config --remove-section "submodule.pkgbuild/${OPTARG}"
}

# NEW OPTIONS IN ALPHA STATE
[ $# -eq 0 ] && usage
while getopts "a:rbd:" arg; do
  case $arg in
    a) shift $(( OPTIND - 2 )); for pkg in "$@"; do add; done ;;
    b) pakku -Syyyuv; refresh; build; deploy; sync ;;
    r) pakku -Syyyuv; refresh ;;
    d) delete ;;
    h) usage ;;
    *) usage ;;
  esac
done