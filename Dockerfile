FROM php:8.1-fpm

# Instal dependensi PHP & Node.js
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    zip \
    unzip \
    git \
    curl \
    libonig-dev \
    libzip-dev \
    nodejs \
    npm \
    mariadb-client

RUN apt-get update; \
    apt-get install -y libmagickwand-dev; \
    pecl install imagick; \
    docker-php-ext-enable imagick;

RUN rm -rf /var/lib/apt/lists/*


RUN docker-php-ext-configure gd --with-jpeg --with-freetype
RUN docker-php-ext-install pdo_mysql mbstring zip exif pcntl gd

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

RUN mkdir -p /app/rekachain-web

WORKDIR /app/rekachain-web

COPY . .

COPY custom-www.conf /usr/local/etc/php-fpm.d/www.conf

RUN composer install --no-interaction --prefer-dist --optimize-autoloader
RUN cp .env.example .env
RUN php artisan key:generate
RUN apt-get update && apt-get install -y nano
RUN php artisan optimize:clear

RUN ln -s /usr/bin/node /usr/local/bin/node

COPY package.json ./
COPY package-lock.json ./
COPY vite.config.js ./

RUN chmod -R 775 storage bootstrap/cache \
 && chown -R www-data:www-data storage bootstrap/cache

RUN chown -R www-data:www-data ./storage \
    && chmod -R 777 /app/rekachain-web/storage \
    && chmod -R 777 /app/rekachain-web/bootstrap/cache

EXPOSE 8000 5173

CMD ["php-fpm"]
