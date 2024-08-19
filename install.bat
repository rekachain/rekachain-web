@echo off

echo Installing composer dependencies...
start "" composer install

echo Installing npm dependencies...
start "" npm install

echo All dependencies installed successfully.
