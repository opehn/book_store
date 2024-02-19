#!/bin/bash

# Check if the user provided an argument
if [ -z "$1" ]; then
    echo "Usage: $0 <username>"
    exit 1
fi

# Define the source and destination directories
source_dir="."
destination_dir="apps"
username="$1"

# Move user-related files from data, routes, and services folders to apps/users
cp $source_dir/data/dbAccess/${username}* $destination_dir/${username}
cp $source_dir/routes/${username}* $destination_dir/${username}
cp $source_dir/services/${username}* $destination_dir/${username}

echo "Files starting with '$username' moved to $destination_dir folder."

