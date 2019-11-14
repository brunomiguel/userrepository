#!/bin/bash
DIR="$(cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

source "$DIR/config"
export PKGEXT
export COMPRESSXZ
export PACKAGER
export GPGKEY

export BUILDDIR="$DIR/cache"
export PKGDEST="$BUILDDIR/bin"
export SRCDEST="$BUILDDIR/src"

set -e

sh repo-update.sh

pushd "$DIR/pkgbuild"

for f in *; do
    if [ -d "$f" ]; then
        echo "Processing $f..."
        pushd "$f"
        if [ -f "PKGBUILD" ]; then
            echo "Found PKGBUILD for $f. Building..."
            # clean build force overwrite
            PACMAN=/usr/local/bin/pakku makepkg -c -C -s -f --nosign --noconfirm --needed -r --skippgpcheck --skipint || :
        fi
        popd
    fi
done
