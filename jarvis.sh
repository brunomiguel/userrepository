#!/bin/bash
DIR="$(cd -P -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P)"

#set -x

source "$DIR/config"
export PKGEXT
export COMPRESSXZ
export PACKAGER
export GPGKEY

export BUILDDIR="$DIR/cache"
export PKGDEST="$BUILDDIR/bin"
export SRCDEST="$BUILDDIR/src"

shopt -s expand_aliases

alias pikaur='pikaur --needed --noprogressbar --noconfirm'

usage() {
    echo -e "$(tput bold)\e[33m\nHi. I'm Jarvis.\e[0m$(tput bold)\nTo use me, specify one of the following options:$(tput sgr0)\n\t-a: add package to repository\n\t-b: build, deploy and sync repository to webserver folder\n\t-d: delete package\n\t-r: update submodules\n\t-h: print this help message\n" ;
}

build() {
    if [ ! -f "$DIR/captains.log" ]; then
        touch "$DIR/captains.log"
    fi
    
    pushd "$DIR/pkgbuild" || exit
    
    for f in *; do
        if [ -d "$f" ]; then
            echo -e "\n\e[1;33mUpdating $f...\e[0m"
            pushd "$f" > ../noise.log 2>&1 || exit
            git clean -x -d -f -q > ../noise.log 2>&1;
            git stash --quiet > ../noise.log 2>&1;
            # rebase
            git rebase HEAD master
			# update submodules
            git pull
            git pull origin master
            # remove noise.log, used for redirecting stin, stdout and stderr and hide "noisy" output from shell
            if [ -f "../noise.log" ]; then
                rm ../noise.log
            fi
            
            # start timing the time it takes to create the package
            res1=$(date +%s.%N)

            if [ -f "PKGBUILD" ]; then
                echo "Found PKGBUILD for $f. Building..."
                # clean build force overwrite
                PACMAN="pikaur" /usr/bin/time makepkg -c -C -L -s -f --nosign --noconfirm --needed -r --skippgpcheck --skipint &> makepkg.log
                if [ $? -ne 0 ]; then
                    echo -e "\n!!! ERROR !!! in $f\n" > "$DIR/captains.log"
                fi
			else
				echo -e "PKGBUILD not found\n"
            fi

            # Stop timing the time it took to create the package \
            # and log it in makepkg.log
            res2=$(date +%s.%N)
            dt=$(echo "$res2 - $res1" | bc)
            dd=$(echo "$dt/86400" | bc)
            dt2=$(echo "$dt-86400*$dd" | bc)
            dh=$(echo "$dt2/3600" | bc)
            dt3=$(echo "$dt2-3600*$dh" | bc)
            dm=$(echo "$dt3/60" | bc)
            ds=$(echo "$dt3-60*$dm" | bc)
            LC_NUMERIC=C printf "Total runtime: %02d:%02d:%02.4f\n" $dh $dm $ds >> makepkg.log

            popd > /dev/null 2>&1 || exit
        fi
    done
    popd || exit
    
}

refresh() {
    pushd "$DIR/pkgbuild" > /dev/null 2>&1 || exit
    echo -e "\n\e[1;33mUpdating submodules...\e[0m"
    
    # update all submodules
    for D in */; do
        cd "$D" || exit;
        echo -e "\n\e[1;34mupdating $D\e[0m"
        # clean unwanted changes made to submodules locally
        git clean -x -d -f -q > ../noise.log 2>&1;
        git stash --quiet > ../noise.log 2>&1;
        # rebase
        git rebase HEAD master
        # update submodules
        git pull
        git pull origin master
        # remove noise.log, used for redirecting stin, stdout and stderr and hide "noisy" output from shell
        if [ -f "../noise.log" ]; then
            rm ../noise.log
        fi
        cd ..;
	sleep 0.25s;
    done
    popd > /dev/null 2>&1 || exit
}

deploy() {
    # move built packages to cache/
    pushd "$DIR/repository" > /dev/null 2>&1 || exit
    for f in *"${PKGEXT}"; do
        [ -f "$f" ] || break
        echo -e "\e[1;33mArchiving $f...\e[0m"
        mv "$f" "$BUILDDIR"
    done
    
    # add built packages to repository database
    for f in "${PKGDEST}"/*"${PKGEXT}"; do
        [ -f "$f" ] || break
        echo -e "\e[1;33mDeploying $f...\e[0m"
        mv "$f" "./"
        repo-add -R -s -v "${REPONAME}.db.tar.gz" "$(basename "$f")"
    done
    popd || exit
}

sync() {
    rsync --copy-links --delete -avr "$DIR/repository/" "$REMOTE"
}

add() {
    git submodule add --force https://aur.archlinux.org/"$pkg" ./pkgbuild/"$pkg"
}

delete() {
	#pushd "$DIR" || exit
    	git rm --cached "$DIR/pkgbuild/${OPTARG}"
    	rm -rf "$DIR/pkgbuild/${OPTARG}"
    	git commit -m "Removed ${OPTARG} submodule"
    	#rm -rf "$DIR/.git/modules/pkgbuild/${OPTARG}"
    	git config -f .gitmodules --remove-section "submodule.pkgbuild/${OPTARG}"
    	git config -f .git/config --remove-section "submodule.pkgbuild/${OPTARG}"
    #popd || exit
}

# script options
[ $# -eq 0 ] && usage
while getopts "ad:rbh:" arg; do
    case $arg in
        a) shift $(( OPTIND - 1 )); for pkg in "$@"; do add; done ;;
        b) pikaur -Syyuv; build; deploy; sync; rm noise.log; grep -rnw 'pkgbuild/' -e 'Total runtime'; exit 0 ;;
        r) pikaur -Syyuv; refresh ;;
        d) delete ;;
        h) usage ;;
        *) usage ;;
    esac
done
