<?php

namespace App\Http\Controllers;

use App\Services\DashboardService;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Support\Interfaces\Services\PanelAttachmentServiceInterface;

class DashboardController extends Controller
{
    public function __construct(
        protected PanelAttachmentServiceInterface $panelAttachmentService,
        protected DashboardService $dashboardService
    ) {}
    
    public function index(Request $request)
    {
        $data = $this->dashboardService->showGraph($request->query());
        $data['panel_attachment_status'] = $this->dashboardService->showPanelAttachmentStatusOfTrainset($request->query());
        if($this->ajax()) {
            return $data;
        }
        return Inertia::render('Dashboard',['data'=>$data]);
    }
}