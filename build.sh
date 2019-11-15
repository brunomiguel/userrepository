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

if [ ! -f "$DIR/captains.log" ]
then
	touch $DIR/captains.log
fi

pushd "$DIR/pkgbuild"

for f in *; do
    if [ -d "$f" ]; then
        echo "Processing $f..."
        pushd "$f"
        if [ -f "PKGBUILD" ]; then
            echo "Found PKGBUILD for $f. Building..."
            # clean build force overwrite
            PACMAN=/usr/local/bin/pakku makepkg -c -C -s -f --nosign --noconfirm --needed -r --skippgpcheck --skipint &> $DIR/captains.log || :
				#if [ $? -eq 0 ]
				#then
					#echo "sem erro" >&2
				#else
  					#echo "!!! ERRO !!!" >&2
				#fi
        fi
        popd
    fi
done

echo "Captains log for userrepository" | mail -s "build log" brunoalexandremiguel@gmail.com -A $DIR/captains.log