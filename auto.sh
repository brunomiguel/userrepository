#!/bin/bash
DIR="$(cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
set -e -x
$DIR/build.sh
$DIR/deploy.sh
$DIR/sync.sh
