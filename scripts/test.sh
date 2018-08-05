#!/bin/bash

# Checks if there are any packages
if [ ! -d "packages" ]; then
  echo "No packages to test"
  exit
fi

cd packages

packages=$(ls -d */)

# Iterate through each package
for package_route in $packages; do
  # Check if a package has been updated. Only test changed packages
  if [[ $(git status --porcelain) =~ $package ]]; then
    echo "Testing package: ${package::-1}"

    # Change into the package
    cd $package

    # Run the test script if it exists
    if [ -d "scripts/test.sh" ]; then
      source scripts/test.sh
    else
      echo "No testing script for package $package"
    fi

    # Change out
    cd ..
  fi
done