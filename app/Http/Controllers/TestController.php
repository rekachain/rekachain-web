<?php

namespace App\Http\Controllers;

use App\Services\DashboardService;
use App\Support\Interfaces\Services\PanelAttachmentServiceInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class TestController extends Controller {
    public function __construct(
        protected PanelAttachmentServiceInterface $panelAttachmentService,
        protected DashboardService $dashboardService
    ) {}

    public function index(Request $request) {
        // $data = $this->dashboardService->showGraph($request->query());
        $data = DB::select('select * from test');

        // dump($data);
        return Inertia::render('Division/Create');
    }

    public function create(Request $request) {
        return 'create';
    }

    public function show(string $project) {
        return $project;
        // dump($request);
    }
}
