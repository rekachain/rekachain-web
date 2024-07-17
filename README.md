# RekaChain

RekaChain adalah sebuah aplikasi berbasis web yang dibangun untuk menunjang proses operasional Supply Chain Management (SCM) di PT Reka Indo. Aplikasi ini dikembangkan dengan menggunakan framework Laravel.

## Daftar Isi

-   [Deskripsi Proyek](#deskripsi-proyek)
-   [Fitur](#fitur)
-   [Persyaratan Sistem](#persyaratan-sistem)
-   [Instalasi](#instalasi)
-   [Penggunaan](#penggunaan)
-   [Struktur Proyek](#struktur-proyek)
-   [Tim Pengembang](#tim-pengembang)
-   [Lisensi](#lisensi)

## Deskripsi Proyek

RekaChain bertujuan untuk meningkatkan efisiensi dan efektivitas operasional SCM di PT Reka Indo melalui digitalisasi proses dan integrasi sistem yang lebih baik.

## Fitur

-   Manajemen data supplier dan pelanggan
-   Monitoring dan tracking pengiriman barang
-   Manajemen inventaris dan stok
-   Laporan dan analitik forecasting

## Persyaratan Sistem

-   PHP >= 8.3.3
-   Composer >= 2.4.1
-   PostgreSQL 16.3
-   Node.js >= 20.10
-   NPM >= 10.4

## Instalasi

1. Clone repositori ini:
    ```bash
    git clone https://github.com/rekachain/rekachain-web.git
    ```
2. Masuk ke direktori proyek:
    ```bash
    cd rekachain-web
    ```
3. Install dependencies dengan Composer:
    ```bash
    composer install
    ```
4. Buat file .env dari .env.example:
    ```bash
    cp .env.example .env
    ```
5. Generate application key:
    ```bash
    php artisan key:generate
    ```
6. Konfigurasi database di file .env
7. Jalankan migrasi dan seeder:
    ```bash
    php artisan migrate --seed
    ```
8. Install dependencies frontend:
    ```bash
    npm install
    npm run dev
    ```
9. Jalankan server lokal:
    ```bash
    php artisan serve
    ```

## Penggunaan

Setelah server berjalan, Anda dapat mengakses aplikasi melalui browser di alamat:

`127.0.0.1`

## Struktur Proyek

Beberapa direktori utama dalam proyek ini:

-   `app/` - Berisi kode sumber aplikasi Laravel.
-   `database/` - Berisi migrasi database dan seeder.
-   `public/` - Direktori publik untuk akses web.
-   `resources/` - Berisi view dan assets frontend.
-   `routes/` - Berisi definisi rute aplikasi.
-   `tests/` - Berisi pengujian aplikasi.

## Tim Pengembang

-   **Frontend**
    -   Galur Arasy Lumintang
    -   I Dewa Made Wira Wardhana Athallahsyah
    -   Muhammad Al Kindy
-   **Backend**

    -   Ibnu Tsalis Assalam
    -   Muhammad Helmi Permana Agung
    -   Chamzal Noer Haiky
