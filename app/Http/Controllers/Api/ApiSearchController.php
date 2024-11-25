<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

class ApiSearchController extends Controller
{
    public function search(Request $request)
{
    $query = strtolower($request->get('q'));

    $routes = collect(Route::getRoutes())
        ->filter(function ($route) {
            // Only get GET routes that render pages
            return $route->methods()[0] === 'GET' &&
                   !str_contains($route->uri(), 'api') &&
                   !str_contains($route->uri(), 'test') &&
                   !str_contains($route->uri(), '_') &&
                   !str_contains($route->uri(), 'sanctum') &&
                   !str_contains($route->uri(), 'logout') &&
                   !str_contains($route->uri(), 'login') &&
                   !str_contains($route->uri(), 'edit') &&
                   !str_contains($route->uri(), 'show') &&
                //    !str_contains($route->uri(), 'buat-') &&
                   !str_contains($route->uri(), 'trainset') &&
                   !str_contains($route->uri(), 'attachments') &&
                //    !str_contains($route->uri(), 'detail-proyek') &&
                   !str_contains($route->uri(), 'proyek') &&
                //    !str_contains($route->uri(), 'progress-steps') &&
                //    !str_contains($route->uri(), 'carriage-panel-components') &&
                   !str_contains($route->uri(), '-') &&
                   !preg_match('/{\w+}/', $route->uri());
        })
        ->map(function ($route, $key) {
            $englishTitle = ucwords(str_replace(['/', '-'], [' > ', ' '], $route->uri()));

            // Map common English to Indonesian
            $translations = [
                'Dashboard' => 'Dashboard',
                'Projects' => 'Proyek',
                'Users' => 'Pengguna / Staff / Staf',
                'Trainsets' => 'Trainsets',
                'Carriages' => 'Gerbong / Kereta',
                'Work Days' => 'Hari Kerja',
                'Work Day Times' => 'Waktu Hari Kerja',
                'Panel Materials' => 'Material Panel',
                'Panel Attachments' => 'Lampiran Panel',
                'Profile' => 'Profil / Pengaturan / Setting',
                'Permissions' => 'Izin / Hak Akses / Perizinan',
                'Roles' => 'Peran / Jabatan / Posisi',
                'Steps' => 'Step / Langkah',
                'Raw Materials' => 'Bahan Mentah / Bahan Baku',
                'Components' => 'Komponen',
                'Feedback' => 'Umpan Balik',
            ];

            $indonesianTitle = str_replace(
                array_keys($translations),
                array_values($translations),
                $englishTitle
            );

            return [
                'id' => $key,
                // 'title' => ucwords(str_replace(['/', '-'], [' > ', ' '], $route->uri())),
                'title' => $englishTitle,
                'title_id' => $indonesianTitle,
                'url' => '/' . $route->uri()
            ];
        })
        ->filter(function ($route) use ($query) {
            return str_contains(strtolower($route['title']), $query) ||
                   str_contains(strtolower($route['title_id']), $query);
        })
        ->values();

    return response()->json($routes);
}

}
