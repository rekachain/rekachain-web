<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Support\Interfaces\Services\PanelAttachmentServiceInterface;

class DashboardController extends Controller
{
    public function __construct(
        protected PanelAttachmentServiceInterface $panelAttachmentService,
    ) {}
    
    public function index(Request $request)
    {
        $data = $this->panelAttachmentService->showGraph();
        return Inertia::render('Dashboard',['data'=>$data]);
    }
}