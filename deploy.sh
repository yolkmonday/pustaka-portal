#!bin/sh

git stash && git pull && yarn install && yarn build &&
touch .last_build.json
NODE_ENV=production pm2 startOrReload ecosystem.config.js --env production && pm2 save
echo "{\"last_build\": \"`date`\",\"version\":\"`openssl rand -hex 20`\"}" >.last_build.json
