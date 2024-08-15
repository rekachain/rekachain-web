<?php

namespace App\Support\Enums;

enum PermissionEnum: string {
    case DIVISION_CREATE = 'division-create';
    case DIVISION_READ = 'division-read';
    case DIVISION_UPDATE = 'division-update';
    case DIVISION_DELETE = 'division-delete';

    case WORKSHOP_CREATE = 'workshop-create';
    case WORKSHOP_READ = 'workshop-read';
    case WORKSHOP_UPDATE = 'workshop-update';
    case WORKSHOP_DELETE = 'workshop-delete';

    case WORKSTATION_CREATE = 'workstation-create';
    case WORKSTATION_READ = 'workstation-read';
    case WORKSTATION_UPDATE = 'workstation-update';
    case WORKSTATION_DELETE = 'workstation-delete';

    case ROLE_CREATE = 'role-create';
    case ROLE_READ = 'role-read';
    case ROLE_UPDATE = 'role-update';
    case ROLE_DELETE = 'role-delete';

    case USER_CREATE = 'user-create';
    case USER_READ = 'user-read';
    case USER_UPDATE = 'user-update';
    case USER_DELETE = 'user-delete';

    public static function groupByFirstWord(): array {
        $grouped = [];

        foreach (self::cases() as $case) {
            [$group] = explode('-', $case->value);
            $grouped[$group][] = $case->value;
        }

        return $grouped;
    }
}
