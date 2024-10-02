<?php

use Tests\TestCase;
use App\Models\Role;
use App\Models\Step;
use App\Models\User;
use App\Models\Panel;
use App\Models\Project;
use App\Models\WorkDay;
use App\Models\Carriage;
use App\Models\Division;
use App\Models\Progress;
use App\Models\Trainset;
use App\Models\Workshop;
use App\Models\Component;
use App\Models\Permission;
use App\Models\RawMaterial;
use App\Models\SerialPanel;
use App\Models\WorkDayTime;
use App\Models\Workstation;
use App\Models\ProgressStep;
use App\Models\CarriagePanel;
use App\Models\PanelMaterial;
use App\Models\PanelAttachment;
use App\Support\Enums\RoleEnum;
use App\Models\CarriageTrainset;
use App\Models\DetailWorkerPanel;
use App\Models\TrainsetAttachment;
use App\Models\DetailWorkerTrainset;
use App\Support\Enums\PermissionEnum;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Support\Enums\DetailWorkerTrainsetWorkStatusEnum;
use App\Support\Enums\DetailWorkerTrainsetAcceptanceStatusEnum;

/*
|--------------------------------------------------------------------------
| Test Case
|--------------------------------------------------------------------------
|
| The closure you provide to your test functions is always bound to a specific PHPUnit test
| case class. By default, that class is "PHPUnit\Framework\TestCase". Of course, you may
| need to change it using the "uses()" function to bind a different classes or traits.
|
*/

uses(TestCase::class, RefreshDatabase::class)->in('Feature');
// uses(TestCase::class)->in('Feature');

/*
|--------------------------------------------------------------------------
| Expectations
|--------------------------------------------------------------------------
|
| When you're writing tests, you often need to check that values meet certain conditions. The
| "expect()" function gives you access to a set of "expectations" methods that you can use
| to assert different things. Of course, you may extend the Expectation API at any time.
|
*/

expect()->extend('toBeOne', function () {
    return $this->toBe(1);
});

/*
|--------------------------------------------------------------------------
| Functions
|--------------------------------------------------------------------------
|
| While Pest is very powerful out-of-the-box, you may have some testing code specific to your
| project that you don't want to repeat in every file. Here you can also expose helpers as
| global functions to help you to reduce the number of lines of code in your test files.
|
*/

function actAsSuperAdmin(): TestCase {
    $role = Role::firstOrCreate(['name' => 'Super Admin']);
    $user = User::factory(['name' => 'Super Admin'])->create();
    $user->assignRole($role);

    return test()->actingAs($user);
}

function actAsPpcPerencanaan(): TestCase {
    $permissions = [
        PermissionEnum::USER_CREATE->value,
        PermissionEnum::USER_READ->value,
        PermissionEnum::USER_UPDATE->value,
        PermissionEnum::USER_DELETE->value,
    ];
    $permissions = collect($permissions)->map(fn ($permission) => Permission::firstOrCreate(['name' => $permission]));

    $role = Role::firstOrCreate(['name' => 'PPC Perencanaan']);
    $user = User::factory(['name' => 'PPC Perencanaan'])->create();
    $user->assignRole($role);

    return test()->actingAs($user);
}

function actAsPpcPengendalian(): TestCase {
    $role = Role::firstOrCreate(['name' => 'PPC Pengendalian']);
    $user = User::factory(['name' => 'PPC Pengendalian'])->create();
    $user->assignRole($role);

    return test()->actingAs($user);
}

/**
 * Used to handle: ApiPanelAttachmentControllerTest requiring user with role SUPERVISOR_ASSEMBLY
 */
function createSupervisorAssembly(): User {
    $role = Role::firstOrCreate(['name' => RoleEnum::SUPERVISOR_ASSEMBLY]);
    $user = User::factory(['name' => 'Supervisor Assembly'])->create();
    $user->assignRole($role);

    return $user;
}

function createSupervisorMekanik(): User {
    $role = Role::firstOrCreate(['name' => RoleEnum::SUPERVISOR_MEKANIK]);
    $user = User::factory(['name' => 'Supervisor Mekanik'])->create();
    $user->assignRole($role);

    return $user;
}

function createSupervisorElektrik(): User {
    $role = Role::firstOrCreate(['name' => RoleEnum::SUPERVISOR_ELEKTRIK]);
    $user = User::factory(['name' => 'Supervisor Elektrik'])->create();
    $user->assignRole($role);

    return $user;
}

function createWorkerAssembly(): User {
    $role = Role::firstOrCreate(['name' => RoleEnum::WORKER_ASSEMBLY]);
    $user = User::factory(['name' => 'Worker Assembly'])->create();
    $user->assignRole($role);

    return $user;
}

function createWorkerMekanik(): User {
    $role = Role::firstOrCreate(['name' => RoleEnum::WORKER_MEKANIK]);
    $user = User::factory(['name' => 'Worker Mekanik'])->create();
    $user->assignRole($role);

    return $user;
}

function createWorkerElektrik(): User {
    $role = Role::firstOrCreate(['name' => RoleEnum::WORKER_ELEKTRIK]);
    $user = User::factory(['name' => 'Worker Elektrik'])->create();
    $user->assignRole($role);

    return $user;
}

function createComponent(): Component {
    $component = new Component;
    $component->name = 'Component';
    $component->save();

    return $component;
}

function createPanelMaterial(): PanelMaterial {
    createRawMaterial();
    createCarriagePanel();
    $panelMaterial = new PanelMaterial;
    $panelMaterial->save();

    return $panelMaterial;
}

