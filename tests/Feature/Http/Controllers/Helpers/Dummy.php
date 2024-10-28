<?php

namespace Tests\Feature\Http\Controllers\Helpers;

use App\Models\Role;
use App\Models\Step;
use App\Models\User;
use App\Models\Panel;
use App\Models\Project;
use App\Models\WorkDay;
use App\Models\Carriage;
use App\Models\Division;
use App\Models\Feedback;
use App\Models\Progress;
use App\Models\Trainset;
use App\Models\Workshop;
use App\Models\Component;
use App\Models\Permission;
use App\Models\WorkAspect;
use App\Models\RawMaterial;
use App\Models\SerialPanel;
use App\Models\WorkDayTime;
use App\Models\Workstation;
use App\Models\ProgressStep;
use App\Models\CarriagePanel;
use App\Models\PanelMaterial;
use App\Models\CarriagePreset;
use App\Models\PresetTrainset;
use App\Models\PanelAttachment;
use App\Support\Enums\RoleEnum;
use App\Models\CarriageTrainset;
use App\Models\ComponentMaterial;
use App\Models\DetailWorkerPanel;
use App\Models\TrainsetAttachment;
use App\Models\DetailWorkerTrainset;
use App\Models\CarriagePanelComponent;
use App\Models\TrainsetAttachmentHandler;
use App\Models\TrainsetAttachmentComponent;
use App\Support\Enums\DetailWorkerTrainsetWorkStatusEnum;
use App\Support\Enums\DetailWorkerTrainsetAcceptanceStatusEnum;

class Dummy {
    /**
     * Used to handle: ApiPanelAttachmentControllerTest requiring user with role SUPERVISOR_ASSEMBLY
     */
    public function createSupervisorAssembly(): User {
        $role = Role::firstOrCreate(['name' => RoleEnum::SUPERVISOR_ASSEMBLY]);
        $user = User::factory(['name' => 'Supervisor Assembly'])->create();
        $user->assignRole($role);

        return $user;
    }

    public function createSupervisorMekanik(): User {
        $role = Role::firstOrCreate(['name' => RoleEnum::SUPERVISOR_MEKANIK]);
        $user = User::factory(['name' => 'Supervisor Mekanik'])->create();
        $user->assignRole($role);

        return $user;
    }

    public function createSupervisorElektrik(): User {
        $role = Role::firstOrCreate(['name' => RoleEnum::SUPERVISOR_ELEKTRIK]);
        $user = User::factory(['name' => 'Supervisor Elektrik'])->create();
        $user->assignRole($role);

        return $user;
    }

    public function createWorkerAssembly(): User {
        $role = Role::firstOrCreate(['name' => RoleEnum::WORKER_ASSEMBLY]);
        $user = User::factory(['name' => 'Worker Assembly'])->create();
        $user->assignRole($role);

        return $user;
    }

    public function createWorkerMekanik(): User {
        $role = Role::firstOrCreate(['name' => RoleEnum::WORKER_MEKANIK]);
        $user = User::factory(['name' => 'Worker Mekanik'])->create();
        $user->assignRole($role);

        return $user;
    }

    public function createWorkerElektrik(): User {
        $role = Role::firstOrCreate(['name' => RoleEnum::WORKER_ELEKTRIK]);
        $user = User::factory(['name' => 'Worker Elektrik'])->create();
        $user->assignRole($role);

        return $user;
    }
    public function createQCMekanik(): User {
        $role = Role::firstOrCreate(['name' => RoleEnum::QC_MEKANIK]);
        $user = User::factory(['name' => 'QC Mekanik'])->create();
        $user->assignRole($role);

        return $user;
    }

    public function createRole(): Role {
        $role = Role::firstOrCreate(['name' => 'Test Role']);

        return $role;
    }

    public function createPermission(): Permission {
        $permission = Permission::firstOrCreate(['name' => 'test-permission', 'guard_name' => 'web']);

        return $permission;
    }

