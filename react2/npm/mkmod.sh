#!/bin/sh
dir="src/modules/$1"
mkdir $dir
mkdir $dir/img
touch $dir/module.js > /dev/null 2>&1
touch $dir/module.css > /dev/null 2>&1
echo "module created $dir"

