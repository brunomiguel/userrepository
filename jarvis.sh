#
# SPDX-FileCopyrightText: 2020 Bruno Miguel <bruno@privacyrequired.com>
#
# SPDX-License-Identifier: GPL-3.0-only
#

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
    echo -e "$(tput bold)\e[33m\nHi. I'm Jarvis.\e[0m$(tput bold)\nTo make use of my immense powers, specify one of the following options:$(tput sgr0)\n\t-a: add package to repository\n\t-b: build updated packages, deploy, and sync repository to webserver folder and with the mirrors\n\t-f: full build, deploy, and sync repository to webserver folder and with the mirrors\n\t-d: delete package\n\t-r: update submodules\n\t-m: sync packages with the mirrors\n\t-h: print this help message\n" ;
}

build() {

    if [ ! -f "$DIR/captains.log" ]; then
        touch "$DIR/captains.log"
    fi

    # clean cache/bin before proceding
    rm -rfv "$HOME"/userrepository/cache/bin

    # fix for pikaur lock file in /tmp
    sudo rm /tmp/pikaur_build_deps.lock

    cd "$DIR/pkgbuild" || exit

    for f in *; do
        if [ -d "$f" ]; then
            echo -e "\n\e[1;33mUpdating $f...\e[0m"

            cd "$f" >../noise.log 2>&1 || exit

            # remove artifacts from previous builds
            git clean -x -d -f -q >../noise.log 2>&1
            git stash --quiet >../noise.log 2>&1

            # rebase AUR git and git outside AUR
            git rebase HEAD master
            git rebase HEAD main
            git rebase HEAD master

            git fetch --all
            git remote update

            # set local function variables for building only updated git repositories
            local GITUPSTREAM=${1:-'@{u}'}
            local GITLOCAL=$(git rev-parse @)
            local GITREMOTE=$(git rev-parse "$GITUPSTREAM")
            local GITBASE=$(git merge-base @ "$GITUPSTREAM")

            # set local variable to get package name using the working dir name
            # local NAME=$(pwd | rev | cut -f1 -d'/' - | rev)

            # remove noise.log, used for redirecting stin, stdout and stderr and hide "noisy" output from shell
            if [ -f "../noise.log" ]; then
                rm ../noise.log
            fi

            # check if local revision is the same as the remote revision
            if [ "$GITLOCAL" = "$GITREMOTE" ]; then
                echo "Already up-to-date. Skipping..."

                # update out-of-date submodule for building the package
            else

                # update package revision
                git pull origin main
                git pull origin master

                # start timing the time it takes to create the package
                res1=$(date +%s.%N)

                # check if PKGBUILD exists
                if [ -f "PKGBUILD" ]; then
                    echo "Found PKGBUILD for $f. Building..."

                    # clean build force overwrite
                    export _subarch=38
                    export _microarchitecture=93
                    export use_trackers=n
                    export _compiler=clang
                    export _config=config_x84-64-v3
                    export _compress_modules=y
                    export _projectc='bmq'
                    export _use_llvm_lto=y
                    export _config=config_x86-64-v3
                    
                    PACMAN="pikaur" /usr/bin/time makepkg -c -C -L -s -f --nosign --noconfirm --needed -r --skippgpcheck --skipint &>makepkg.log

                    # copy package to remote dir with rsync, deleting the old version
                    #rsync --copy-links --delete -avr "$PKGDEST"/*.zst "$REMOTE"

                    # add new package version to the package index, but remove the index first to avoid index corruption
                    #rm -v "$REMOTE/"userrepository.db* "$REMOTE"/userrepository.file*
                    #repo-add -n -R -s -v "$REMOTE/$REPONAME".db.tar.gz "$REMOTE/"*.zst

                    # clean cached files
                    pikaur -Sccc --noconfirm
                    #rm -rfv "$HOME"/userrepository/cache/"$f"/{src,.git} "$HOME"/userrepository/cache/src "$HOME"/userrepository/cache/bin

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
                    LC_NUMERIC=C printf "Total runtime: %02d:%02d:%02.4f\n" "$dh" "$dm" "$ds" >>makepkg.log
                else
                    # display error
                    echo -e "PKGBUILD not found\n"
                fi
            fi
        fi

        echo "sleeping for 20 seconds"
        sleep 20s

        cd .. 2>&1 || exit
    done

    # always build for -git packages
    # for now, in a hackish state
    echo -e "\nBuilding *-git packages\n"

    for g in *-git; do

        if [ -d "$g" ]; then
            echo -e "\n\e[1;33mUpdating $g...\e[0m"

            cd "$g" >../noise.log 2>&1 || exit

            # remove artifacts from previous builds
            git clean -x -d -f -q >../noise.log 2>&1
            git stash --quiet >../noise.log 2>&1

            # rebase AUR git and git outside AUR
            git rebase HEAD master
            git rebase HEAD main

            # remove noise.log, used for redirecting stin, stdout and stderr and hide "noisy" output from shell
            if [ -f "../noise.log" ]; then
                rm ../noise.log
            fi

            # update package revision
            git pull origin main
            git pull origin master

            # start timing the time it takes to create the package
            res1=$(date +%s.%N)

            # check if PKGBUILD exists
            if [ -f "PKGBUILD" ]; then
                echo "Found PKGBUILD for $g. Building..."

                # clean build force overwrite
                PACMAN="pikaur" /usr/bin/time makepkg -c -C -L -s -f --nosign --noconfirm --needed -r --skippgpcheck --skipint &>makepkg.log

                # copy package to remote dir with rsync, deleting the old version
                #rsync --copy-links --delete -avr "$PKGDEST"/*.zst "$REMOTE"

                # add new package version to the package index, but remove the index first to avoid index corruption
                #rm -v "$REMOTE/"userrepository.db* "$REMOTE"/userrepository.file*
                #repo-add -n -R -s -v "$REMOTE/$REPONAME".db.tar.gz "$REMOTE/"*.zst

                # clean cached files
                pikaur -Sccc --noconfirm
                #rm -rfv "$HOME"/userrepository/cache/"$f"/{src,.git} "$HOME"/userrepository/cache/src "$HOME"/userrepository/cache/bin
                
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
                LC_NUMERIC=C printf "Total runtime: %02d:%02d:%02.4f\n" "$dh" "$dm" "$ds" >>makepkg.log
            else
                # display error
                echo -e "PKGBUILD not found\n"
            fi
        fi

        echo "sleeping for 20 seconds"
        sleep 20s

        cd .. 2>&1 || exit
    done

    # copy newly created packages to $REMOTE
    rsync --copy-links --delete -avr "$PKGDEST"/*.zst "$REMOTE"

    # change the working folder to $REMOTE and add new package version to the package index, but remove the index first to avoid index corruption
    cd "$REMOTE" || exit
    rm -v userrepository.db* userrepository.file*
    repo-add -n -R -s -v "$REPONAME".db.tar.gz *.zst

    # clean newly build files from $PKGDEST
    rm -rfv "$HOME"/userrepository/cache/*

    # return to the script's directory
    cd "$DIR" || exit
}

testbuild() {

    if [ ! -f "$DIR/captains.log" ]; then
        touch "$DIR/captains.log"
    fi

    # clean cache/bin before proceding
    rm -rfv "$HOME"/userrepository/cache/bin

    # fix for pikaur lock file in /tmp
    sudo rm /tmp/pikaur_build_deps.lock

    cd "$DIR/pkgbuild" || exit
    echo -e "\n$(pwd)\n"

    for h in `find . -maxdepth 1 -mindepth 1 -type d -not -name '*-git' | sort`; do
        if [ -d "$h" ]; then
            echo -e "\n\e[1;33mUpdating $h...\e[0m"

            cd "$h" >../noise.log 2>&1 || exit

            # remove artifacts from previous builds
            git clean -x -d -f -q >../noise.log 2>&1
            git stash --quiet >../noise.log 2>&1

            # rebase AUR git and git outside AUR
            git rebase HEAD master
            git rebase HEAD main
            git rebase HEAD master

            git fetch --all
            git remote update

            # set local function variables for building only updated git repositories
            local GITUPSTREAM=${1:-'@{u}'}
            local GITLOCAL=$(git rev-parse @)
            local GITREMOTE=$(git rev-parse "$GITUPSTREAM")
            local GITBASE=$(git merge-base @ "$GITUPSTREAM")

            # set local variable to get package name using the working dir name
            # local NAME=$(pwd | rev | cut -f1 -d'/' - | rev)

            # remove noise.log, used for redirecting stin, stdout and stderr and hide "noisy" output from shell
            if [ -f "../noise.log" ]; then
                rm ../noise.log
            fi

            # check if local revision is the same as the remote revision
            if [ "$GITLOCAL" = "$GITREMOTE" ]; then
                echo "Already up-to-date. Skipping..."

                # update out-of-date submodule for building the package
            else

                # update package revision
                git pull origin main
                git pull origin master

                # start timing the time it takes to create the package
                res1=$(date +%s.%N)

                # check if PKGBUILD exists
                if [ -f "PKGBUILD" ]; then
                    echo "Found PKGBUILD for $h. Building..."

                    # clean build force overwrite
					export _subarch=38
                    export _microarchitecture=93
                    export use_trackers=n
                    export _compiler=clang
                    export _config=config_x84-64-v3
                    export _compress_modules=y
                    export _projectc='bmq'
                    export _use_llvm_lto=y
                    export _config=config_x86-64-v3
                    
                    PACMAN="pikaur" /usr/bin/time makepkg -c -C -L -s -f --nosign --noconfirm --needed -r --skippgpcheck --skipint &>makepkg.log

                    # copy package to remote dir with rsync, deleting the old version
                    #rsync --copy-links --delete -avr "$PKGDEST"/*.zst "$REMOTE"

                    # add new package version to the package index, but remove the index first to avoid index corruption
                    #rm -v "$REMOTE/"userrepository.db* "$REMOTE"/userrepository.file*
                    #repo-add -n -R -s -v "$REMOTE/$REPONAME".db.tar.gz "$REMOTE/"*.zst

                    # clean cached files
                    pikaur -Sccc --noconfirm
                    #rm -rfv "$HOME"/userrepository/cache/"$f"/{src,.git} "$HOME"/userrepository/cache/src "$HOME"/userrepository/cache/bin

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
                    LC_NUMERIC=C printf "Total runtime: %02d:%02d:%02.4f\n" "$dh" "$dm" "$ds" >>makepkg.log
                else
                    # display error
                    echo -e "PKGBUILD not found\n"
                fi
            fi
        fi

        echo "sleeping for 20 seconds"
        sleep 20s

        cd .. 2>&1 || exit
    done

    # always build for -git packages
    echo -e "\nBuilding *-git packages\n"

    for i in *-git; do
        if [ -d "$i" ]; then
            echo -e "\n\e[1;33mUpdating $i...\e[0m"

            cd "$i" >../noise.log 2>&1 || exit

            # remove artifacts from previous builds
            git clean -x -d -f -q >../noise.log 2>&1
            git stash --quiet >../noise.log 2>&1

            # rebase AUR git and git outside AUR
            git rebase HEAD master
            git rebase HEAD main

            # remove noise.log, used for redirecting stin, stdout and stderr and hide "noisy" output from shell
            if [ -f "../noise.log" ]; then
                rm ../noise.log
            fi

            # update package revision
            git pull origin main
            git pull origin master

            # start timing the time it takes to create the package
            res1=$(date +%s.%N)

            # check if PKGBUILD exists
            if [ -f "PKGBUILD" ]; then
                echo "Found PKGBUILD for $i. Building..."

                # clean build force overwrite
                PACMAN="pikaur" /usr/bin/time makepkg -c -C -L -s -f --nosign --noconfirm --needed -r --skippgpcheck --skipint &>makepkg.log

                # copy package to remote dir with rsync, deleting the old version
                #rsync --copy-links --delete -avr "$PKGDEST"/*.zst "$REMOTE"

                # add new package version to the package index, but remove the index first to avoid index corruption
                #rm -v "$REMOTE/"userrepository.db* "$REMOTE"/userrepository.file*
                #repo-add -n -R -s -v "$REMOTE/$REPONAME".db.tar.gz "$REMOTE/"*.zst

                # clean cached files
                pikaur -Sccc --noconfirm
                #rm -rfv "$HOME"/userrepository/cache/"$f"/{src,.git} "$HOME"/userrepository/cache/src "$HOME"/userrepository/cache/bin
                
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
                LC_NUMERIC=C printf "Total runtime: %02d:%02d:%02.4f\n" "$dh" "$dm" "$ds" >>makepkg.log
            else
                # display error
                echo -e "PKGBUILD not found\n"
            fi
        fi

        echo "sleeping for 20 seconds"
        sleep 20s

        cd .. 2>&1 || exit
    done

    # copy newly created packages to $REMOTE
    rsync --copy-links --delete -avr "$PKGDEST"/*.zst "$REMOTE"

    # change the working folder to $REMOTE and add new package version to the package index, but remove the index first to avoid index corruption
    cd "$REMOTE" || exit
    rm -v userrepository.db* userrepository.file*
    repo-add -n -R -s -v "$REPONAME".db.tar.gz *.zst

    # clean newly build files from $PKGDEST
    rm -rfv "$HOME"/userrepository/cache/*

    # return to the script's directory
    cd "$DIR" || exit
}

fullbuild() {
    if [ ! -f "$DIR/captains.log" ]; then
        touch "$DIR/captains.log"
    fi

    # fix for pikaur lock file in /tmp
    sudo rm /tmp/pikaur_build_deps.lock
        
    #pushd "$DIR/pkgbuild" || exit
    cd "$DIR/pkgbuild" || exit
    
    for f in *; do
        if [ -d "$f" ]; then
            echo -e "\n\e[1;33mUpdating $f...\e[0m"
            #pushd "$f" > ../noise.log 2>&1 || exit
            
            cd "$f" > ../noise.log 2>&1 || exit

            git clean -x -d -f -q > ../noise.log 2>&1;
            git stash --quiet > ../noise.log 2>&1;

            # rebase AUR git and git outside AUR
            git rebase HEAD master
            git rebase HEAD main

            # update submodules
            git pull origin main
            git pull origin master
            
            # remove noise.log, used for redirecting stin, stdout and stderr and hide "noisy" output from shell
            if [ -f "../noise.log" ]; then
                rm ../noise.log
            fi
            
            # start timing the time it takes to create the package
            res1=$(date +%s.%N)
            #rm -rfv $HOME/userrepository/cache/$f/{src,.git}
            #rm -rfv $HOME/userrepository/cache/$f/.git

            if [ -f "PKGBUILD" ]; then
                echo "Found PKGBUILD for $f. Building..."
                # clean build force overwrite
				export _subarch=38
                export _microarchitecture=93
                export use_trackers=n
                export _compiler=clang
                export _config=config_x84-64-v3
                export _compress_modules=y
                export _projectc='bmq'
                export _use_llvm_lto=y
                export _config=config_x86-64-v3
                
                PACMAN="pikaur" /usr/bin/time makepkg -c -C -L -s -f --nosign --noconfirm --needed -r --skippgpcheck --skipint &> makepkg.log

                # clean cached files
                pikaur -Sccc --noconfirm
                rm -rfv "$HOME"/userrepository/cache/"$f"/{src,.git} "$HOME"/userrepository/cache/src

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
            LC_NUMERIC=C printf "Total runtime: %02d:%02d:%02.4f\n" "$dh" "$dm" "$ds" >> makepkg.log

            #popd > /dev/null 2>&1 || exit
            cd .. 2>&1 || exit
        fi
    done
    #popd || exit
    
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
        git rebase HEAD main

        # update submodules
        git pull origin main
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
    # Jarvis needs to clean itself better after syncing the packages to $REMOTE
    # this allows it to avoid running out of disk space after a several runs
    rm -rfv "$DIR"/repository/*
    rm -rfv "$DIR"/cache/*
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

mirror_sync() {
	rsync -rtlvH --delete-after --delay-updates --safe-links "$REMOTE" userrepository@us.mirrors.fossho.st:/
	rsync -rtlvH --delete-after --delay-updates --safe-links "$REMOTE" userrepository@uk.mirrors.fossho.st:/
}

# script options
[ $# -eq 0 ] && usage
while getopts "ad:rbfmth:" arg; do
    case $arg in
        a) shift $(( OPTIND - 1 )); for pkg in "$@"; do add; done ;;
        b) pikaur -Syyuv --noconfirm; build; mirror_sync; exit 0;;
        f) pikaur -Syyuv --noconfirm; fullbuild; deploy;sync; mirror_sync; sudo pacman -Rsc plasma gnome vlc --noconfirm; grep -rnw 'pkgbuild/' -e 'Total runtime'; exit 0 ;;
        r) pikaur -Syyuv; refresh ;;
        d) delete ;;
        m) mirror_sync ;;
        h) usage ;;
        t) pikaur -Syyuv --noconfirm; testbuild; mirror_sync; exit 0;;
        *) usage ;;
    esac
done
