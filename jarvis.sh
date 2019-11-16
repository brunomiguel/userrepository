#!/bin/bash
DIR="$(cd -P -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P)"

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

case $1 in
    -a|--auto) pakku -Syyyuv; refresh; build; deploy; sync ;;
    -b|--build) refresh; build ;;
    -r|--refresh) pakku -Syyyuv; refresh ;;
    -h|--help) echo -e "\n$(tput bold)Use one of the following options:$(tput sgr0)\n\t-a --auto: build, deploy and sync repository to webserver folder\n\t-b --build: build packages\n\t-r --refresh: update submodules\n\t-h --help: print this help message\n" ;;
    *) echo -e "\n$(tput bold)Use one of the following options:$(tput sgr0)\n\t-a --auto: build, deploy and sync repository to webserver folder\n\t-b --build: build packages\n\t-r --refresh: update submodules\n\t-h --help: print this help message\n" ;;
esac