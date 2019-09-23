#!/bin/bash
DIR="$(cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

source "$DIR/config"
set -e

rsync --copy-links --delete -avr "$DIR/repository/" "$REMOTE"
