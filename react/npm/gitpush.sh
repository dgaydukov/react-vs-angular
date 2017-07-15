#!/bin/sh
node_modules/webpack/bin/webpack.js -p --config npm/webpack.node.server.config.js
rsync -tr build/* static/
cd static/
git add .
git commit -m "$1"
git push origin master
echo "pushed"
