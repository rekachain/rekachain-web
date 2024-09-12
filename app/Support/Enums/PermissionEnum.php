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

    case PROJECT_CREATE = 'project-create';
    case PROJECT_READ = 'project-read';
    case PROJECT_UPDATE = 'project-update';
    case PROJECT_DELETE = 'project-delete';

    case PERMISSION_CREATE = 'permission-create';
    case PERMISSION_READ = 'permission-read';
    case PERMISSION_UPDATE = 'permission-update';
    case PERMISSION_DELETE = 'permission-delete';

    case CARRIAGE_PRESET_CREATE = 'carriage-preset-create';
    case CARRIAGE_PRESET_READ = 'carriage-preset-read';
    case CARRIAGE_PRESET_UPDATE = 'carriage-preset-update';
    case CARRIAGE_PRESET_DELETE = 'carriage-preset-delete';

    case PRESET_TRAINSET_CREATE = 'preset-trainset-create';
    case PRESET_TRAINSET_READ = 'preset-trainset-read';
    case PRESET_TRAINSET_UPDATE = 'preset-trainset-update';
    case PRESET_TRAINSET_DELETE = 'preset-trainset-delete';

    case PANEL_CREATE = 'panel-create';
    case PANEL_READ = 'panel-read';
    case PANEL_UPDATE = 'panel-update';
    case PANEL_DELETE = 'panel-delete';

    case CARRIAGE_PANEL_CREATE = 'carriage-panel-create';
    case CARRIAGE_PANEL_READ = 'carriage-panel-read';
    case CARRIAGE_PANEL_UPDATE = 'carriage-panel-update';
    case CARRIAGE_PANEL_DELETE = 'carriage-panel-delete';

    case RAW_MATERIAL_CREATE = 'raw-material-create';
    case RAW_MATERIAL_READ = 'raw-material-read';
    case RAW_MATERIAL_UPDATE = 'raw-material-update';
    case RAW_MATERIAL_DELETE = 'raw-material-delete';

    case CARRIAGE_CREATE = 'carriage-create';
    case CARRIAGE_READ = 'carriage-read';
    case CARRIAGE_UPDATE = 'carriage-update';
    case CARRIAGE_DELETE = 'carriage-delete';

    case WORK_DAY_CREATE = 'work-day-create';
    case WORK_DAY_READ = 'work-day-read';
    case WORK_DAY_UPDATE = 'work-day-update';
    case WORK_DAY_DELETE = 'work-day-delete';

    case WORK_DAY_TIME_CREATE = 'work-day-time-create';
    case WORK_DAY_TIME_READ = 'work-day-time-read';
    case WORK_DAY_TIME_UPDATE = 'work-day-time-update';
    case WORK_DAY_TIME_DELETE = 'work-day-time-delete';

    case STEP_CREATE = 'step-create';
    case STEP_READ = 'step-read';
    case STEP_UPDATE = 'step-update';
    case STEP_DELETE = 'step-delete';

    case COMPONENT_CREATE = 'component-create';
    case COMPONENT_READ = 'component-read';
    case COMPONENT_UPDATE = 'component-update';
    case COMPONENT_DELETE = 'component-delete';

    /**
     * [Deprecated] Group permissions by first word.
     *
     * This process is now handled by the PermissionObserver.
     */
    public static function groupByFirstWord(): array {
        $grouped = [];

        foreach (self::cases() as $case) {
            [$group] = explode('-', $case->value);
            $grouped[$group][] = $case->value;
        }

        return $grouped;
    }
}