    public function createComponent(): Component {
        $progress = $this->createProgress();
        $component = Component::firstOrCreate(['name' => 'Test Component', 'progress_id' => $progress->id]);

        return $component;
    }

    public function createCarriage(): Carriage {
        $carriage = Carriage::inRandomOrder()->first() ?? Carriage::factory()->create();

        return $carriage;
    }

    public function createCarriagePanelComponent(?Progress $progress = null): CarriagePanelComponent {
        $attributes = [];

        $attributes['carriage_panel_id'] = $this->createCarriagePanel();
        $component = $this->createComponent();
        $attributes['component_id'] = $component->id;

        if ($progress) {
            $attributes['progress_id'] = $progress->id;
        } elseif ($component->progress) {
            $attributes['progress_id'] = $component->progress->id;
        } else {
            $attributes['progress_id'] = $this->createProgress()->id;
        }

        $carriagePanelComponent = CarriagePanelComponent::factory()->create($attributes);

        return $carriagePanelComponent;
    }

    public function createComponentMaterial(): ComponentMaterial {
        $attributes = [];

        $progress = $this->createProgress();

        $attributes['raw_material_id'] = $this->createRawMaterial()->id;
        $attributes['carriage_panel_component_id'] = $this->createCarriagePanelComponent($progress)->id;

        $componentMaterial = ComponentMaterial::inRandomOrder()->first() ?? ComponentMaterial::factory()->create($attributes);

        return $componentMaterial;
    }

    public function createPanelMaterial(): PanelMaterial {
        $this->createRawMaterial();
        $this->createCarriagePanel();
        $panelMaterial = new PanelMaterial;
        $panelMaterial->save();

        return $panelMaterial;
    }

    public function createRawMaterial(): RawMaterial {
        $rawMaterial = RawMaterial::inRandomOrder()->first() ?? RawMaterial::factory()->create();

        return $rawMaterial;
    }

    public function createProject(): Project {
        $project = Project::inRandomOrder()->first() ?? Project::factory()->create();

        return $project;
    }

    public function createTrainset(): Trainset {
        $this->createProject();

        $trainset = Trainset::inRandomOrder()->first() ?? Trainset::factory()->create(['project_id' => $this->createProject()->id]);

        return $trainset;
    }

    public function createProgress(WorkAspect $workAspect = null): Progress {
        $workAspect = $workAspect->id ?? $this->createWorkAspect();
        $progress = Progress::inRandomOrder()->first() ?? Progress::factory()->create(['work_aspect_id' => $workAspect]);

        return $progress;
    }

    public function createWorkAspect(): WorkAspect {
        $workAspect = WorkAspect::inRandomOrder()->first() ?? WorkAspect::factory()->create();

        return $workAspect;
    }

    public function createPanel(): Panel {
        $this->createProgress();
        $panel = Panel::inRandomOrder()->first() ?? Panel::factory()->create();

        return $panel;
    }

    public function createWorkDay(): WorkDay {
        $workDay = WorkDay::inRandomOrder()->first() ?? WorkDay::factory()->create();

        return $workDay;
    }

    public function createWorkDayTime(): WorkDayTime {
        $workDay = $this->createWorkDay();
        $workDayTime = WorkDayTime::inRandomOrder()->first() ?? WorkDayTime::factory()->create(['work_day_id' => $workDay->id]);

        return $workDayTime;
    }

    public function createDivision(String $str = null): Division {
        if($str = 'create') {
            $division = Division::factory()->create(['name' => 'Test Division']);
            return $division;
        }

        $division = Division::inRandomOrder()->first() ?? Division::factory()->create(['name' => 'Test Division']);

        return $division;
    }

    public function createWorkshop(): Workshop {
        $workshop = Workshop::inRandomOrder()->first() ?? Workshop::factory()->create(['name' => 'Test Workshop', 'address' => 'Test Address']);

        return $workshop;
    }

