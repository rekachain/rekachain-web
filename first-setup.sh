#!/bin/bash
set -e

# Install dependency Laravel (misal, composer, npm, dll)
composer install
cp .env.example .env
php artisan key:generate
npm install

sudo systemctl start mysql

# Membuat database dan user MySQL
sudo mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS rekachain_web CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
sudo mysql -u root -p -e "CREATE USER IF NOT EXISTS 'user'@'localhost' IDENTIFIED BY '12345678';"
sudo mysql -u root -p -e "GRANT ALL PRIVILEGES ON rekachain_web.* TO 'user'@'localhost';"
sudo mysql -u root -p -e "FLUSH PRIVILEGES;"

# Jalankan migrate dan seed
php artisan migrate --seed
