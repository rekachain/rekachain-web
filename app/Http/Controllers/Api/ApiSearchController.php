<?php

namespace App\Http\Controllers\Api;

use App\Models\Project;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Route;

class ApiSearchController extends Controller {
    public function search(Request $request) {
        $query = strtolower($request->get('q'));

    $standardRoutes = collect(Route::getRoutes())
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
        });

        // Get project-specific routes
        $projects = Project::with(['trainsets.carriage_trainsets.carriage'])->get();
        $projectRoutes = collect();

        foreach ($projects as $project) {
            // Project route
            $projectRoutes->push([
                'id' => "project_{$project->id}",
                'title' => "Projects > {$project->name}",
                'title_id' => "Proyek > {$project->name}",
                'url' => "/projects/{$project->id}/trainsets",
            ]);

            $projectRoutes->push([
                'id' => "project_{$project->id}",
                'title' => "Projects > {$project->name} > Panels",
                'title_id' => "Proyek > {$project->name} > Panels",
                'url' => "/projects/{$project->id}/panels",
            ]);

            $projectRoutes->push([
                'id' => "project_{$project->id}",
                'title' => "Projects > {$project->name} > Components",
                'title_id' => "Proyek > {$project->name} > Components",
                'url' => "/projects/{$project->id}/components",
            ]);

            foreach ($project->trainsets as $trainset) {
                // Project > Trainset route
                $projectRoutes->push([
                    'id' => "project_{$project->id}_trainset_{$trainset->id}",
                    'title' => "Projects > {$project->name} > Trainsets > {$trainset->name}",
                    'title_id' => "Proyek > {$project->name} > Trainset > {$trainset->name}",
                    'url' => "/projects/{$project->id}/trainsets/{$trainset->id}/carriage-trainsets",
                ]);

                $projectRoutes->push([
                    'id' => "project_{$project->id}_trainset_{$trainset->id}",
                    'title' => "Projects > {$project->name} > Trainsets > {$trainset->name} > Components",
                    'title_id' => "Proyek > {$project->name} > Trainset > {$trainset->name} > Components",
                    'url' => "/projects/{$project->id}/trainsets/{$trainset->id}/components",
                ]);

                $projectRoutes->push([
                    'id' => "project_{$project->id}_trainset_{$trainset->id}",
                    'title' => "Projects > {$project->name} > Trainsets > {$trainset->name} > Panels",
                    'title_id' => "Proyek > {$project->name} > Trainset > {$trainset->name} > Panels",
                    'url' => "/projects/{$project->id}/trainsets/{$trainset->id}/panels",
                ]);

                foreach ($trainset->carriage_trainsets as $carriageTrainset) {
                    // Project > Trainset > Carriage route
                    $projectRoutes->push([
                        'id' => "project_{$project->id}_trainset_{$trainset->id}_carriage_{$carriageTrainset->id}",
                        'title' => "Projects > {$project->name} > Trainsets > {$trainset->name} > Carriages > {$carriageTrainset->carriage->type}",
                        'title_id' => "Proyek > {$project->name} > Trainset > {$trainset->name} > Gerbong > {$carriageTrainset->carriage->type}",
                        'url' => "/projects/{$project->id}/trainsets/{$trainset->id}/carriage-trainsets/{$carriageTrainset->id}/carriage-panels",
                    ]);
                }
            }
        }

        // Combine and filter all routes
        $allRoutes = $standardRoutes->concat($projectRoutes)
            ->filter(function ($route) use ($query) {
                return str_contains(strtolower($route['title']), $query) ||
                        str_contains(strtolower($route['title_id']), $query);
            })
            ->values();

        return response()->json($allRoutes);
    }

}
