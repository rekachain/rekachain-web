<?php

namespace Database\Seeders;

use App\Models\Division;
use App\Models\Role;
use App\Support\Enums\PermissionEnum;
use App\Support\Enums\RoleEnum;
use App\Support\Interfaces\Services\PermissionServiceInterface;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $permissionService = app(PermissionServiceInterface::class);

        $roles = [
            ['name' => RoleEnum::SUPER_ADMIN->value],
            ['name' => RoleEnum::PPC_PERENCANAAN->value, 'level' => 'PPC'],
            ['name' => RoleEnum::PPC_PENGENDALIAN->value, 'level' => 'PPC'],
            ['name' => RoleEnum::SUPERVISOR_MEKANIK->value, 'level' => 'Supervisor', 'division_id' => Division::whereName('Mekanik')->first()->id],
            ['name' => RoleEnum::SUPERVISOR_ELEKTRIK->value, 'level' => 'Supervisor', 'division_id' => Division::whereName('Elektrik')->first()->id],
            ['name' => RoleEnum::SUPERVISOR_ASSEMBLY->value, 'level' => 'Supervisor', 'division_id' => Division::whereName('Assembly')->first()->id],
            ['name' => RoleEnum::WORKER_MEKANIK->value, 'level' => 'Worker', 'division_id' => Division::whereName('Mekanik')->first()->id],
            ['name' => RoleEnum::WORKER_ELEKTRIK->value, 'level' => 'Worker', 'division_id' => Division::whereName('Elektrik')->first()->id],
            ['name' => RoleEnum::WORKER_ASSEMBLY->value, 'level' => 'Worker', 'division_id' => Division::whereName('Assembly')->first()->id],
            ['name' => RoleEnum::QC_MEKANIK->value, 'level' => 'QC', 'division_id' => Division::whereName('Mekanik')->first()->id],
            ['name' => RoleEnum::QC_ELEKTRIK->value, 'level' => 'QC', 'division_id' => Division::whereName('Elektrik')->first()->id],
            ['name' => RoleEnum::QC_ASSEMBLY->value, 'level' => 'QC', 'division_id' => Division::whereName('Assembly')->first()->id],
            ['name' => RoleEnum::SUPERVISOR_AFTERSALES->value, 'level' => 'Supervisor', 'division_id' => Division::whereName('Aftersales')->first()->id],
            ['name' => RoleEnum::MANAGER_AFTERSALES->value, 'level' => 'Manager', 'division_id' => Division::whereName('Aftersales')->first()->id],
            ['name' => RoleEnum::WORKER_AFTERSALES->value, 'level' => 'Worker', 'division_id' => Division::whereName('Aftersales')->first()->id],
            ['name' => RoleEnum::CUSTOMER->value, 'level' => 'Customer'],
        ];

        foreach ($roles as $role) {
            Role::firstOrCreate($role);
        }

        // give all permissions to PPC Perencanaan
        $permissions = $permissionService->find([
            ['group', 'not_in', [
                'division', 'permission', 'role', 'work-day', 'work-day-time', 'detail-worker-trainset', 'detail-worker-panel',
            ]],
        ]);
        Role::findById(2)->givePermissionTo($permissions);

        // give all read permissions to PPC Pengendalian
        $permissions = $permissionService->find([
            ['group', 'not_in', [
                'division', 'permission', 'role', 'work-day', 'work-day-time',
            ]],
            ['name', 'regexp', '(.*)-(read|download)'],
        ]);
        Role::findById(3)->givePermissionTo($permissions);

        // give all read work day and work day time permissions to PPC
        $permissions = $permissionService->find([
            ['group', 'in', [
                'work-day', 'work-day-time', 'division',
            ]],
            ['name', 'like', '%-read'],
        ]);
        Role::findMany([2, 3])->each(fn ($role) => $role->givePermissionTo($permissions));

        // give all dashboard permissions to Supervisor
        $permissions = $permissionService->find([
            ['group', 'in', ['dashboard', 'dashboard-trainset', 'dashboard-commission']],
        ]);
        Role::findMany([4, 5, 6])->each(fn ($role) => $role->givePermissionTo($permissions));

        // give all project read permissions to Supervisor
        $permissions = $permissionService->find([
            ['name', 'like', 'project-%'],
            ['name', 'regexp', '(.*)-(read|download)'],
        ]);
        Role::findMany([4, 5, 6])->each(fn ($role) => $role->givePermissionTo($permissions));

        // give trainset attachment related read and update permissions to Supervisor Mekanik, Supervisor Elektrik, and PPC Pengendalian
        $permissions = $permissionService->find([
            ['group', 'in', ['trainset-attachment', 'detail-worker-trainset']],
            ['name', 'regexp', '(.*)-(update|read|download)'],
        ]);
        Role::findMany([3, 4, 5])->each(fn ($role) => $role->givePermissionTo($permissions));

        // give panel attachment related read and update permissions to Supervisor Assembly and PPC Pengendalian
        $permissions = $permissionService->find([
            ['group', 'in', ['panel-attachment', 'serial-panel', 'detail-worker-panel']],
            ['name', 'regexp', '(.*)-(update|read|download)'],
        ]);
        Role::findMany([3, 6])->each(fn ($role) => $role->givePermissionTo($permissions));

        // give create and update detail-worker permissions to Supervisor Mk Ek, Worker Mk Ek, and QC Mk Ek
        $permissions = $permissionService->find([
            ['group', 'in', ['detail-worker-trainset']],
            ['name', 'regexp', '(.*)-(create|update)'],
        ]);
        Role::findMany([4, 5, 7, 8, 10, 11])->each(fn ($role) => $role->givePermissionTo($permissions));

        // give create and update detail-worker permissions to Supervisor Assembly, Worker Assembly, and QC Assembly
        $assemblyPermissions = $permissionService->find([
            ['group', 'in', ['detail-worker-panel']],
            ['name', 'regexp', '(.*)-(create|update)'],
        ]);
        Role::findMany([6, 9, 12])->each(fn ($role) => $role->givePermissionTo($assemblyPermissions));

        // give all after sales permission for Aftersales
        $aftersalesPermissions = $permissionService->find([
            ['group', 'in', ['returned-product', 'returned-product-note', 'returned-product-request', 'product-problem', 'product-problem-note', 'replacement-stock']],
        ]);
        Role::findMany([13, 14, 15])->each(fn ($role) => $role->givePermissionTo($aftersalesPermissions));

        // give permissions to customer
        $customerPermissions = $permissionService->find([
            ['group', 'returned-product-request'],
        ]);
        Role::findById(16)->givePermissionTo($customerPermissions);
        Role::findById(16)->givePermissionTo(PermissionEnum::DASHBOARD_COMMISSION_READ->value);
    }
}
