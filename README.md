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
<br>_NOTE: `./jarvis.sh -r` will not automatically update these PKGBUILDs as they are not submodules. It's up to you to update them._

## Updating submodules
To synchronize the repository with your server you can run `./jarvis.sh -r`.

## Building
Just run `./jarvis.sh -f` to do a full build. It will update the PKGBUILDs (if possible), build the packages, create the repository list and rsync all the files from ./repository to your endpoint (specified in `config`).

You can also run `./jarvis.sh -b` to build only submodules with updates, but it's not at the best shape at the moment, so I would advice not using it. This is because some AUR packages create different packages and I haven't found a way to deal with that yet.

# License
All scripts in this repository are licensed under GNU General Public License 3.0. Full license text under [LICENSE](LICENSE)

A fork of https://gitlab.com/Scrumplex/ungoo-repoman/
