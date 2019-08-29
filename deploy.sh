#!/bin/sh
# copy the README file in order to display on github page
cp README.md public/
# deploy
gh-pages -b master -d build --git $(which git)