function createRawMaterial(): RawMaterial {
    $rawMaterial = RawMaterial::factory()->create();

    return $rawMaterial;
}

// function createCarriagePanel() {
//     Carriage::factory()->create();
//     createProgress();
//     createCarriageTrainset();
//     createPanel();

//     $carriagePanel = CarriagePanel::factory()->create();

//     return $carriagePanel;
// }

// function createCarriageTrainset() {
//     $trainset = createTrainset();
//     $carriageTrainset = CarriageTrainset::factory()->create();

//     return $carriageTrainset;
// }

function createProject(): Project {
    $project = new Project;
    $project->name = 'Project';
    $project->save();

    return $project;
}

function createTrainset(): Trainset {
    createProject();

    $trainset = Trainset::factory()->create();

    return $trainset;
}

function createProgress(): Progress {
    $progress = Progress::factory()->create();

    return $progress;
}

function createPanel(): Panel {
    createProgress();
    $panel = Panel::factory()->create();

    return $panel;
}

function createWorkDay(): WorkDay {
    $workDay = WorkDay::factory()->create();

    return $workDay;
}

function createWorkDayTime(): WorkDayTime {
    $workDay = createWorkDay();
    $workDayTime = WorkDayTime::factory()->create(['work_day_id' => $workDay->id]);

    return $workDayTime;
}

function createDivision(): Division {
    $division = new Division;
    $division->name = 'Test Division';
    $division->save();

    return $division;
}

function createWorkshop(): Workshop {
    $workshop = new Workshop;
    $workshop->name = 'Test Workshop';
    $workshop->address = 'Test Address';
    $workshop->save();

    return $workshop;
}

function createWorkstation(): Workstation {
    $division = createDivision();
    $workshop = createWorkshop();
    $workstation = new Workstation;
    $workstation->name = 'Test Workstation';
    $workstation->location = 'Test Workstation Location';
    $workstation->division_id = $division->id;
    $workstation->workshop_id = $workshop->id;
    $workstation->save();

    return $workstation;
}

function createCarriageTrainset(): CarriageTrainset {
    $trainset = createTrainset();
    $carriage = Carriage::factory()->create();

    $carriageTrainset = CarriageTrainset::create([
        'trainset_id' => $trainset->id,
        'carriage_id' => $carriage->id,
        'qty' => 5,
    ]);
    $carriageTrainset->save();

    return $carriageTrainset;
}

function createCarriagePanel(): CarriagePanel {
    createCarriageTrainset();
    $progress = createProgress();
    $panel = createPanel();
    $carriagePanel = new CarriagePanel;
    $carriagePanel->carriage_trainset_id = CarriageTrainset::inRandomOrder()->first()->id;
    $carriagePanel->panel_id = $panel->id;
    $carriagePanel->progress_id = $progress->id;
    $carriagePanel->qty = 5;
    $carriagePanel->save();

    return $carriagePanel;
}

function createPanelAttachment(): PanelAttachment {
    createCarriageTrainset();
    createCarriagePanel();
    createWorkstation();
    createWorkstation();

    $panelAttachment = PanelAttachment::factory()->create();

    return $panelAttachment;
}

function createSerialPanel(): SerialPanel {
    $panelAttachment = createPanelAttachment();
    $serialPanel = SerialPanel::create([
        'panel_attachment_id' => $panelAttachment->id,
        'qr_code' => $panelAttachment->qr_code,
        'qr_path' => $panelAttachment->qr_path,
        'manufacture_status' => 'in_progress',
        'notes' => 'ini serial panel notes',
    ]);

    return $serialPanel;

}

function createStep(): Step {
    $step = Step::factory()->create();

    return $step;
}

function createProgressStep(): ProgressStep {
    createProgress();
    createStep();
    $progressStep = ProgressStep::factory()->create();

    return $progressStep;
}

function createDetailWorkerPanel(): DetailWorkerPanel {
    User::factory()->create();
    createSerialPanel();
    createProgressStep();
    $detailWorkerPanel = DetailWorkerPanel::factory()->create();

    return $detailWorkerPanel;
}

function createTrainsetAttachment(User $user = null) {
    createCarriageTrainset();
    createWorkstation(); // source
    createWorkstation(); // destination

    $attributes = [];
    if ($user) {
        $attributes['supervisor_id'] = $user->id;
    }

    $trainsetAttachment = TrainsetAttachment::factory()->create($attributes);

    return $trainsetAttachment;
}

function createDetailWorkerTrainset() {
    createSupervisorAssembly();
    $role = Role::firstOrCreate(['name' => 'Supervisor - Elektrik', 'guard_name' => 'web']);
    $user = User::factory(['name' => 'Supervisor - Elektrik'])->create();
    $user->assignRole('Supervisor - Elektrik');

    createProgressStep();
    createTrainsetAttachment($user);
    $detailWorkerTrainset = DetailWorkerTrainset::create([
        'trainset_attachment_id' => TrainsetAttachment::inRandomOrder()->first()->id,
        'worker_id' => $user->id,
        'progress_step_id' => ProgressStep::inRandomOrder()->first()->id,
        'estimated_time' => 7,
        'work_status' => DetailWorkerTrainsetWorkStatusEnum::IN_PROGRESS->value,
        'acceptance_status' => DetailWorkerTrainsetAcceptanceStatusEnum::ACCEPTED->value
    ]);

    return $detailWorkerTrainset;
}
