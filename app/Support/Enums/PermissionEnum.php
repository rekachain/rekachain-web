<?php

namespace App\Support\Enums;

enum PermissionEnum: string {
    case DASHBOARD_READ = 'dashboard-read';
    case DASHBOARD_TRAINSET_READ = 'dashboard-trainset-read';
    case DASHBOARD_COMMISSION_READ = 'dashboard-commission-read';

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
    case PROJECT_IMPORT = 'project-import';
    case PROJECT_COMPONENT_READ = 'project-component-read'; // open component view by project
    case PROJECT_COMPONENT_IMPORT = 'project-component-import'; // import component from component view by project
    case PROJECT_PANEL_READ = 'project-panel-read'; // open panel view by project
    case PROJECT_PANEL_IMPORT = 'project-panel-import'; // import panel from panel view by project
    case PROJECT_CARRIAGE_READ = 'project-carriage-read'; // open carriage view by project
    case PROJECT_CARRIAGE_COMPONENT_READ = 'project-carriage-component-read'; // open component view by carriage by project
    case PROJECT_CARRIAGE_COMPONENT_IMPORT = 'project-carriage-component-import'; // import component by carriage by project
    case PROJECT_CARRIAGE_PANEL_READ = 'project-carriage-panel-read'; // open panel view by carriage by project
    case PROJECT_CARRIAGE_PANEL_IMPORT = 'project-carriage-panel-import'; // import  panel by carriage by project
    case PROJECT_TRAINSET_CREATE = 'project-trainset-create'; // add trainset in trainset by project view
    case PROJECT_TRAINSET_READ = 'project-trainset-read'; // open trainset view by project
    case PROJECT_TRAINSET_UPDATE = 'project-trainset-update'; // toggle edit name for trainset by project view
    case PROJECT_TRAINSET_DELETE = 'project-trainset-delete'; // delete trainset by project
    case PROJECT_TRAINSET_COMPONENT_READ = 'project-trainset-component-read'; // open component by trainset by project view
    case PROJECT_TRAINSET_COMPONENT_IMPORT = 'project-trainset-component-import'; // import component by trainset by project
    case PROJECT_TRAINSET_PANEL_READ = 'project-trainset-panel-read'; // open panel by trainset by project view
    case PROJECT_TRAINSET_PANEL_IMPORT = 'project-trainset-panel-import'; // import panel by trainset by project
    case PROJECT_TRAINSET_CARRIAGE_TRAINSET_CREATE = 'project-trainset-carriage-trainset-create'; // add carriage-trainset
    case PROJECT_TRAINSET_CARRIAGE_TRAINSET_READ = 'project-trainset-carriage-trainset-read'; // open carriage-trainset by trainset by project view
    case PROJECT_TRAINSET_CARRIAGE_TRAINSET_UPDATE = 'project-trainset-carriage-trainset-update'; // toggle edit carriage qty
    case PROJECT_TRAINSET_CARRIAGE_TRAINSET_DELETE = 'project-trainset-carriage-trainset-delete'; // delete carriage-trainset by trainset by project
    case PROJECT_TRAINSET_CARRIAGE_TRAINSET_SERIAL_EXPORT = 'project-trainset-carriage-trainset-serial-export'; // export serial carriage-trainset
    case PROJECT_TRAINSET_CARRIAGE_TRAINSET_PRESET_CREATE = 'project-trainset-carriage-trainset-preset-create'; // create carriage-trainset preset
    case PROJECT_TRAINSET_CARRIAGE_TRAINSET_PRESET_CHANGE = 'project-trainset-carriage-trainset-preset-change'; // change carriage-trainset preset
    case PROJECT_TRAINSET_CARRIAGE_TRAINSET_ATTACHMENT_READ = 'project-trainset-carriage-trainset-attachment-read'; // open carriage-trainset attachment detail
    case PROJECT_TRAINSET_CARRIAGE_TRAINSET_ATTACHMENT_GENERATE = 'project-trainset-carriage-trainset-attachment-generate'; // generate carriage-trainset attachment
    case PROJECT_TRAINSET_CARRIAGE_TRAINSET_ATTACHMENT_PROGRESS_READ = 'project-trainset-carriage-trainset-attachment-progress-read'; // open carriage-trainset attachment progress
    case PROJECT_TRAINSET_CARRIAGE_TRAINSET_PANEL_CREATE = 'project-trainset-carriage-trainset-panel-create'; // add panel to panel by carriage-trainet by trainset by project
    case PROJECT_TRAINSET_CARRIAGE_TRAINSET_PANEL_READ = 'project-trainset-carriage-trainset-panel-read'; // open panel by carriage-trainset by trainset by project view
    case PROJECT_TRAINSET_CARRIAGE_TRAINSET_PANEL_UPDATE = 'project-trainset-carriage-trainset-panel-update'; // toggle edit panel qty
    case PROJECT_TRAINSET_CARRIAGE_TRAINSET_PANEL_DELETE = 'project-trainset-carriage-trainset-panel-delete'; // delete panel in panel by carriage-trainset by trainset by project
    case PROJECT_TRAINSET_CARRIAGE_TRAINSET_PANEL_PROGRESS_UPDATE = 'project-trainset-carriage-trainset-panel-progress-update'; // update progress for panel
    case PROJECT_TRAINSET_CARRIAGE_TRAINSET_PANEL_MATERIAL_CREATE = 'project-trainset-carriage-trainset-panel-material-create'; // add raw material for material by panel view
    case PROJECT_TRAINSET_CARRIAGE_TRAINSET_PANEL_MATERIAL_READ = 'project-trainset-carriage-trainset-panel-material-read'; // open materials for panel view
    case PROJECT_TRAINSET_CARRIAGE_TRAINSET_PANEL_MATERIAL_UPDATE = 'project-trainset-carriage-trainset-panel-material-update'; // toggle edit material qty
    case PROJECT_TRAINSET_CARRIAGE_TRAINSET_PANEL_MATERIAL_DELETE = 'project-trainset-carriage-trainset-panel-material-delete'; // delete material in material by panel view
    case PROJECT_TRAINSET_CARRIAGE_TRAINSET_PANEL_COMPONENT_CREATE = 'project-trainset-carriage-trainset-panel-component-create'; // add component to panel
    case PROJECT_TRAINSET_CARRIAGE_TRAINSET_PANEL_COMPONENT_READ = 'project-trainset-carriage-trainset-panel-component-read'; // open components for panel view
    case PROJECT_TRAINSET_CARRIAGE_TRAINSET_PANEL_COMPONENT_UPDATE = 'project-trainset-carriage-trainset-panel-component-update'; // toggle edit component qty
    case PROJECT_TRAINSET_CARRIAGE_TRAINSET_PANEL_COMPONENT_DELETE = 'project-trainset-carriage-trainset-panel-component-delete'; // delete component in component by panel view
    case PROJECT_TRAINSET_CARRIAGE_TRAINSET_PANEL_COMPONENT_PROGRESS_UPDATE = 'project-trainset-carriage-trainset-panel-component-progress-update'; // update progress for component
    case PROJECT_TRAINSET_CARRIAGE_TRAINSET_PANEL_COMPONENT_MATERIAL_CREATE = 'project-trainset-carriage-trainset-panel-component-material-create'; // add raw material for material by component view
    case PROJECT_TRAINSET_CARRIAGE_TRAINSET_PANEL_COMPONENT_MATERIAL_READ = 'project-trainset-carriage-trainset-panel-component-material-read'; // open materials for component view
    case PROJECT_TRAINSET_CARRIAGE_TRAINSET_PANEL_COMPONENT_MATERIAL_UPDATE = 'project-trainset-carriage-trainset-panel-component-material-update'; // toggle edit material qty
    case PROJECT_TRAINSET_CARRIAGE_TRAINSET_PANEL_COMPONENT_MATERIAL_DELETE = 'project-trainset-carriage-trainset-panel-component-material-delete'; // delete material in material by component view
    // case PROJECT_TRAINSET_CARRIAGE_TRAINSET_PANEL_COMPONENT_MATERIAL_PROGRESS_UPDATE = 'project-trainset-carriage-trainset-panel-component-material-progress-update';

