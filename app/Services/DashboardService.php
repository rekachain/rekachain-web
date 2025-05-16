<?php

namespace App\Services;

use App\Models\PanelAttachment;
use App\Models\ReturnedProduct;
use App\Support\Enums\IntentEnum;
use App\Support\Enums\PanelAttachmentStatusEnum;
use App\Support\Enums\ReturnedProductStatusEnum;
use App\Support\Enums\TrainsetAttachmentStatusEnum;
use App\Support\Enums\TrainsetStatusEnum;
use App\Support\Interfaces\Services\ComponentServiceInterface;
use App\Support\Interfaces\Services\PanelAttachmentServiceInterface;
use App\Support\Interfaces\Services\PanelServiceInterface;
use App\Support\Interfaces\Services\ProjectServiceInterface;
use App\Support\Interfaces\Services\ReturnedProductServiceInterface;
use App\Support\Interfaces\Services\TrainsetAttachmentServiceInterface;
use App\Support\Interfaces\Services\TrainsetServiceInterface;
use App\Support\Interfaces\Services\WorkshopServiceInterface;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class DashboardService {
    public function __construct(
        protected PanelAttachmentServiceInterface $panelAttachmentService,
        protected TrainsetAttachmentServiceInterface $trainsetAttachmentService,
        protected ProjectServiceInterface $projectService,
        protected TrainsetServiceInterface $trainsetService,
        protected WorkshopServiceInterface $workshopService,
        protected PanelServiceInterface $panelService,
        protected ReturnedProductServiceInterface $returnedProductService,
        protected ComponentServiceInterface $componentService,
    ) {}

    public function showGraph(array $data = []) {
        $project = $this->projectService->find(['id' => $data['project_id'] ?? 1])->first();
        // $workshop = $this->workshopService->getAll();
        $panel = $this->panelService->getAll();

        // $workshopProgress = $workshop->map(function ($workshop) use ($project) {
        //     return [
        //         'workshop_name' => $workshop->name,
        //         'progress' => $workshop->workstations->flatMap->panel_attachment_destination_workstations
        //             ->filter(function($attachment) use ($project) {
        //                 return $attachment->carriage_panel->carriage_trainset->trainset->project_id === $project->id;
        //             })
        //             ->groupBy('status')->map(function ($attachments) {
        //                 return [
        //                     'status' => $attachments->first()->status,
        //                     'count' => $attachments->count()
        //                 ];
        //             })->values()
        //     ];
        // });
        // logger($workshopProgress);

        // $panelProgress = $this->panelService->getAll()->map(function ($panel) use ($project) {
        //     return [
        //         'panel_name' => $panel->name,
        //         'progress' => $panel->carriage_panels->flatMap->panel_attachments
        //             ->filter(function($attachment) use ($project) {
        //                 return $attachment->carriage_panel->carriage_trainset->trainset->project_id === $project->id;
        //             })
        //             ->groupBy('status')
        //             ->map(function ($attachments) {
        //                 return [
        //                     'status' => $attachments->first()->status,
        //                     'count' => $attachments->count()
        //                 ];
        //             })->values()
        //     ];
        // });
        // logger($panelProgress);

        $ws = PanelAttachment::selectRaw("
            workshops.name,
            SUM(CASE WHEN panel_attachments.status = 'done' THEN 1 ELSE 0 END) as done,
            SUM(CASE WHEN panel_attachments.status = 'in_progress' THEN 1 ELSE 0 END) as in_progress
            ")
            ->join('workstations', 'panel_attachments.source_workstation_id', '=', 'workstations.id')
            ->join('workshops', 'workstations.workshop_id', '=', 'workshops.id')
            // ->where('workshops.id', '<', 4)
            ->groupBy('workshops.name');

        // $ws = PanelAttachment::selectRaw(
        //     'SUM(CASE WHEN panel_attachments.status = "done" THEN 1 ELSE 0 END) as done,
        //      SUM(CASE WHEN panel_attachments.status = "in_progress" THEN 1 ELSE 0 END) as in_progress'
        // )
        // ->addSelect('workshops.name')
        // ->join('workstations', 'panel_attachments.source_workstation_id', '=', 'workstations.id')
        // ->join('workshops', 'workstations.workshop_id', '=', 'workshops.id')
        // ->groupBy('workshops.name')
        // ->limit(10)
        // ->get();

        $panel = PanelAttachment::selectRaw("
            panels.name,
            SUM(CASE WHEN panel_attachments.status = 'done' THEN 1 ELSE 0 END) as done,
            SUM(CASE WHEN panel_attachments.status = 'in_progress' THEN 1 ELSE 0 END) as in_progress
            ")
            ->join('carriage_panels', 'panel_attachments.carriage_panel_id', '=', 'carriage_panels.id')
            ->join('panels', 'carriage_panels.panel_id', '=', 'panels.id')
            ->groupBy('panels.name')
            ->orderBy('panels.name', 'ASC');
        
        $data = [
            'ws' => $ws->get(),
            'panel' => $panel->get(),
        ];

        // dump($data);
        return $data;
    }

    private $statusMapping = [
        'status_pending' => [PanelAttachmentStatusEnum::PENDING, TrainsetAttachmentStatusEnum::PENDING],
        'status_in_progress' => [PanelAttachmentStatusEnum::IN_PROGRESS, TrainsetAttachmentStatusEnum::IN_PROGRESS],
        'status_material_in_transit' => [PanelAttachmentStatusEnum::MATERIAL_IN_TRANSIT, TrainsetAttachmentStatusEnum::MATERIAL_IN_TRANSIT],
        'status_material_accepted' => [PanelAttachmentStatusEnum::MATERIAL_ACCEPTED, TrainsetAttachmentStatusEnum::MATERIAL_ACCEPTED],
        'status_done' => [PanelAttachmentStatusEnum::DONE, TrainsetAttachmentStatusEnum::DONE],
    ];

    public function showAttachmentStatusOfTrainset(array $data = []) {
        $data['attachment_status_of_trainset_filter'] = array_merge_recursive(
            $data['attachment_status_of_trainset_filter'] ?? [],
            ['column_filters' => ['status' => [TrainsetStatusEnum::PROGRESS->value, TrainsetStatusEnum::DONE->value]]]
        );
        $trainsets = $this->trainsetService->getAll($data['attachment_status_of_trainset_filter']);
        $progressOfTrainset = $trainsets->map(function ($trainset) use ($data) {
            $trainsetProgress = $this->calculateProgress($trainset->trainset_attachments, $data, 1);
            $panelProgress = $this->calculateProgress($trainset->panel_attachments, $data, 0);
            $progress = $panelProgress->isNotEmpty() ? $trainsetProgress->merge($panelProgress) : $trainsetProgress;

            return [
                'trainset_name' => $trainset->name,
                'progress' => $progress->groupBy('status')->map(fn ($group) => ['status' => $group->first()['status'], 'count' => $group->sum('count')])->values(),
            ];
        });

        return $progressOfTrainset->toArray();

    }

    private function calculateProgress($attachments, $data, $key) {
        $useMerged = $data['use_merged'] ?? false;

        return $attachments->filter(fn ($attachment) => !array_key_exists('status', $data) || ($attachment->status?->value ?? $this->statusMapping['status_pending'][$key]) === $data['status'])
            ->groupBy(fn ($attachment) => $attachment->status)
            ->map(fn ($attachment) => (!$useMerged) 
                ? ['status' => $attachment->first()->status ?? $this->statusMapping['status_pending'][$key], 'count' => $attachment->count()]
                : ['status' => match ($attachment->first()->status) {
                    $this->statusMapping['status_in_progress'][$key] => $this->statusMapping['status_in_progress'][$key],
                    $this->statusMapping['status_material_in_transit'][$key] => $this->statusMapping['status_in_progress'][$key],
                    $this->statusMapping['status_material_accepted'][$key] => $this->statusMapping['status_in_progress'][$key],
                    $this->statusMapping['status_done'][$key] => $this->statusMapping['status_done'][$key],
                    default => $this->statusMapping['status_pending'][$key],
                }, 'count' => $attachment->count()]
            )
            ->values();
    }

    public function showAttachmentStatusOfWorkstation(array $data) {
        $data['attachment_status_of_workstation_filter'] = array_merge_recursive(
            $data['attachment_status_of_workstation_filter'] ?? [], [
                'relation_column_filters' => [
                    'trainset' => [
                        'status' => ['progress', 'done'],
                        'project_id' => $data['project_id'] ?? 1,
                    ],
                ],
            ]);
        $trainsetAttachments = $this->trainsetAttachmentService
            ->getAll($data['attachment_status_of_workstation_filter']);
        $workstationTrainsetProgress = $trainsetAttachments->groupBy('destination_workstation_id')->map(fn ($attachments) => [
            'workstation_name' => $attachments->first()->destination_workstation->name . ' ' . $attachments->first()->destination_workstation->location . ' ' . $attachments->first()->destination_workstation->workshop->name,
            'progress' => $this->calculateProgress($attachments, $data, 1),
        ]);

        $panelAttachments = $this->panelAttachmentService
            ->getAll($data['attachment_status_of_workstation_filter']);
        $workstationPanelProgress = $panelAttachments->groupBy('destination_workstation_id')->map(fn ($attachments) => [
            'workstation_name' => $attachments->first()->destination_workstation->name . ' ' . $attachments->first()->destination_workstation->location . ' ' . $attachments->first()->destination_workstation->workshop->name,
            'progress' => $this->calculateProgress($attachments, $data, 0),
        ]);
        $progress = $workstationPanelProgress->isNotEmpty() ? $workstationTrainsetProgress->merge($workstationPanelProgress) : $workstationTrainsetProgress;
        $progressOfWorkstation = $progress
            ->groupBy('workstation_name')
            ->map(fn (Collection $attachment) => [
                'workstation_name' => $attachment->first()['workstation_name'],
                'progress' => $attachment->map(fn ($item) => $item['progress'])->flatten(1)
                    ->groupBy('status')
                    ->map(fn ($attachment) => ['status' => $attachment->first()['status'], 'count' => $attachment->sum('count')])
                    ->values(),
            ])
            ->sortBy('workstation_name')
            ->values();

        return $progressOfWorkstation->toArray();
    }

    public function storeApkFile(): bool {
        $filePath = app_path('Assets/rekachain-mobile.apk');
        $backupDir = app_path('Assets/Backups/rekachain-mobile');
        if (request()->hasFile('file_path')) {
            if (file_exists($filePath)) {
                if (!is_dir($backupDir)) {
                    mkdir($backupDir, 0755, true);
                }
                $backupFilePath = $backupDir . '/' . now()->format('Y-m-d_H-i-s') . '.apk';
                rename($filePath, $backupFilePath);
            }
            request()->file('file_path')->move(dirname($filePath), basename($filePath));

            return true;
        }

        return false;
    }

    public function storeManualBookFile(): bool {
        $filePath = app_path('Assets/manual-book.pdf');
        $backupDir = app_path('Assets/Backups/manual-book');
        if (request()->hasFile('file_path')) {
            if (file_exists($filePath)) {
                if (!is_dir($backupDir)) {
                    mkdir($backupDir, 0755, true);
                }
                $backupFilePath = $backupDir . '/' . now()->format('Y-m-d_H-i-s') . '.pdf';
                rename($filePath, $backupFilePath);
            }
            request()->file('file_path')->move(dirname($filePath), basename($filePath));

            return true;
        }

        return false;
    }

    public function downloadApkFile(): \Symfony\Component\HttpFoundation\BinaryFileResponse {
        $apkFilePath = app_path('Assets/rekachain-mobile.apk');
        if (!file_exists($apkFilePath)) {
            $apkFilePath = app_path('Assets/rekachain-mobile_v1.apk');
            if (!file_exists($apkFilePath)) {
                abort(404, 'APK File not found');
            }
        }

        return response()->download($apkFilePath, 'rekachain-mobile.apk');
    }

    public function downloadManualBookFile(): \Symfony\Component\HttpFoundation\BinaryFileResponse {
        $manualBookFilePath = app_path('Assets/manual-book.pdf');
        if (!file_exists($manualBookFilePath)) {
            $manualBookFilePath = app_path('Assets/manual-book_v1.pdf');
            if (!file_exists($manualBookFilePath)) {
                abort(404, 'Manual Book File not found');
            }
        }

        return response()->download($manualBookFilePath, 'manual-book-rekachain.pdf');
    }

    public function showReturnedProductStatusSum(array $request = []): array {
        $filters = $request;
        $useMerged = $request['use_merged'] ?? true;
        if (isset($request['year'])) {
            $filters['column_filters'] = [
                'created_at' => [
                    'from' => $request['year'] . '-01-01',
                    'to' => $request['year'] . '-12-31',
                ]
            ];
            if (isset($request['month']) && ($request['month'] !== '0')) {
                $filters['column_filters'] = [
                    'created_at' => [
                        'from' => $request['year'] . '-' . $request['month'] . '-01',
                        'to' => $request['year'] . '-' . $request['month'] . '-31',
                    ]
                ];
            }
        }
        $returnedProducts = $this->returnedProductService->getAll($filters)->groupBy('status')->map(function ($item) use ($useMerged) {
            return !$useMerged ? [
                'name' => $item->first()->status->value,
                'value' => $item->sum('qty'),
            ] : [
                'name' => match ($item->first()->status) {
                    ReturnedProductStatusEnum::DONE => ReturnedProductStatusEnum::DONE->value,
                    ReturnedProductStatusEnum::SCRAPPED => ReturnedProductStatusEnum::DONE->value,
                    ReturnedProductStatusEnum::PROGRESS => ReturnedProductStatusEnum::PROGRESS->value,
                    default => ReturnedProductStatusEnum::DRAFT->value
                },
                'value' => $item->sum('qty'),
            ];
        });
        
        $returnedProductsSummary = $returnedProducts->groupBy('name')->map(function ($returnedProduct) {
            return [
                'name' => $returnedProduct->first()['name'],
                'value' => $returnedProduct->sum('value'),
            ];
        });

        return $returnedProductsSummary->sortBy('name')->values()->toArray();
    }

    public function getReturnedproductProgressTimeDiff(array $request) : LengthAwarePaginator {
        $rawData = ReturnedProduct::selectRaw("
                YEAR(returned_products.created_at) as year,
                MONTH(returned_products.created_at) as month,
                AVG(TIMESTAMPDIFF(SECOND, returned_products.created_at, returned_products.updated_at)) as avg_seconds,
                COUNT(DISTINCT returned_products.id) as total_returned,
                SUM(product_problems.qty) as total_problem
            ")
            ->leftJoin("product_problems", "returned_products.id", "=", "product_problems.returned_product_id")
            ->groupByRaw("YEAR(returned_products.created_at), MONTH(returned_products.created_at)")
            ->orderByRaw("YEAR(returned_products.created_at) DESC, MONTH(returned_products.created_at) DESC")
            ->get();

        // Transform with localization
        $transformed = $rawData->map(function ($item) {
            $date = Carbon::create($item->year, $item->month, 1);
            $avg = (int) $item->avg_seconds;

            $days = floor($avg / 86400);
            $hours = floor(($avg % 86400) / 3600);
            $minutes = floor(($avg % 3600) / 60);

            return (object) [
                'intent' => IntentEnum::WEB_DASHBOARD_GET_RETURNED_PRODUCT_TIME_DIFFERENCE->value,
                'year_month' => $date->locale(app()->getLocale())->translatedFormat('F Y'),
                'avg_duration' => "{$days} " . __('pages.dashboard.partials.returned_product_time_diff_chart.fields.day') . ' ' .
                                "{$hours} " . __('pages.dashboard.partials.returned_product_time_diff_chart.fields.hour') . ' ' .
                                "{$minutes} " . __('pages.dashboard.partials.returned_product_time_diff_chart.fields.minute'),
                'total_returned' => $item->total_returned,
                'total_problem' => $item->total_problem
            ];
        });

        $perPage = $request['perPage'] ?? 4;
        $page = LengthAwarePaginator::resolveCurrentPage();
        $paginated = new LengthAwarePaginator(
            $transformed->forPage($page, $perPage)->values(),
            $transformed->count(),
            $perPage,
            $page,
            ['path' => request()->url(), 'query' => request()->query()]
        );

        return $paginated;
    }

    public function getReturnedproductProgressTimeMinMax(array $request) {
        $rawData = ReturnedProduct::selectRaw("
                YEAR(created_at) as year,
                MONTH(created_at) as month,
                MIN(TIMESTAMPDIFF(SECOND, created_at, updated_at)) as min_duration,
                MAX(TIMESTAMPDIFF(SECOND, created_at, updated_at)) as max_duration
            ")
            ->groupByRaw("YEAR(created_at), MONTH(created_at)")
            ->orderByRaw("YEAR(created_at) ASC, MONTH(created_at) ASC")
            ->get();

        // Transform with localization
        $transformed = $rawData->map(function ($item) {
            $date = Carbon::create($item->year, $item->month, 1);
            $min = (int) $item->min_duration;
            $max = (int) $item->max_duration;

            $min_days = floor($min / 86400);
            $max_days = floor($max / 86400);
            $min_hours = floor(($min % 86400) / 3600);
            $max_hours = floor(($max % 86400) / 3600);
            $min_minutes = floor(($min % 3600) / 60);
            $max_minutes = floor(($max % 3600) / 60);

            return (object) [
                'intent' => IntentEnum::WEB_DASHBOARD_GET_RETURNED_PRODUCT_TIME_MIN_MAX->value,
                'year_month' => $date->locale(app()->getLocale())->translatedFormat('F Y'),
                'min_duration' => $item->min_duration,
                'min_duration_formatted' => "{$min_days} " . __('pages.dashboard.partials.returned_product_time_diff_chart.fields.day') . ' ' .
                                "{$min_hours} " . __('pages.dashboard.partials.returned_product_time_diff_chart.fields.hour') . ' ' .
                                "{$min_minutes} " . __('pages.dashboard.partials.returned_product_time_diff_chart.fields.minute'),
                'max_duration' => $item->max_duration,
                'max_duration_formatted' => "{$max_days} " . __('pages.dashboard.partials.returned_product_time_diff_chart.fields.day') . ' ' .
                                "{$max_hours} " . __('pages.dashboard.partials.returned_product_time_diff_chart.fields.hour') . ' ' .
                                "{$max_minutes} " . __('pages.dashboard.partials.returned_product_time_diff_chart.fields.minute'),
            ];
        });

        return $transformed;
    }

    public function getVendorProblemComponents(array $request): LengthAwarePaginator {
        $components = $this->componentService->with(['product_problems'])->getAll($request);

        // Transform with localization
        $transformed = $components->filter(function ($item) {
            return $item->hasProductProblem();
        })->map(function ($item) {
            return (object) [
                'component_name' => $item->name,
                'vendor_name' => $item->vendor_name,
                'vendor_qty' => $item->vendor_qty,
                'total_problem' => $item->product_problems()->count()
            ];
        });

        $vendorProblem = $transformed->groupBy('vendor_name')->map(function ($item) {
            $totalSent = $item->sum('vendor_qty');
            $totalProblem = $item->sum('total_problem');
            return (object) [
                'intent' => IntentEnum::WEB_DASHBOARD_GET_VENDOR_PROBLEM_COMPONENTS->value,
                'vendor_name' => $item->first()->vendor_name,
                'total_component' => $item->count(),
                'total_sent' => $totalSent,
                'total_problem' => $totalProblem,
                'problem_percent' => $totalProblem * 100 / $totalSent
            ];
        })->sortByDesc('problem_percent');

        $perPage = $request['perPage'] ?? 4;
        $page = LengthAwarePaginator::resolveCurrentPage();
        $paginated = new LengthAwarePaginator(
            $vendorProblem->forPage($page, $perPage)->values(),
            $vendorProblem->count(),
            $perPage,
            $page,
            ['path' => request()->url(), 'query' => request()->query()]
        );

        return $paginated;
    }

    public function getComponentProblems(array $request) : LengthAwarePaginator {
        $components = $this->componentService->with(['product_problems', 'product_problems.product_problem_notes'])->getAll($request);

        // Transform with localization
        $transformed = $components->filter(function ($item) {
            return $item->hasProductProblem();
        })->map(function ($item) {
            $productProblemDateFrom = $item->product_problems()->first()->created_at->locale(app()->getLocale())->translatedFormat('D F Y');
            $productProblemDateTo = $item->product_problems()->orderByDesc('created_at')->first()->created_at->locale(app()->getLocale())->translatedFormat('D F Y');
            $dateRange = $productProblemDateFrom == $productProblemDateTo ? $productProblemDateFrom : $productProblemDateFrom . ' - ' . $productProblemDateTo;

            return (object) [
                'intent' => IntentEnum::WEB_DASHBOARD_GET_PRODUCT_PROBLEM->value,
                'component_name' => $item->name,
                'notes' => $item->product_problems->flatMap(function ($problem) {
                    return $problem->product_problem_notes->map(function ($note) {
                        return $note->note;
                    });
                })->unique()->values()->implode(', '),
                'date_range' => $dateRange,
                'total_problem' => $item->product_problems()->count()
            ];
        });

        $perPage = $request['perPage'] ?? 4;
        $page = LengthAwarePaginator::resolveCurrentPage();
        $paginated = new LengthAwarePaginator(
            $transformed->forPage($page, $perPage)->values(),
            $transformed->count(),
            $perPage,
            $page,
            ['path' => request()->url(), 'query' => request()->query()]
        );

        return $paginated;
    }
}
