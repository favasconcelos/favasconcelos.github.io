#!/bin/sh
# copy the README file in order to display on github page
cp README.md build/
# deploy
gh-pages -b master -d build --git $(which git)