#!/bin/bash
DIR="$(cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

cd $DIR

git rm --cached "$DIR/pkgbuild/$1"
rm -rf "$DIR/pkgbuild/$1"
git commit -m "Removed $1 submodule"
rm -rf ".git/modules/$DIR/pkgbuild/$1"
git config -f .gitmodules --remove-section "submodule.$DIR/pkgbuild/$1"
git config -f .git/config --remove-section "submodule.$DIR/pkgbuild/$1"