    case PERMISSION_CREATE = 'permission-create';
    case PERMISSION_READ = 'permission-read';
    case PERMISSION_UPDATE = 'permission-update';
    case PERMISSION_DELETE = 'permission-delete';

    case CARRIAGE_PRESET_CREATE = 'carriage-preset-create';
    case CARRIAGE_PRESET_READ = 'carriage-preset-read';
    case CARRIAGE_PRESET_UPDATE = 'carriage-preset-update';
    case CARRIAGE_PRESET_DELETE = 'carriage-preset-delete';

    // PRESET RELATED - NOT CHANGING
    case PRESET_TRAINSET_CREATE = 'preset-trainset-create';
    case PRESET_TRAINSET_READ = 'preset-trainset-read';
    case PRESET_TRAINSET_UPDATE = 'preset-trainset-update';
    case PRESET_TRAINSET_DELETE = 'preset-trainset-delete';

    case PANEL_CREATE = 'panel-create';
    case PANEL_READ = 'panel-read';
    case PANEL_UPDATE = 'panel-update';
    case PANEL_DELETE = 'panel-delete';
    case PANEL_IMPORT = 'panel-import';

    case TRAINSET_CREATE = 'trainset-create';
    case TRAINSET_READ = 'trainset-read';
    case TRAINSET_UPDATE = 'trainset-update';
    case TRAINSET_DELETE = 'trainset-delete';

