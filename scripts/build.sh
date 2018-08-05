#!/bin/bash

# Checks if there are any packages
if [ ! -d "packages" ]; then
  echo "No packages to build"
  exit
fi

cd packages

packages=$(ls -d */)

# Iterate through each package
for package_route in $packages; do
  # Check if a package has been updated. Only push changed packages
  if [[ $(git status --porcelain) =~ $package_route ]]; then

    package=${package_route::-1}

    # Change into the package
    cd $package

    # Only build packages with necessary config
    if [ -f "Dockerfile" ]; then
      echo "Building package: $package"
      # Build into an image
      docker build . -t $DOCKER_USERNAME/$package:latest
    else
      echo "No Dockerfile found for package $package"
    fi

    # Change out
    cd ..
  fi
done