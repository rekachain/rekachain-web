<?php

namespace App\Support\Enums;

enum PermissionEnum: string {
    //    case DIVISION_CREATE = 'division-create';
    //    case DIVISION_READ = 'division-read';
    //    case DIVISION_UPDATE = 'division-update';
    //    case DIVISION_DELETE = 'division-delete';

    case ROLE_CREATE = 'role-create';
    case ROLE_READ = 'role-read';
    case ROLE_UPDATE = 'role-update';
    case ROLE_DELETE = 'role-delete';

    case USER_CREATE = 'user-create';
    case USER_READ = 'user-read';
    case USER_UPDATE = 'user-update';
    case USER_DELETE = 'user-delete';
    
    case PROJECT_CREATE = 'project-create';
    case PROJECT_READ = 'project-read';
    case PROJECT_UPDATE = 'project-update';
    case PROJECT_DELETE = 'project-delete';

    public static function groupByFirstWord(): array {
        $grouped = [];

        foreach (self::cases() as $case) {
            [$group] = explode('-', $case->value);
            $grouped[$group][] = $case->value;
        }

        return $grouped;
    }
}