    // KPM MECHANIC / ELECTRIC RELATED
    case TRAINSET_ATTACHMENT_CREATE = 'trainset-attachment-create';
    case TRAINSET_ATTACHMENT_READ = 'trainset-attachment-read';
    case TRAINSET_ATTACHMENT_UPDATE = 'trainset-attachment-update';
    case TRAINSET_ATTACHMENT_DELETE = 'trainset-attachment-delete';
    case TRAINSET_ATTACHMENT_DOWNLOAD = 'trainset-attachment-download'; // download attachment in preview attachment
    case TRAINSET_ATTACHMENT_IMPORT = 'trainset-attachment-import'; // import material in preview attachment

    case DETAIL_WORKER_TRAINSET_CREATE = 'detail-worker-trainset-create';
    case DETAIL_WORKER_TRAINSET_READ = 'detail-worker-trainset-read';
    case DETAIL_WORKER_TRAINSET_UPDATE = 'detail-worker-trainset-update';
    case DETAIL_WORKER_TRAINSET_DELETE = 'detail-worker-trainset-delete';

    // KPM ASSEMBLY RELATED
    case PANEL_ATTACHMENT_CREATE = 'panel-attachment-create';
    case PANEL_ATTACHMENT_READ = 'panel-attachment-read';
    case PANEL_ATTACHMENT_UPDATE = 'panel-attachment-update';
    case PANEL_ATTACHMENT_DELETE = 'panel-attachment-delete';
    case PANEL_ATTACHMENT_DOWNLOAD = 'panel-attachment-download'; // download attachment in preview attachment
    case PANEL_ATTACHMENT_IMPORT = 'panel-attachment-import'; // import material in preview attachment

    case SERIAL_PANEL_CREATE = 'serial-panel-create';
    case SERIAL_PANEL_READ = 'serial-panel-read';
    case SERIAL_PANEL_UPDATE = 'serial-panel-update';
    case SERIAL_PANEL_DELETE = 'serial-panel-delete';

