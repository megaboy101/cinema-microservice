#!/bin/bash


# Checks if there are any packages
if [ ! -d "$packages" ]; then
  echo "No packages to build"
  exit
fi

cd packages

packages=$(ls -d */)

# Iterate through each package
for package in $packages; do
  # Check if a package has been updated. Only test changed packages
  if [[ $(git status --porcelain) =~ $package ]]; then
    echo "Testing package: ${package::-1}"

    # Change into the package
    cd $package

    # Run the test script
    source scripts/test.sh

    # Change out
    cd ..
  fi
done