A fork from https://gitlab.com/Scrumplex/ungoo-repoman/

repoman
-----
Custom repository manager for pacman repositories.

# Usage
Customize the `config` file to your needs.

## Adding PKGBUILDs
### AUR
If you want to create a repository for AUR packages you can just use the `addaurpkg.sh` script:
```
$ ./addaurpkg.sh packagename
```
It will automatically fetch it from the AUR and also update it on every build.

### From Git
If you want to add a PKGBUILD from a git repository just add it as an submodule like this:
```sh
$ git submodule add "http://my.git.url/mypkgbuild.git" "pkgbuild/mypkgbuild"
```
It will automatically fetch it from the URL and also update it on every build.

### Manually
You can just create a corresponding directory in the `pkgbuild` directory and put your PKGBUILD there. NOTE: repoman will not automatically update these PKGBUILDs.

## Building
Just run the `build.sh` script. It will update the PKGBUILDs (if possible) and build the packages.

## Deploying
To add the built packages to a repository database just run the `deploy.sh` script. It will remove all packages of the repository and replace them with the newly built.

## Syncing
To synchronize the repository with your server you can run the `sync.sh` script. It will rsync all the files from `./repository` to your endpoint (specified in config).

## Combined
If you just want to do the three actions above at once just run the `auto.sh`, which just runs `build.sh`, `deploy.sh` and `sync.sh` in order.

# License
All scripts in this repository are licensed under GNU General Public License 3.0. Full license text under [LICENSE](LICENSE)
