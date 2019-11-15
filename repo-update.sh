#!/bin/bash
#DIR="$(cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
DIR="$(cd -P -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P)"

set -e

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
