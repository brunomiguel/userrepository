A fork from https://gitlab.com/Scrumplex/ungoo-repoman/

Jarvis
-----
Custom repository manager for pacman repositories.

# Usage
Customize the `config` file to your needs.

## Adding PKGBUILDs
#### AUR
If you want to create a repository for AUR packages you can just use the `addaurpkg.sh` script:
```
$ ./jarvis.sh -a packagename
```
It will automatically fetch it from the AUR and also update it on every build.

#### From Git
If you want to add a PKGBUILD from a git repository just add it as an submodule like this:
```sh
$ git submodule add "http://my.git.url/mypkgbuild.git" "pkgbuild/mypkgbuild"
```
It will automatically fetch it from the URL and also update it on every build.

#### Manually
You can just create a corresponding directory in the `pkgbuild` directory and put your PKGBUILD there.
_NOTE: `./jarvis -r` will not automatically update these PKGBUILDs as they are not submodules. It's up to you to update them._

## Updating submodules
To synchronize the repository with your server you can run `./jarvis.sh -r`.

## Building
Just run `./jarvis.sh -b`. It will update the PKGBUILDs (if possible), build the packages, create the repository list and rsync all the files from ./repository to your endpoint (specified in `config`).

# License
All scripts in this repository are licensed under GNU General Public License 3.0. Full license text under [LICENSE](LICENSE)
