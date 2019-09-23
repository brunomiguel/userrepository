#!/bin/bash

DIR="$(cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

set -e

pushd "$DIR/pkgbuild"

# update all submodules
for D in */; do
    cd $D;
    echo -e "\e[1m$D\e[0m";
    git clean -x -d -f;
    git pull --progress;
    echo -e "\n";
    #sleep .002s;
    cd ..;
done
