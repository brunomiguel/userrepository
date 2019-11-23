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

build() {
    if [ ! -f "$DIR/captains.log" ]
    then
        touch "$DIR/captains.log"
    fi

    pushd "$DIR/pkgbuild"

        for f in *; do
            if [ -d "$f" ]; then
                echo "Processing $f..."
                pushd "$f"
                if [ -f "PKGBUILD" ]; then
                    echo "Found PKGBUILD for $f. Building..."
                    # clean build force overwrite
                    PACMAN=/usr/local/bin/pakku makepkg -c -C -s -f --nosign --noconfirm --needed -r --skippgpcheck --skipint
                        if [ $? -ne 0 ]
                        then
                            echo -e "\n!!! ERROR !!! in $f\n" > "$DIR/captains.log"
                        fi
                fi
                popd
            fi
        done
    popd

}

refresh() {
    pushd "$DIR/pkgbuild"

        # update all submodules
        for D in */; do
            cd $D;
            echo -e "\e[1m$D\e[0m";
            git clean -x -d -f;
            git stash;
            git pull --progress;
            echo -e "\n";
            #sleep .002s;
            cd ..;
        done
    popd
}

deploy() {
    # move built packages to cache/
    pushd "$DIR/repository"
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
    popd
}

sync() {
    rsync --copy-links --delete -avr "$DIR/repository/" "$REMOTE"
}

add() {
    git submodule add "https://aur.archlinux.org/${i#*}" "./pkgbuild/${i#*}"
}

delete() {
    git rm --cached "$DIR/pkgbuild/$package"
    rm -rf "$DIR/pkgbuild/$package"
    git commit -m "Removed $package submodule"
    rm -rf ".git/modules/$DIR/pkgbuild/$package"
    git config -f .gitmodules --remove-section "submodule.pkgbuild/$package"
    git config -f .git/config --remove-section "submodule.pkgbuild/$package"
}

case $1 in
    -a|--add) git submodule add "https://aur.archlinux.org/$2" "./pkgbuild/$2" --force ;;
    -b|--build) pakku -Syyyuv; refresh; build; deploy; sync ;;
    -d|--delete) delete ;;
    -r|--refresh) pakku -Syyyuv; refresh ;;
    -h|--help) echo -e "\n$(tput bold)Use one of the following options:$(tput sgr0)\n\t-a, --add: add package to repository\n\t-b, --build: build, deploy and sync repository to webserver folder\n\t-d, --delete: delete package\n\t-r, --refresh: update submodules\n\t-h, --help: print this help message\n" ;;
    *) echo -e "\n$(tput bold)Use one of the following options:$(tput sgr0)\n\t-a, --add: add package to repository\n\t-b, --build: build, deploy and sync repository to webserver folder\n\t-d, --delete: delete package\n\t-r, --refresh: update submodules\n\t-h, --help: print this help message\n" ;;
esac