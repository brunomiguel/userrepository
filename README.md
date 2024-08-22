Jarvis
-----
Custom repository manager for pacman repositories.

-----

```
## This project is currently in hibernation, but as of 22/08/2024, it should only need very minor adjustments, if at all, to work (excluding the submodules in pkgbuild/, as some might no longer be active)
```

-----

# Usage
Customize the `config` file to your needs.

## Adding PKGBUILDs
#### AUR
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
To only update all the submodules, run `./jarvis.sh -r`. The script will check if there are new versions on AUR or the git repository for the packages and update them to the newest version.

## Building
Just run `./jarvis.sh -f` to do a full build. It will update the PKGBUILDs (if possible), build the packages, create the repository list and rsync all the files from ./repository to your endpoint (specified in `config`).

You can also run `./jarvis.sh -b` to build only updated submodules and all the *.git submodules. This way, even if an AUR *-git package isn't updated to display the newest version, the script will build the latest version of that package (provided the PKGBUILD file is well created).

# License
All scripts in this repository are licensed under GNU General Public License 3.0. Full license text under [LICENSE](LICENSE)

A fork of https://gitlab.com/Scrumplex/ungoo-repoman/