    case DETAIL_WORKER_PANEL_CREATE = 'detail-worker-panel-create';
    case DETAIL_WORKER_PANEL_READ = 'detail-worker-panel-read';
    case DETAIL_WORKER_PANEL_UPDATE = 'detail-worker-panel-update';
    case DETAIL_WORKER_PANEL_DELETE = 'detail-worker-panel-delete';

    case CARRIAGE_PANEL_CREATE = 'carriage-panel-create';
    case CARRIAGE_PANEL_READ = 'carriage-panel-read';
    case CARRIAGE_PANEL_UPDATE = 'carriage-panel-update';
    case CARRIAGE_PANEL_DELETE = 'carriage-panel-delete';

    case RAW_MATERIAL_CREATE = 'raw-material-create';
    case RAW_MATERIAL_READ = 'raw-material-read';
    case RAW_MATERIAL_UPDATE = 'raw-material-update';
    case RAW_MATERIAL_DELETE = 'raw-material-delete';
    case RAW_MATERIAL_IMPORT = 'raw-material-import';

    case CARRIAGE_CREATE = 'carriage-create';
    case CARRIAGE_READ = 'carriage-read';
    case CARRIAGE_UPDATE = 'carriage-update';
    case CARRIAGE_DELETE = 'carriage-delete';
    case CARRIAGE_IMPORT = 'carriage-import';

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
    case STEP_IMPORT = 'step-import';

    case COMPONENT_CREATE = 'component-create';
    case COMPONENT_READ = 'component-read';
    case COMPONENT_UPDATE = 'component-update';
    case COMPONENT_DELETE = 'component-delete';
    case COMPONENT_IMPORT = 'component-import';

    case FEEDBACK_CREATE = 'feedback-create';
    case FEEDBACK_READ = 'feedback-read';
    case FEEDBACK_READ_ALL = 'feedback-read-all';
    case FEEDBACK_UPDATE = 'feedback-update';
    case FEEDBACK_DELETE = 'feedback-delete';

    case RETURNED_PRODUCT_CREATE = 'returned-product-create';
    case RETURNED_PRODUCT_READ = 'returned-product-read';
    case RETURNED_PRODUCT_UPDATE = 'returned-product-update';
    case RETURNED_PRODUCT_DELETE = 'returned-product-delete';
    case RETURNED_PRODUCT_IMPORT = 'returned-product-import';
    case RETURNED_PRODUCT_REQUEST_READ = 'returned-product-request-read';

    case RETURNED_PRODUCT_NOTE_CREATE = 'returned-product-note-create';
    case RETURNED_PRODUCT_NOTE_READ = 'returned-product-note-read';
    case RETURNED_PRODUCT_NOTE_UPDATE = 'returned-product-note-update';
    case RETURNED_PRODUCT_NOTE_DELETE = 'returned-product-note-delete';

    case PRODUCT_PROBLEM_CREATE = 'product-problem-create';
    case PRODUCT_PROBLEM_READ = 'product-problem-read';
    case PRODUCT_PROBLEM_UPDATE = 'product-problem-update';
    case PRODUCT_PROBLEM_DELETE = 'product-problem-delete';
    case PRODUCT_PROBLEM_IMPORT = 'product-problem-import';

    case PRODUCT_PROBLEM_NOTE_CREATE = 'product-problem-note-create';
    case PRODUCT_PROBLEM_NOTE_READ = 'product-problem-note-read';
    case PRODUCT_PROBLEM_NOTE_UPDATE = 'product-problem-note-update';
    case PRODUCT_PROBLEM_NOTE_DELETE = 'product-problem-note-delete';

    case REPLACEMENT_STOCK_CREATE = 'replacement-stock-create';
    case REPLACEMENT_STOCK_READ = 'replacement-stock-read';
    case REPLACEMENT_STOCK_UPDATE = 'replacement-stock-update';
    case REPLACEMENT_STOCK_DELETE = 'replacement-stock-delete';
    case REPLACEMENT_STOCK_IMPORT = 'replacement-stock-import';

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
