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
use App\Models\ComponentMaterial;
use App\Models\DetailWorkerPanel;
use App\Models\DetailWorkerTrainset;
use App\Models\Feedback;
use App\Models\PanelAttachment;
use App\Models\PanelMaterial;
use App\Models\Permission;
use App\Models\RawMaterial;
use App\Models\SerialPanel;
use App\Models\WorkDayTime;
use App\Models\Workstation;
use App\Models\ProgressStep;
use App\Models\CarriagePanel;
use App\Support\Enums\RoleEnum;
use App\Models\CarriageTrainset;
use App\Models\TrainsetAttachment;
use App\Support\Enums\PermissionEnum;
use App\Models\CarriagePanelComponent;
use App\Models\TrainsetAttachmentHandler;
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

// uses(TestCase::class, RefreshDatabase::class)->in('Feature');
uses(TestCase::class)->in('Feature');

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
