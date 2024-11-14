<?php

namespace App\Http\Controllers;

use App\Services\DashboardService;
use App\Support\Enums\IntentEnum;
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
        // $data['attachment_status_of_workstation'] = $this->dashboardService->showAttachmentStatusOfWorkstationRaw($request->query());
        if($this->ajax()) {
            $data['attachment_status_of_trainset'] = $this->dashboardService->showAttachmentStatusOfTrainset($request->query());
            $data['attachment_status_of_workstation'] = $request->get('use_raw') ? $this->dashboardService->showAttachmentStatusOfWorkstationRaw($request->query()) : $this->dashboardService->showAttachmentStatusOfWorkstation($request->query());
            return $data;
        }

        $project = DB::select('SELECT * FROM `projects` ');
        $ts = DB::select('SELECT trainsets.name as ts_name, projects.name as pj_name,  SUM(case when panel_attachments.status = "done" then 1 else 0 end) as done, SUM(case when panel_attachments.status = "in_progress" then 1 else 0 end) as in_progress, workshops.name FROM `panel_attachments` inner join workstations on source_workstation_id = workstations.id inner join workshops on workstations.workshop_id = workshops.id  INNER JOIN `carriage_panels` ON `panel_attachments`.carriage_panel_id = `carriage_panels`.id INNER JOIN `carriage_trainset` ON `carriage_panels`.carriage_trainset_id = `carriage_trainset`.id INNER JOIN `trainsets` ON `carriage_trainset`.trainset_id = `trainsets`.id inner join projects on trainsets.project_id = projects.id where workshops.id <3 GROUP by workshops.name, projects.name,trainsets.name;');

        // array_push($data, $project);
        $data['projectDetail']=$project;
        $data['ts']=$ts;

        // dump($data);
        return Inertia::render('Dashboard',['data'=>$data]);
    }
    public function show(string $id , Request $request)
    {
        $project = DB::select('select * from projects where id = :id',['id'=>$id]);
        $name = $project[0]->name;


        $tsList = DB::select('SELECT * FROM `trainsets` WHERE trainsets.project_id = :id', ["id"=>$id]); 

        //SELECT * FROM `trainsets` WHERE trainsets.project_id = 1 


        $ts=DB::select('SELECT trainsets.name as ts_name , projects.name as project, SUM(case when panel_attachments.status = "done" then 1 else 0 end) as done, SUM(case when panel_attachments.status = "in_progress" then 1 else 0 end) as in_progress FROM `panel_attachments` inner join workstations on source_workstation_id = workstations.id inner join workshops on workstations.workshop_id = workshops.id INNER JOIN `carriage_panels` ON `panel_attachments`.carriage_panel_id = `carriage_panels`.id INNER JOIN `carriage_trainset` ON `carriage_panels`.carriage_trainset_id = `carriage_trainset`.id INNER JOIN `trainsets` ON `carriage_trainset`.trainset_id = `trainsets`.id inner join projects on trainsets.project_id = projects.id where workshops.id <3 AND projects.name = :project GROUP by projects.name,trainsets.name;',['project'=>$name]);
         $ws = DB::select(
             'SELECT projects.name as project,  SUM(case when panel_attachments.status = "done" then 1 else 0 end) as done, SUM(case when panel_attachments.status = "in_progress" then 1 else 0 end) as in_progress, workshops.name FROM `panel_attachments` inner join workstations on source_workstation_id = workstations.id inner join workshops on workstations.workshop_id = workshops.id  INNER JOIN `carriage_panels` ON `panel_attachments`.carriage_panel_id = `carriage_panels`.id INNER JOIN `carriage_trainset` ON `carriage_panels`.carriage_trainset_id = `carriage_trainset`.id INNER JOIN `trainsets` ON `carriage_trainset`.trainset_id = `trainsets`.id inner join projects on trainsets.project_id = projects.id where workshops.id <3 AND projects.name = :project GROUP by workshops.name, projects.name ;',['project'=>$name]
         );
         $panel = DB::select(' SELECT projects.name, SUM(case when panel_attachments.status = "done" then 1 else 0 end) as done, SUM(case when panel_attachments.status = "in_progress" then 1 else 0 end) as in_progress, panels.name FROM `panel_attachments` INNER JOIN `carriage_panels` ON `panel_attachments`.carriage_panel_id = `carriage_panels`.id INNER JOIN panels on carriage_panels.panel_id = panels.id INNER JOIN `carriage_trainset` ON `carriage_panels`.carriage_trainset_id = `carriage_trainset`.id INNER JOIN `trainsets` ON `carriage_trainset`.trainset_id = `trainsets`.id inner join projects on trainsets.project_id = projects.id where projects.name = :project GROUP by panels.name,projects.name, panel_attachments.status ORDER BY `panels`.`name` ASC',['project'=>$name]);
        //  dump($panel);
        // $data = $this->dashboardService->showGraph($request->query());

        $data = [
            'projectId'=>$id,
            'project'=>$name,
            'ts' => $ts,
            'ws' => $ws,
            'panel' => $panel,
            'tsList' => $tsList,
            
        ];
        $project = DB::select('SELECT * FROM `projects` ');
        // array_push($data, $project);
        $data['projectDetail']=$project;
        $data['attachment_status_of_trainset'] = $this->dashboardService->showAttachmentStatusOfTrainset($request->query());
        $data['attachment_status_of_workstation'] = $this->dashboardService->showAttachmentStatusOfWorkstation($request->query());
        if($this->ajax()) {
            return $data;
        }
        // dump($tsList);
        // return $dataDb;
        // return "alo";
        return Inertia::render('Dashboard',['data'=>$data]);
    }
    public function trainset(string $project ,string $trainset){


        $project = DB::select('select * from projects where id = :id',['id'=>$project]);
        $trainsets = DB::select("SELECT trainsets.name as ts_name, projects.name as pj_name,projects.id as project_id ,trainsets.id as ts_id from trainsets inner join projects on projects.id = trainsets.project_id where trainsets.id = :trainset;", ["trainset"=>$trainset]);
        $projectList = DB::select('select * from projects');

        $carriages = DB::select("SELECT qty, concat(type,' ',description) as type FROM `carriage_trainset` inner join carriages on carriage_trainset.carriage_id = carriages.id where trainset_id = :idTrainset",['idTrainset'=>$trainset]);


        $trainsetPanel= DB::select("SELECT trainsets.name, carriage_panels.panel_id, panels.name ,count(carriage_panels.panel_id) as total FROM `carriage_trainset` INNER JOIN carriage_panels on carriage_panels.carriage_trainset_id = carriage_trainset.id inner join trainsets on trainsets.id = carriage_trainset.trainset_id inner JOIN panels on carriage_panels.panel_id = panels.id where trainset_id = :idTrainset GROUP by carriage_panels.panel_id, trainsets.name ORDER BY `carriage_panels`.`panel_id` ASC",["idTrainset"=>$trainset]);


//         SELECT 
//     'total_required' AS status, 
//     SUM(total_required) AS total
// FROM trainset_attachment_components where trainset_attachment_components.trainset_attachment_id = 1
// UNION ALL
// SELECT 
//     'fulfilled' AS status, 
//     SUM(total_fulfilled) AS total
// FROM trainset_attachment_components where trainset_attachment_components.trainset_attachment_id = 1
// UNION ALL
// SELECT 
//     'failed' AS status, 
//     SUM(total_failed) AS total
// FROM trainset_attachment_components where trainset_attachment_components.trainset_attachment_id = 1;

        // $panel= DB::select("SELECT trainsets.name, components.name, sum(trainset_attachment_components.total_required) as required, sum(trainset_attachment_components.total_fulfilled) as fulfilled, sum(trainset_attachment_components.total_failed) as failed FROM `trainset_attachment_components` inner JOIN carriage_panel_components on trainset_attachment_components.carriage_panel_component_id = carriage_panel_components.id inner join components on components.id = carriage_panel_components.component_id inner JOIN trainset_attachments on trainset_attachments.id = trainset_attachment_components.trainset_attachment_id inner join trainsets on trainsets.id = trainset_attachments.trainset_id where trainsets.id = 1 group by trainset_attachment_components.total_required, trainset_attachment_components.total_fulfilled,trainset_attachment_components.total_failed, components.name, trainsets.name, trainsets.name, components.name
        // ");
        $tsList = DB::select('SELECT * FROM `trainsets` WHERE trainsets.project_id = :id', ["id"=>$project[0]->id]); 

       $panel = DB::select("SELECT 
    'required' AS status, 
    SUM(total_required) AS total
    FROM trainset_attachment_components where trainset_attachment_components.trainset_attachment_id = 1
    UNION ALL
    SELECT 
    'fulfilled' AS status, 
    SUM(total_fulfilled) AS total
    FROM trainset_attachment_components where trainset_attachment_components.trainset_attachment_id = 1
    UNION ALL
    SELECT 
    'failed' AS status, 
    SUM(total_failed) AS total
    FROM trainset_attachment_components where trainset_attachment_components.trainset_attachment_id = 1;");

        // dump($panel);

        // dump($tsList);
        // return $trainset;
        // dump($panel[0]['name']);
        // $newArray = [];

        // foreach ($trainsetPanel as &$item) {
        //   $item->name = str_replace(' ', "\n", $item->name);
        // }
        // dump($trainsetPanel);
        // dump($tsList);
        // dump($trainsets);
        $data = [
            'trainsets'=>$trainsets,
            'carriages'=>$carriages,
            'panel'=>$trainsetPanel,
            'total'=>$panel,
            'tsList'=>$tsList,
            'projectList'=>$projectList,
            'project'=>$project
        ];
        return Inertia::render('Dashboard/DashboardTrainset',['data'=>$data]);
    }
}