<?php

namespace App\Http\Controllers;

use App\Services\DashboardService;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Support\Interfaces\Services\PanelAttachmentServiceInterface;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function __construct(
        // protected PanelAttachmentServiceInterface $panelAttachmentService,
        protected DashboardService $dashboardService
    ) {}
    
    public function index(Request $request)
    {
        $data = $this->dashboardService->showGraph($request->query());
        return Inertia::render('Dashboard',['data'=>$data]);
    }
    public function show(string $project)
    {
         $dataDb = DB::select(
             'SELECT projects.name as project,  SUM(case when panel_attachments.status = "done" then 1 else 0 end) as done, SUM(case when panel_attachments.status = "in_progress" then 1 else 0 end) as in_progress, workshops.name FROM `panel_attachments` inner join workstations on source_workstation_id = workstations.id inner join workshops on workstations.workshop_id = workshops.id  INNER JOIN `carriage_panels` ON `panel_attachments`.carriage_panel_id = `carriage_panels`.id INNER JOIN `carriage_trainset` ON `carriage_panels`.carriage_trainset_id = `carriage_trainset`.id INNER JOIN `trainsets` ON `carriage_trainset`.trainset_id = `trainsets`.id inner join projects on trainsets.project_id = projects.id where workshops.id <3 AND projects.name = :project GROUP by workshops.name, projects.name ;',['project'=>$project]
         );
        //  dump($dataDb);
        // return $dataDb;
        return Inertia::render('Dashboard',['data'=>$dataDb]);
    }
}