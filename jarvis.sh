#!/bin/bash

case $1 in
   -b) yay -Syyyuv; sh build.sh ;;
   -d) sh deploy.sh ;;
   -s) sh sync.sh ;;
   -a) yay -Syyyuv; sh build.sh; sh deploy.sh; sh sync.sh ;;
   -h) echo -e "\t-a auto (full chain of commands)\n\t-b build (build packages)\n\t-d deploy (add packages to repository database)\n\t-s sync (copy packages and repo files to webserver dir)\n\t-h print this help message" ;;
    *) echo "Sorry, didn't understand $1, please try again." ;;
esac