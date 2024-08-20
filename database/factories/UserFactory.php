<?php

namespace Database\Factories;

use App\Models\Permission;
use App\Models\Role;
use App\Support\Enums\PermissionEnum;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory {
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array {
        return [
            'name' => fake()->name(),
            'nip' => fake()->unique()->numerify('##############'),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'phone_number' => fake()->optional()->numerify('###########'),
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
        ];
    }

    /**
     * Testing purpose only.
     */
    public function superAdmin(): Factory|UserFactory {
        return $this->afterCreating(function ($user) {
            $role = Role::firstOrCreate(['name' => 'Super Admin']);
            $user->assignRole($role);
        });
    }

    /**
     * Testing purpose only.
     *
     * Act as authorized user.
     */
    public function ppcPerencanaan(): Factory|UserFactory {
        return $this->afterCreating(function ($user) {
            $permissions = [
                PermissionEnum::USER_CREATE->value,
                PermissionEnum::USER_READ->value,
                PermissionEnum::USER_UPDATE->value,
                PermissionEnum::USER_DELETE->value,
            ];

            $permissions = collect($permissions)->map(fn ($permission) => Permission::firstOrCreate(['name' => $permission]));
            $role = Role::firstOrCreate(['name' => 'PPC Perencanaan']);
            $role->givePermissionTo($permissions);
            $user->assignRole($role);
        });
    }

    /**
     * Testing purpose only.
     *
     * Act as unauthorized user.
     */
    public function ppcPengendalian(): Factory|UserFactory {
        return $this->afterCreating(function ($user) {
            $role = Role::firstOrCreate(['name' => 'PPC Pengendalian']);
            $user->assignRole($role);
        });
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
