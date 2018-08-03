#!/bin/bash

cd packages

packages=$(ls -d */)

# Checks if there are any packages
if [ -d "$packages" ]; then
  echo "No packages to build"
  exit
fi

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
      docker build . -t $DOCKER_USERNAME/$package:$1 # Tag the build with current project version
    fi

    # Change out
    cd ..
  fi
done