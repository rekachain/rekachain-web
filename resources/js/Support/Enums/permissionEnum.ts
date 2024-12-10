export enum PERMISSION_ENUM {
    DASHBOARD_COMMISSION_READ = 'dashboard-commission-read',

    DIVISION_CREATE = 'division-create',
    DIVISION_READ = 'division-read',
    DIVISION_UPDATE = 'division-update',
    DIVISION_DELETE = 'division-delete',

    WORKSHOP_CREATE = 'workshop-create',
    WORKSHOP_READ = 'workshop-read',
    WORKSHOP_UPDATE = 'workshop-update',
    WORKSHOP_DELETE = 'workshop-delete',

    WORKSTATION_CREATE = 'workstation-create',
    WORKSTATION_READ = 'workstation-read',
    WORKSTATION_UPDATE = 'workstation-update',
    WORKSTATION_DELETE = 'workstation-delete',

    ROLE_CREATE = 'role-create',
    ROLE_READ = 'role-read',
    ROLE_UPDATE = 'role-update',
    ROLE_DELETE = 'role-delete',

    USER_CREATE = 'user-create',
    USER_READ = 'user-read',
    USER_UPDATE = 'user-update',
    USER_DELETE = 'user-delete',

    PROJECT_CREATE = 'project-create',
    PROJECT_READ = 'project-read',
    PROJECT_UPDATE = 'project-update',
    PROJECT_DELETE = 'project-delete',
    PROJECT_IMPORT = 'project-import',
    PROJECT_COMPONENT_READ = 'project-component-read', //open component view by project
    PROJECT_COMPONENT_IMPORT = 'project-component-import', //import component from component view by project
    PROJECT_PANEL_READ = 'project-panel-read', //open panel view by project
    PROJECT_PANEL_IMPORT = 'project-panel-import', //import panel from panel view by project
    PROJECT_CARRIAGE_READ = 'project-carriage-read', //open carriage view by project
    PROJECT_CARRIAGE_COMPONENT_READ = 'project-carriage-component-read', //open component view by carriage by project
    PROJECT_CARRIAGE_COMPONENT_IMPORT = 'project-carriage-component-import', //import component by carriage by project
    PROJECT_CARRIAGE_PANEL_READ = 'project-carriage-panel-read', //open panel view by carriage by project
    PROJECT_CARRIAGE_PANEL_IMPORT = 'project-carriage-panel-import', //import  panel by carriage by project
    PROJECT_TRAINSET_CREATE = 'project-trainset-create', //add trainset in trainset by project view
    PROJECT_TRAINSET_READ = 'project-trainset-read', //open trainset view by project
    PROJECT_TRAINSET_UPDATE = 'project-trainset-update', //toggle edit name for trainset by project view
    PROJECT_TRAINSET_DELETE = 'project-trainset-delete', //delete trainset by project
    PROJECT_TRAINSET_COMPONENT_READ = 'project-trainset-component-read', //open component by trainset by project view
    PROJECT_TRAINSET_COMPONENT_IMPORT = 'project-trainset-component-import', //import component by trainset by project
    PROJECT_TRAINSET_PANEL_READ = 'project-trainset-panel-read', //open panel by trainset by project view
    PROJECT_TRAINSET_PANEL_IMPORT = 'project-trainset-panel-import', //import panel by trainset by project
    PROJECT_TRAINSET_CARRIAGE_TRAINSET_CREATE = 'project-trainset-carriage-trainset-create', //add carriage-trainset
    PROJECT_TRAINSET_CARRIAGE_TRAINSET_READ = 'project-trainset-carriage-trainset-read', //open carriage-trainset by trainset by project view
    PROJECT_TRAINSET_CARRIAGE_TRAINSET_UPDATE = 'project-trainset-carriage-trainset-update', //toggle edit carriage qty
    PROJECT_TRAINSET_CARRIAGE_TRAINSET_DELETE = 'project-trainset-carriage-trainset-delete', //delete carriage-trainset by trainset by project
    PROJECT_TRAINSET_CARRIAGE_TRAINSET_SERIAL_EXPORT = 'project-trainset-carriage-trainset-serial-export', //export serial carriage-trainset
    PROJECT_TRAINSET_CARRIAGE_TRAINSET_PRESET_CREATE = 'project-trainset-carriage-trainset-preset-create', //create carriage-trainset preset
    PROJECT_TRAINSET_CARRIAGE_TRAINSET_PRESET_CHANGE = 'project-trainset-carriage-trainset-preset-change', //change carriage-trainset preset
    PROJECT_TRAINSET_CARRIAGE_TRAINSET_ATTACHMENT_READ = 'project-trainset-carriage-trainset-attachment-read', //open carriage-trainset attachment detail
    PROJECT_TRAINSET_CARRIAGE_TRAINSET_ATTACHMENT_GENERATE = 'project-trainset-carriage-trainset-attachment-generate', //generate carriage-trainset attachment
    PROJECT_TRAINSET_CARRIAGE_TRAINSET_ATTACHMENT_PROGRESS_READ = 'project-trainset-carriage-trainset-attachment-progress-read', //open carriage-trainset attachment progress
    PROJECT_TRAINSET_CARRIAGE_TRAINSET_PANEL_CREATE = 'project-trainset-carriage-trainset-panel-create', //add panel to panel by carriage-trainet by trainset by project
    PROJECT_TRAINSET_CARRIAGE_TRAINSET_PANEL_READ = 'project-trainset-carriage-trainset-panel-read', //open panel by carriage-trainset by trainset by project view
    PROJECT_TRAINSET_CARRIAGE_TRAINSET_PANEL_UPDATE = 'project-trainset-carriage-trainset-panel-update', //toggle edit panel qty
    PROJECT_TRAINSET_CARRIAGE_TRAINSET_PANEL_DELETE = 'project-trainset-carriage-trainset-panel-delete', //delete panel in panel by carriage-trainset by trainset by project
    PROJECT_TRAINSET_CARRIAGE_TRAINSET_PANEL_PROGRESS_UPDATE = 'project-trainset-carriage-trainset-panel-progress-update', //update progress for panel
    PROJECT_TRAINSET_CARRIAGE_TRAINSET_PANEL_MATERIAL_CREATE = 'project-trainset-carriage-trainset-panel-material-create', //add raw materail for material by panel view
    PROJECT_TRAINSET_CARRIAGE_TRAINSET_PANEL_MATERIAL_READ = 'project-trainset-carriage-trainset-panel-material-read', //open materials for panel view
    PROJECT_TRAINSET_CARRIAGE_TRAINSET_PANEL_MATERIAL_UPDATE = 'project-trainset-carriage-trainset-panel-material-update', //toggle edit material qty
    PROJECT_TRAINSET_CARRIAGE_TRAINSET_PANEL_MATERIAL_DELETE = 'project-trainset-carriage-trainset-panel-material-delete', //delete material in material by panel view
    PROJECT_TRAINSET_CARRIAGE_TRAINSET_PANEL_COMPONENT_CREATE = 'project-trainset-carriage-trainset-panel-component-create', //add component to panel
    PROJECT_TRAINSET_CARRIAGE_TRAINSET_PANEL_COMPONENT_READ = 'project-trainset-carriage-trainset-panel-component-read', //open components for panel view
    PROJECT_TRAINSET_CARRIAGE_TRAINSET_PANEL_COMPONENT_UPDATE = 'project-trainset-carriage-trainset-panel-component-update', //toggle edit component qty
    PROJECT_TRAINSET_CARRIAGE_TRAINSET_PANEL_COMPONENT_DELETE = 'project-trainset-carriage-trainset-panel-component-delete', //delete component in component by panel view
    PROJECT_TRAINSET_CARRIAGE_TRAINSET_PANEL_COMPONENT_PROGRESS_UPDATE = 'project-trainset-carriage-trainset-panel-component-progress-update', //update progress for component
    PROJECT_TRAINSET_CARRIAGE_TRAINSET_PANEL_COMPONENT_MATERIAL_CREATE = 'project-trainset-carriage-trainset-panel-component-material-create', //add raw material for material by component view
    PROJECT_TRAINSET_CARRIAGE_TRAINSET_PANEL_COMPONENT_MATERIAL_READ = 'project-trainset-carriage-trainset-panel-component-material-read', //open materials for component view
    PROJECT_TRAINSET_CARRIAGE_TRAINSET_PANEL_COMPONENT_MATERIAL_UPDATE = 'project-trainset-carriage-trainset-panel-component-material-update', //toggle edit material qty
    PROJECT_TRAINSET_CARRIAGE_TRAINSET_PANEL_COMPONENT_MATERIAL_DELETE = 'project-trainset-carriage-trainset-panel-component-material-delete', //delete material in material by component view

    TRAINSET_ATTACHMENT_DOWNLOAD = 'trainset-attachment-download', //download attachment in preview attachment
    TRAINSET_ATTACHMENT_IMPORT = 'trainset-attachment-import', //import material in preview attachment

    PANEL_ATTACHMENT_DOWNLOAD = 'panel-attachment-download', //download attachment in preview attachment
    PANEL_ATTACHMENT_IMPORT = 'panel-attachment-import', //import material in preview attachment

    PERMISSION_CREATE = 'permission-create',
    PERMISSION_READ = 'permission-read',
    PERMISSION_UPDATE = 'permission-update',
    PERMISSION_DELETE = 'permission-delete',

    CARRIAGE_PRESET_CREATE = 'carriage-preset-create',
    CARRIAGE_PRESET_READ = 'carriage-preset-read',
    CARRIAGE_PRESET_UPDATE = 'carriage-preset-update',
    CARRIAGE_PRESET_DELETE = 'carriage-preset-delete',

    PRESET_TRAINSET_CREATE = 'preset-trainset-create',
    PRESET_TRAINSET_READ = 'preset-trainset-read',
    PRESET_TRAINSET_UPDATE = 'preset-trainset-update',
    PRESET_TRAINSET_DELETE = 'preset-trainset-delete',

    PANEL_CREATE = 'panel-create',
    PANEL_READ = 'panel-read',
    PANEL_UPDATE = 'panel-update',
    PANEL_DELETE = 'panel-delete',
    PANEL_IMPORT = 'panel-import',

    RAW_MATERIAL_CREATE = 'raw-material-create',
    RAW_MATERIAL_READ = 'raw-material-read',
    RAW_MATERIAL_UPDATE = 'raw-material-update',
    RAW_MATERIAL_DELETE = 'raw-material-delete',
    RAW_MATERIAL_IMPORT = 'raw-material-import',

    CARRIAGE_CREATE = 'carriage-create',
    CARRIAGE_READ = 'carriage-read',
    CARRIAGE_UPDATE = 'carriage-update',
    CARRIAGE_DELETE = 'carriage-delete',
    CARRIAGE_IMPORT = 'carriage-import',

    WORK_DAY_CREATE = 'work-day-create',
    WORK_DAY_READ = 'work-day-read',
    WORK_DAY_UPDATE = 'work-day-update',
    WORK_DAY_DELETE = 'work-day-delete',

    WORK_DAY_TIME_CREATE = 'work-day-time-create',
    WORK_DAY_TIME_READ = 'work-day-time-read',
    WORK_DAY_TIME_UPDATE = 'work-day-time-update',
    WORK_DAY_TIME_DELETE = 'work-day-time-delete',

    STEP_CREATE = 'step-create',
    STEP_READ = 'step-read',
    STEP_UPDATE = 'step-update',
    STEP_DELETE = 'step-delete',
    STEP_IMPORT = 'step-import',

    COMPONENT_CREATE = 'component-create',
    COMPONENT_READ = 'component-read',
    COMPONENT_UPDATE = 'component-update',
    COMPONENT_DELETE = 'component-delete',
    COMPONENT_IMPORT = 'component-import',

    FEEDBACK_CREATE = 'feedback-create',
    FEEDBACK_READ = 'feedback-read',
    FEEDBACK_READ_ALL = 'feedback-read-all',
    FEEDBACK_UPDATE = 'feedback-update',
    FEEDBACK_DELETE = 'feedback-delete',
}