    public function createWorkstation(String $command = null): Workstation {
        if($command = 'create') {
            $workstation = Workstation::factory()->create();

            return $workstation;
        } else {
            $attributes = [];

            $division = $this->createDivision();
            $workshop = $this->createWorkshop();

            $attributes['workshop_id'] = $workshop->id;
            $attributes['division_id'] = $division->id;

            $workstation = Workstation::inRandomOrder()->first() ?? Workstation::factory()->create($attributes);

            return $workstation;
        }
    }

    public function createPresetTrainset(): PresetTrainset {
        $project = $this->createProject();

        $presetTrainset = PresetTrainset::inRandomOrder()->first() ?? PresetTrainset::factory()->create(['project_id' => $project->id]);

        return $presetTrainset;
    }

    public function createCarriagePreset(): CarriagePreset {
        $presetTrainset = $this->createPresetTrainset();
        $carriage = $this->createCarriage();

        $carriagePreset = CarriagePreset::inRandomOrder()->first() ?? CarriagePreset::factory()->create([
            'preset_trainset_id' => $presetTrainset->id,
            'carriage_id' => $carriage->id,
        ]);

        return $carriagePreset;
    }

    public function createCarriageTrainset(): CarriageTrainset {
        $trainset = $this->createTrainset();
        $carriage = $this->createCarriage();

        $carriageTrainset = CarriageTrainset::create([
            'trainset_id' => $trainset->id,
            'carriage_id' => $carriage->id,
            'qty' => 5,
        ]);
        $carriageTrainset->save();

        return $carriageTrainset;
    }

    public function createCarriagePanel(): CarriagePanel {
        $this->createCarriageTrainset();
        $progress = $this->createProgressStep()->progress;
        $panel = $this->createPanel();
        $carriagePanel = new CarriagePanel;
        $carriagePanel->carriage_trainset_id = CarriageTrainset::inRandomOrder()->first()->id;
        $carriagePanel->panel_id = $panel->id;
        $carriagePanel->progress_id = $progress->id;
        $carriagePanel->qty = 5;
        $carriagePanel->save();

        return $carriagePanel;
    }

    public function createPanelAttachment(): PanelAttachment {
        $this->createCarriageTrainset();
        $this->createCarriagePanel();
        $this->createWorkstation();
        $this->createWorkstation();

        $panelAttachment = PanelAttachment::factory()->create();

        return $panelAttachment;
    }

    public function createSerialPanel(): SerialPanel {
        $panelAttachment = $this->createPanelAttachment();
        $serialPanel = SerialPanel::create([
            'panel_attachment_id' => $panelAttachment->id,
            'qr_code' => $panelAttachment->qr_code,
            'qr_path' => $panelAttachment->qr_path,
            'manufacture_status' => 'in_progress',
            'notes' => 'ini serial panel notes',
        ]);

        return $serialPanel;

    }

    public function createStep(): Step {
        $step = Step::inRandomOrder()->first() ?? Step::factory()->create();

        return $step;
    }

    public function createProgressStep(): ProgressStep {
        $attributes = [];

        $attributes['progress_id'] = $this->createProgress()->id;
        $attributes['step_id'] = $this->createStep()->id;

        $progressStep = ProgressStep::factory()->create($attributes);

        return $progressStep;
    }

    public function createDetailWorkerPanel($attributes = []): DetailWorkerPanel {
        User::factory()->create();
        $this->createSerialPanel();
        $this->createProgressStep();

        $detailWorkerPanel = DetailWorkerPanel::factory()->create($attributes);

        return $detailWorkerPanel;
    }

    // public function createTrainsetAttachment(?User $user = null) {
    //     $this->createCarriageTrainset();
    //     $this->createWorkstation('create'); // source
    //     $this->createWorkstation('create'); // destination

    //     $attributes = [];
    //     if ($user) {
    //         $attributes['supervisor_id'] = $user->id;
    //     }

    //     $trainsetAttachment = TrainsetAttachment::factory()->create($attributes);

    //     return $trainsetAttachment;
    // }

    public function createTrainsetAttachment($attributes = []) {
        $this->createCarriageTrainset();
        $this->createWorkstation('create'); // source
        $this->createWorkstation('create'); // destination

        $trainsetAttachment = TrainsetAttachment::factory()->create($attributes);

        return $trainsetAttachment;
    }

