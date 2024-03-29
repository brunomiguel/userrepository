#
# SPDX-FileCopyrightText: 2020 Bruno Miguel <bruno@privacyrequired.com>
#
# SPDX-License-Identifier: GPL-3.0-only
#

#!/bin/bash

# Go to the $HOME folder, where the "junk" is
cd $HOME

# Remove all the junk
#
# TODO
# Put these paths in a list and iterate through them
sudo rm go/ .cargo/ .npm/* .yarn/ .nvm/* .cache/* .electron-gyp/ .dotnet/* .nimble/ .flutter .freeplane/* .slime/* .node-gyp/* .subversion/* .stack/* .lein/* .pub-cache/* .dart/ .java/* .pnpm-store/* .nuget/* .m2/* .timetrace/* .vst3/* .ccache/* .nvm/* .cache/ .gradle/ .local/share/godot .local/share/pnpm -rf; sudo pacman -Sccc; pikaur -Sccc; paru -Sccc
