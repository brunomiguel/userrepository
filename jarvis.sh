#!/bin/bash

build() {
    DIR="$(cd -P -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P)"

    source "$DIR/config"
    export PKGEXT
    export COMPRESSXZ
    export PACKAGER
    export GPGKEY

    export BUILDDIR="$DIR/cache"
    export PKGDEST="$BUILDDIR/bin"
    export SRCDEST="$BUILDDIR/src"

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
    sh repo-update.sh
}

case $1 in
    -a|--auto) pakku -Syyyuv; refresh; build ;;
    -b|--build) refresh; build ;;
    -r|--refresh) refresh ;;
    -h|--help) echo -e "\t-a --auto: full chain of commands\n\t-b --build: build packages\n\t-r --refresh: update submodules\n\t-h --help: print this help message" ;;
    *) echo "Sorry, didn't understand $1, please try again." ;;
esac