    // public function createDetailWorkerTrainset() {
    //     $this->createSupervisorAssembly();
    //     $role = Role::firstOrCreate(['name' => 'Supervisor - Elektrik', 'guard_name' => 'web']);
    //     $user = User::factory(['name' => 'Supervisor - Elektrik'])->create();
    //     $user->assignRole('Supervisor - Elektrik');

    //     $this->createProgressStep();
    //     $this->createTrainsetAttachment($user);
    //     $this->createCarriagePanelComponent();
    //     $detailWorkerTrainset = DetailWorkerTrainset::create([
    //         // 'trainset_attachment_id' => TrainsetAttachment::inRandomOrder()->first()->id,
    //         'trainset_attachment_component_id' => TrainsetAttachmentComponent::factory()->create()->id,
    //         'worker_id' => $user->id,
    //         'progress_step_id' => ProgressStep::inRandomOrder()->first()->id,
    //         'estimated_time' => 7,
    //         'work_status' => DetailWorkerTrainsetWorkStatusEnum::IN_PROGRESS->value,
    //         'acceptance_status' => DetailWorkerTrainsetAcceptanceStatusEnum::ACCEPTED->value,
    //     ]);

    //     return $detailWorkerTrainset;
    // }


    public function createDetailWorkerTrainset() {
        if(DetailWorkerTrainset::count() > 0) {
            $detailWorkerTrainset = DetailWorkerTrainset::inRandomOrder()->first();

            return $detailWorkerTrainset;
        } else {
            $trainsetAttachmentComponent = $this->createTrainsetAttachmentComponent();
            $progressStep = $this->createProgressStep();
            $detailWorkerTrainset = DetailWorkerTrainset::factory()->create([
                'trainset_attachment_component_id' => $trainsetAttachmentComponent->id,
                'progress_step_id' => $progressStep->id,
            ]);

            return $detailWorkerTrainset;
        }
    }

    public function createTrainsetAttachmentComponent(): TrainsetAttachmentComponent {
        if (TrainsetAttachmentComponent::count() > 0) {
            $trainsetAttachmentComponent = TrainsetAttachmentComponent::inRandomOrder()->first();
            return $trainsetAttachmentComponent;
        } else {
            $trainsetAttachmentComponent = TrainsetAttachmentComponent::inRandomOrder()->first() ?? TrainsetAttachmentComponent::create([
                'trainset_attachment_id' => $this->createTrainsetAttachment()->id,
                'carriage_panel_component_id' => $this->createCarriagePanelComponent()->id,
                'total_required' => 5,
                'total_fulfilled' => 4,
                'total_failed' => 1,
            ]);
            return $trainsetAttachmentComponent;

        }
    }

    public function createFeedback() {
        return Feedback::create([
            'name' => 'Test name',
            'email' => 'test@example.com',
            'message' => 'Test message',
            'rating' => 5,
        ]);
    }


    public function createTrainsetAttachmentHandler() {
        $rolePPC = Role::firstOrCreate(['name' => 'PPC - Perencanaan', 'guard_name' => 'web']);
        $userPPC = User::factory(['name' => 'PPC - Perencanaan'])->create();
        $userPPC->assignRole('PPC - Perencanaan');

        $roleProduksi = Role::firstOrCreate(['name' => 'Supervisor - Elektrik', 'guard_name' => 'web']);
        $userProduksi = User::factory(['name' => 'Supervisor - Elektrik'])->create();
        $userProduksi->assignRole('Supervisor - Elektrik');

        $trainsetAttachment = $this->createTrainsetAttachment($userProduksi);
        $trainsetAttachmentHandler = TrainsetAttachmentHandler::create([
            'user_id' => $userPPC->id,
            'trainset_attachment_id' => $trainsetAttachment->id,
            'handles' => 'prepare',
        ]);

        return $trainsetAttachmentHandler;
    }

}
