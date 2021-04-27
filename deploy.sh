#!/usr/bin/env sh
###
 # @Author: taoxiang
 # @Date: 2021-04-27 14:14:59
 # @LastEditTime: 2021-04-27 14:14:59
 # @LastEditors: taoxiang
 # @Description: 
 # @FilePath: /blog/admin/deploy.sh
 # 打工人,打工魂,打工都是人上人
### 

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
yarn build:prod

# 进入生成的文件夹
cd ./dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME
git config --global user.email "taoxiang"
git config --global user.name "thawsoar@gmail.com"

git init
git add *

git commit -m 'Travis CI Auto Builder Deploy'
# git push --force --quiet git@github.com:Thawsoar/vue-cms.git master:deploy
git push -f -q https://${GH_TOKEN}@g${GH_REF} master:deploy

ssh -o "StrictHostKeyChecking no" root@47.105.40.207 'cd /data/www/middle && rm -rf ./* && git clone -b deploy https://github.com/Thawsoar/vue-cms.git && mv vue-cms dist'

cd -