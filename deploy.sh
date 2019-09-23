#!/bin/bash
DIR="$(cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

source "$DIR/config"

BUILDDIR="$DIR/cache"
PKGDEST="$BUILDDIR/bin"

set -e

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
