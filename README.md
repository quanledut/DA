# DA

sudo npm cache clean -f
sudo npm install -g n
sudo n stable

npm install -g npm@latest

echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p


npm cache clean

npm cache clean --force