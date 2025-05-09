<?php

namespace App\Http\Controllers;

use App\Http\Resources\DashboardResource;
use App\Services\DashboardService;
use App\Support\Enums\IntentEnum;
use App\Support\Enums\PermissionEnum;
use App\Support\Enums\RoleEnum;
use App\Support\Interfaces\Services\ProjectServiceInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller {
    public function __construct(
        protected DashboardService $dashboardService,
        protected ProjectServiceInterface $projectService,
    ) {}

    public function index(Request $request) {
        checkPermissions(PermissionEnum::DASHBOARD_READ);
        $intent = $request->get('intent');
        $data = $this->dashboardService->showGraph($request->query());
        if (checkRoles([RoleEnum::SUPERVISOR_AFTERSALES, RoleEnum::MANAGER_AFTERSALES], true)) {
            $request->merge(['intent' => IntentEnum::WEB_DASHBOARD_GET_RETURNED_PRODUCT_TIME_DIFFERENCE->value]);
            $data['returned_product_status'] = $this->dashboardService->showReturnedProductStatusSum($request->query());
            $data['returned_product_progress_time_diff'] = DashboardResource::collection($this->dashboardService->getReturnedproductProgressTimeDiff($request->query()));
        }
        // $data['attachment_status_of_workstation'] = $this->dashboardService->showAttachmentStatusOfWorkstationRaw($request->query());
        if ($this->ajax()) {

            switch ($intent) {
                case IntentEnum::DOWNLOAD_APK_FILE->value:
                    return $this->dashboardService->downloadApkFile();
                case IntentEnum::DOWNLOAD_MANUAL_BOOK_FILE->value:
                    return $this->dashboardService->downloadManualBookFile();
                case IntentEnum::WEB_DASHBOARD_GET_RETURNED_PRODUCT_TIME_DIFFERENCE->value:
                    return DashboardResource::collection($this->dashboardService->getReturnedproductProgressTimeDiff($request->query()));
                case IntentEnum::WEB_DASHBOARD_GET_WORKSTATION_STATUS->value:
                    return $this->dashboardService->showAttachmentStatusOfWorkstation($request->query());
                case IntentEnum::WEB_DASHBOARD_GET_TRAINSET_ATTACHMENT_STATUS->value:
                    return $this->dashboardService->showAttachmentStatusOfTrainset($request->query());
            }
            $data['attachment_status_of_trainset'] = $this->dashboardService->showAttachmentStatusOfTrainset($request->query());
            // $data['attachment_status_of_workstation'] = $request->get('use_raw') ? $this->dashboardService->showAttachmentStatusOfWorkstationRaw($request->query()) : $this->dashboardService->showAttachmentStatusOfWorkstation($request->query());

            return $data;
        }

        $project = DB::select('SELECT * FROM `projects` ');
        $ts = DB::select('SELECT trainsets.name as ts_name, projects.name as pj_name,  SUM(case when panel_attachments.status = "done" then 1 else 0 end) as done, SUM(case when panel_attachments.status = "in_progress" then 1 else 0 end) as in_progress, workshops.name ,SUM(case when panel_attachments.status = "pending" then 1 else 0 end) as pending ,SUM(case when panel_attachments.status = "material_in_transit" then 1 else 0 end) as material_in_transit, SUM(case when panel_attachments.status = "material_accepted" then 1 else 0 end) as material_accepted FROM `panel_attachments` inner join workstations on source_workstation_id = workstations.id inner join workshops on workstations.workshop_id = workshops.id  INNER JOIN `carriage_panels` ON `panel_attachments`.carriage_panel_id = `carriage_panels`.id INNER JOIN `carriage_trainset` ON `carriage_panels`.carriage_trainset_id = `carriage_trainset`.id INNER JOIN `trainsets` ON `carriage_trainset`.trainset_id = `trainsets`.id inner join projects on trainsets.project_id = projects.id where workshops.id <3 GROUP by workshops.name, projects.name,trainsets.name;');

        // array_push($data, $project);
        $data['projectDetail'] = $project;
        $data['ts'] = $ts;
        // dump($data);
        return Inertia::render('Dashboard/Index', ['data' => $data]);
    }

    public function show(string $id, Request $request) {
        $project = DB::select('select * from projects where id = :id', ['id' => $id]);
        $name = $project[0]->name;

        $tsList = DB::select('SELECT * FROM `trainsets` WHERE trainsets.project_id = :id', ['id' => $id]);

        // SELECT * FROM `trainsets` WHERE trainsets.project_id = 1

        // SELECT * FROM `trainsets` WHERE trainsets.project_id = 1

        $ts = DB::select('SELECT trainsets.name as ts_name , projects.name as project, SUM(case when panel_attachments.status = "done" then 1 else 0 end) as done, SUM(case when panel_attachments.status = "in_progress" then 1 else 0 end) as in_progress ,SUM(case when panel_attachments.status = "pending" then 1 else 0 end) as pending ,SUM(case when panel_attachments.status = "material_in_transit" then 1 else 0 end) as material_in_transit, SUM(case when panel_attachments.status = "material_accepted" then 1 else 0 end) as material_accepted   FROM `panel_attachments`inner join workstations on source_workstation_id = workstations.id inner join workshops on workstations.workshop_id = workshops.id INNER JOIN `carriage_panels` ON `panel_attachments`.carriage_panel_id = `carriage_panels`.id INNER JOIN `carriage_trainset` ON `carriage_panels`.carriage_trainset_id = `carriage_trainset`.id INNER JOIN `trainsets` ON `carriage_trainset`.trainset_id = `trainsets`.id inner join projects on trainsets.project_id = projects.id where workshops.id <3 AND projects.name = :project GROUP by projects.name,trainsets.name;', ['project' => $name]);
        // dump($ts);
        $ws = DB::select(
            'SELECT projects.name as project,  SUM(case when panel_attachments.status = "done" then 1 else 0 end) as done, SUM(case when panel_attachments.status = "in_progress" then 1 else 0 end) as in_progress, workshops.name ,SUM(case when panel_attachments.status = "pending" then 1 else 0 end) as pending ,SUM(case when panel_attachments.status = "material_in_transit" then 1 else 0 end) as material_in_transit, SUM(case when panel_attachments.status = "material_accepted" then 1 else 0 end) as material_accepted  FROM `panel_attachments` inner join workstations on source_workstation_id = workstations.id inner join workshops on workstations.workshop_id = workshops.id  INNER JOIN `carriage_panels` ON `panel_attachments`.carriage_panel_id = `carriage_panels`.id INNER JOIN `carriage_trainset` ON `carriage_panels`.carriage_trainset_id = `carriage_trainset`.id INNER JOIN `trainsets` ON `carriage_trainset`.trainset_id = `trainsets`.id inner join projects on trainsets.project_id = projects.id where workshops.id <3 AND projects.name = :project GROUP by workshops.name, projects.name ;', ['project' => $name]
        );
        $panel = DB::select(' SELECT projects.name, SUM(case when panel_attachments.status = "done" then 1 else 0 end) as done, SUM(case when panel_attachments.status = "in_progress" then 1 else 0 end) as in_progress, panels.name,SUM(case when panel_attachments.status = "pending" then 1 else 0 end) as pending ,SUM(case when panel_attachments.status = "material_in_transit" then 1 else 0 end) as material_in_transit, SUM(case when panel_attachments.status = "material_accepted" then 1 else 0 end) as material_accepted  FROM `panel_attachments` INNER JOIN `carriage_panels` ON `panel_attachments`.carriage_panel_id = `carriage_panels`.id INNER JOIN panels on carriage_panels.panel_id = panels.id INNER JOIN `carriage_trainset` ON `carriage_panels`.carriage_trainset_id = `carriage_trainset`.id INNER JOIN `trainsets` ON `carriage_trainset`.trainset_id = `trainsets`.id inner join projects on trainsets.project_id = projects.id where projects.name = :project GROUP by panels.name,projects.name, panel_attachments.status ORDER BY `panels`.`name` ASC', ['project' => $name]);
        // $data = $this->dashboardService->showGraph($request->query());

        $data = [
            'projectId' => $id,
            'project' => $name,
            'ts' => $ts,
            'ws' => $ws,
            'panel' => $panel,
            'tsList' => $tsList,

        ];
        $project = DB::select('SELECT * FROM `projects` ');
        // array_push($data, $project);
        $data['projectDetail'] = $project;
        if (checkRoles([RoleEnum::SUPERVISOR_AFTERSALES, RoleEnum::MANAGER_AFTERSALES], true)) {
            $request->merge(['intent' => IntentEnum::WEB_DASHBOARD_GET_RETURNED_PRODUCT_TIME_DIFFERENCE->value]);
            $data['returned_product_status'] = $this->dashboardService->showReturnedProductStatusSum($request->query());
            $data['returned_product_progress_time_diff'] = DashboardResource::collection($this->dashboardService->getReturnedproductProgressTimeDiff($request->query()));
        }
        $data['attachment_status_of_trainset'] = $this->dashboardService->showAttachmentStatusOfTrainset($request->query());
        $data['attachment_status_of_workstation'] = $this->dashboardService->showAttachmentStatusOfWorkstation($request->query());
        if ($this->ajax()) {
            return $data;
        }

        // dump($tsList);
        // return $dataDb;
        // return "alo";
        return Inertia::render('Dashboard', ['data' => $data]);
    }

    public function trainset(string $project, string $trainset) {

        $project = DB::select('select * from projects where id = :id', ['id' => $project]);
        $trainsets = DB::select('SELECT trainsets.name as ts_name, projects.name as pj_name,projects.id as project_id ,trainsets.id as ts_id from trainsets inner join projects on projects.id = trainsets.project_id where trainsets.id = :trainset;', ['trainset' => $trainset]);
        $projectFilter = checkPermissions(PermissionEnum::DASHBOARD_TRAINSET_READ, true) ? [] : ['column_filters' => ['buyer_id' => \Auth::user()->id]];
        $projectList = $this->projectService->getAll($projectFilter);

        $carriages = DB::select("SELECT qty, concat(type,' ',description) as type FROM `carriage_trainset` inner join carriages on carriage_trainset.carriage_id = carriages.id where trainset_id = :idTrainset", ['idTrainset' => $trainset]);

        $trainsetPanel = DB::select('SELECT trainsets.name, carriage_panels.panel_id, panels.name ,count(carriage_panels.panel_id) as total FROM `carriage_trainset` INNER JOIN carriage_panels on carriage_panels.carriage_trainset_id = carriage_trainset.id inner join trainsets on trainsets.id = carriage_trainset.trainset_id inner JOIN panels on carriage_panels.panel_id = panels.id where trainset_id = :idTrainset GROUP by carriage_panels.panel_id, panels.name, trainsets.name ORDER BY `carriage_panels`.`panel_id` ASC', ['idTrainset' => $trainset]);

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
        $tsList = DB::select('SELECT * FROM `trainsets` WHERE trainsets.project_id = :id', ['id' => $project[0]->id]);

        // status for each panel
        //    $panel = DB::select("SELECT
        // 'required' AS status,
        // SUM(total_required) AS total
        // FROM trainset_attachment_components where trainset_attachment_components.trainset_attachment_id = 1
        // UNION ALL
        // SELECT
        // 'fulfilled' AS status,
        // SUM(total_fulfilled) AS total
        // FROM trainset_attachment_components where trainset_attachment_components.trainset_attachment_id = 1
        // UNION ALL
        // SELECT
        // 'failed' AS status,
        // SUM(total_failed) AS total
        // FROM trainset_attachment_components where trainset_attachment_coomponents.trainset_attachment_id = 1;");

        // Trainset Panel
        $panel = DB::select("WITH attachment_data AS (
        SELECT
            trainset_attachment_components.total_required,
            trainset_attachment_components.total_fulfilled,
            trainset_attachment_components.total_failed
        FROM trainset_attachment_components
        INNER JOIN trainset_attachments
            ON trainset_attachment_components.trainset_attachment_id = trainset_attachments.id
        WHERE trainset_attachments.trainset_id = :trainset
    )
    SELECT 'required' AS status, SUM(total_required-total_fulfilled) AS total FROM attachment_data
    UNION ALL
    SELECT 'fulfilled' AS status, SUM(total_fulfilled) AS total FROM attachment_data
    UNION ALL
    SELECT 'failed' AS status, SUM(total_failed) AS total FROM attachment_data;", ['trainset' => $trainset]);

        // $panel = DB::select('SELECT trainsets.name, components.name, sum(trainset_attachment_components.total_required) as required, sum(trainset_attachment_components.total_fulfilled) as fulfilled, sum(trainset_attachment_components.total_failed) as failed FROM `trainset_attachment_components` inner JOIN carriage_panel_components on trainset_attachment_components.carriage_panel_component_id = carriage_panel_components.id inner join components on components.id = carriage_panel_components.component_id inner JOIN trainset_attachments on trainset_attachments.id = trainset_attachment_components.trainset_attachment_id inner join trainsets on trainsets.id = trainset_attachments.trainset_id where trainsets.id = 1 group by trainset_attachment_components.total_required, trainset_attachment_components.total_fulfilled,trainset_attachment_components.total_failed, components.name, trainsets.name, trainsets.name, components.name');

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
            'trainsetId' => $trainset,
            'trainsets' => $trainsets,
            'carriages' => $carriages,
            'panel' => $trainsetPanel,
            'total' => $panel,
            'tsList' => $tsList,
            'projectList' => $projectList,
            'project' => $project,
        ];

        return Inertia::render('Dashboard/DashboardTrainset', ['data' => $data]);
    }

    public function store(Request $request) {
        $intent = $request->get('intent');
        if ($this->ajax()) {
            switch ($intent) {
                case IntentEnum::STORE_APK_FILE->value:
                    $request->validate([
                        'file_path' => 'required|file|mimes:application/vnd.android.package-archive,zip,jar', // https://stackoverflow.com/a/47909356
                    ]);

                    return $this->dashboardService->storeApkFile();
                case IntentEnum::STORE_MANUAL_BOOK_FILE->value:
                    $request->validate([
                        'file_path' => 'required|file|mimes:pdf',
                    ]);

                    return $this->dashboardService->storeManualBookFile();
            }
        }
    }
}
