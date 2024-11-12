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
        $data['attachment_status_of_trainset'] = $this->dashboardService->showAttachmentStatusOfTrainset($request->query());
        $data['attachment_status_of_workstation'] = $this->dashboardService->showAttachmentStatusOfWorkstation($request->query());
        if($this->ajax()) {
            return $data;
        }
        return Inertia::render('Dashboard',['data'=>$data]);
    }
}