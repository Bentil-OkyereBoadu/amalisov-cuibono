#!/bin/bash

# Traverses all .cds files in /srv and generates respecitve typescript types.
# Use from / with npm run generate-types.

rm -rf srv/model/*.ts

if [ -d db ];
then
    for filepath in $(find ./srv -name "*.cds");
    do
        if [ -f "$filepath" ] && [ $(basename "$filepath" .cds) != "index" ];
        then
            filename=$(basename "$filepath" .cds)
            # echo $filename
            npx cds2types --cds "$filepath" --output "srv/model/" -d -f
        fi
    done
else
    echo "Directory /srv not found"
    echo "Run script from /"
fi