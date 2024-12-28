#!/bin/bash

# a blunt pickaxe to convert the site to a static one
set -exu

tpage=$1

cd root;
for file in $(git grep -l PROCESS)
do
	new_file="$file.new";
	$tpage $file && $tpage $file > $new_file && mv $new_file $file
done
