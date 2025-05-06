<?php

namespace Database\Seeders;

use App\Models\Division;
use App\Models\Role;
use App\Support\Enums\RoleEnum;
use App\Support\Interfaces\Services\PermissionServiceInterface;
use Illuminate\Database\Seeder;

class AftersalesSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        // update division
        $divisions = [
            'Aftersales',
        ];

        foreach ($divisions as $division) {
            Division::firstOrCreate(['name' => $division]);
        }

        // update permission
        $this->call([PermissionSeeder::class]);

        // update role and assign permission
        $permissionService = app(PermissionServiceInterface::class);

        $roles = [
            ['name' => RoleEnum::SUPERVISOR_AFTERSALES->value, 'level' => 'Supervisor', 'division_id' => Division::whereName('Aftersales')->first()->id],
            ['name' => RoleEnum::MANAGER_AFTERSALES->value, 'level' => 'Manager', 'division_id' => Division::whereName('Aftersales')->first()->id],
            ['name' => RoleEnum::WORKER_AFTERSALES->value, 'level' => 'Worker', 'division_id' => Division::whereName('Aftersales')->first()->id],
            ['name' => RoleEnum::CUSTOMER->value, 'level' => 'Customer'],
        ];

        foreach ($roles as $role) {
            Role::firstOrCreate($role);
        }

        // give all after sales permission for Aftersales
        $aftersalesPermissions = $permissionService->find([
            ['group', 'in', ['returned-product', 'returned-product-note', 'returned-product-request', 'product-problem', 'product-problem-note', 'replacement-stock']],
        ]);
        logger(Role::whereIn('name', [RoleEnum::SUPERVISOR_AFTERSALES->value, RoleEnum::MANAGER_AFTERSALES->value, RoleEnum::WORKER_AFTERSALES->value])->get());
        Role::whereIn('name', [RoleEnum::SUPERVISOR_AFTERSALES->value, RoleEnum::MANAGER_AFTERSALES->value, RoleEnum::WORKER_AFTERSALES->value])->get()->each(fn ($role) => $role->givePermissionTo($aftersalesPermissions));

        // give permissions to customer
        $customerPermissions = $permissionService->find([
            ['group', 'returned-product-request'],
        ]);
        Role::whereName(RoleEnum::CUSTOMER->value)->first()->givePermissionTo($customerPermissions);
    }
}
