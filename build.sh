#!/bin/bash
set -eu
if [ $# -ne 1 ]; then
  echo "Usage: environment target"
  echo "ex) sh build.sh guardian | user"
  exit 1
fi
# change app config
rm capacitor.config.json
cp capacitor.config.$1.json capacitor.config.json
# change config
cd src/
rm config.ts
cp config.$1.ts config.ts
#  build
cd ../
ionic capacitor copy android --prod
ionic capacitor copy ios --prod
echo "Using environment config: $1"