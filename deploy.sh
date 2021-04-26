#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
yarn build:prod

# 进入生成的文件夹
cd ./dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add *
git config user.name "陶翔"
git config user.email "thawsoar@gmail.com"
git commit -m 'Travis CI Auto Builder Deploy'

git push --force --quiet "https://${GH_TOKEN}@github.com/Thawsoar/vue-cms" master:deploy

ssh root@47.105.40.207 'cd ~/../data/www/middle && git fetch --all && git reset --hard origin/deploy && git pull'

cd -