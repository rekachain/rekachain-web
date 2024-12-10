<?php

/**
 * Current structure example:
 * following directory structure
 *
 * pages
 *   - component name
 *     - fields (for form fields)
 *     - messages (for flash messages)
 *     - buttons (for button names)
 *     - actions (for action names)
 *     - dialogs (for dialog element)
 *       - messages (for messages in dialog)
 *       - buttons (for button names in dialog)
 *       - actions (for action names in dialog)
 *   - components (for page components)
 *   - partials (for page partials)
 */

return [
    'login' => [
        'title' => 'Welcome Back!',
        'fields' => [
            'identifier' => 'Email or Employee ID',
            'password' => 'Password',
            'remember' => 'Remember Me',
        ],
        'buttons' => [
            'forgot_password' => 'Forgot Your Password?',
            'sign_in' => 'Sign In',
        ],
    ],
    'dashboard' => [
        'index' => [
            'title' => 'Dashboard',
            'welcome' => 'Welcome to the Dashboard',
            'project' => 'Project',
            'all_project' => 'All Project',
            'all_trainset_status' => 'Status for All Trainset',
            'select_project' => 'Choose Project',
            'progress_workshops' => 'Progress for each Workshop',
            'progress_panels' => 'Progress for each Panel',
            'panels_title' => 'Progress Panel in Assembly WS',
            'all_workstations' => 'Progress for All Workstation',
            'workstations_sub' => 'Progress from All Workstation',
            'project_not_found' => 'Project Not Found',
            'trainset_not_found' => 'Trainset Not Found',
            'find_project' => 'Find Project...',
            'find_trainset' => 'Find Trainset...',
            'select_trainset' => 'Choose Trainset...',
            'panel_trainset' => 'All Panel Trainset',
            'panel_trainset_sub' => 'All Panel at',
            'panel_progress_trainset' => 'Panel Trainset Progresses ',
            'panel_progress_trainset_sub' => 'Panel Trainset Progresses at ',
        ],
    ],
    'work_day' => [
        'index' => [
            'title' => 'Work Days',
            'buttons' => [
                'create' => 'Create Work Day',
            ],
        ],
        'create' => [
            'title' => 'Create Work Day',
            'fields' => [
                'name' => 'Name',
                'start_date' => 'Start Date',
                'break_time' => 'Break Time',
                'end_date' => 'End Date',
            ],
            'buttons' => [
                'submit' => 'Create Work Day',
            ],
            'messages' => [
                'created' => 'Work Day created successfully!',
            ],
        ],
        'edit' => [
            'title' => 'Edit Work Day: :name',
            'fields' => [
                'name' => 'Name',
                'start_date' => 'Start Date',
                'break_time' => 'Break Time',
                'end_date' => 'End Date',
            ],
            'buttons' => [
                'submit' => 'Update Work Day',
            ],
            'messages' => [
                'updated' => 'Work Day updated successfully!',
            ],
        ],
        'partials' => [
            'work_days' => [
                'messages' => [
                    'deleted' => 'Work Day deleted successfully!',
                ],
            ],
            'partials' => [
                'work_day_table' => [
                    'headers' => [
                        'name' => 'Name',
                        'start_date' => 'Start Date',
                        'break_time' => 'Break Time',
                        'end_date' => 'End Date',
                    ],
                ],
                'work_day_card' => [
                    'headers' => [
                        'name' => 'Name',
                        'start_date' => 'Start Date',
                        'break_time' => 'Break Time',
                        'end_date' => 'End Date',
                    ],
                ],
            ],
        ],
    ],
    'staff_management' => [
        'title' => 'Staff Management',
    ],
    'division' => [
        'index' => [
            'title' => 'Divisions',
            'buttons' => [
                'create' => 'Create Division',
            ],
        ],
        'create' => [
            'title' => 'Create Division',
            'fields' => [
                'name' => 'Name',
            ],
            'buttons' => [
                'submit' => 'Create Division',
            ],
            'messages' => [
                'created' => 'Division created successfully!',
            ],
        ],
        'edit' => [
            'title' => 'Edit Division: :name',
            'fields' => [
                'name' => 'Name',
            ],
            'buttons' => [
                'submit' => 'Update Division',
            ],
            'messages' => [
                'updated' => 'Division updated successfully!',
            ],
        ],
        'partials' => [
            'divisions' => [
                'messages' => [
                    'deleted' => 'Division deleted successfully!',
                ],
            ],
            'partials' => [
                'division_table' => [
                    'headers' => [
                        'name' => 'Name',
                    ],
                ],
                'division_card' => [
                    'headers' => [
                        'name' => 'Name',
                    ],
                ],
            ],
        ],
    ],
    'workshop' => [
        'index' => [
            'title' => 'Workshops',
            'buttons' => [
                'create' => 'Create Workshop',
            ],
        ],
        'create' => [
            'title' => 'Create Workshop',
            'fields' => [
                'name' => 'Name',
                'address' => 'Address',
            ],
            'buttons' => [
                'submit' => 'Create Workshop',
            ],
            'messages' => [
                'created' => 'Workshop created successfully!',
            ],
        ],
        'edit' => [
            'title' => 'Edit Workshop: :name',
            'fields' => [
                'name' => 'Name',
                'address' => 'Address',
            ],
            'buttons' => [
                'submit' => 'Update Workshop',
            ],
            'messages' => [
                'updated' => 'Workshop updated successfully!',
            ],
        ],
        'partials' => [
            'workshops' => [
                'messages' => [
                    'deleted' => 'Workshop deleted successfully!',
                ],
            ],
            'partials' => [
                'workshop_table' => [
                    'headers' => [
                        'name' => 'Name',
                        'address' => 'Address',
                    ],
                ],
                'workshop_card' => [
                    'headers' => [
                        'name' => 'Name',
                        'address' => 'Address : :address',
                    ],
                ],
            ],
        ],
    ],
    'workstation' => [
        'index' => [
            'title' => 'Workstation',
            'buttons' => [
                'create' => 'Create Workstation',
            ],
        ],
        'create' => [
            'title' => 'Create Workstation',
            'fields' => [
                'name' => 'Name',
                'location' => 'Location',
                'workshop' => 'Workshop',
                'division' => 'Division',
            ],
            'buttons' => [
                'submit' => 'Create Workstation',
            ],
            'messages' => [
                'created' => 'Workstation created successfully!',
            ],
        ],
        'edit' => [
            'title' => 'Edit Workstation: :name',
            'fields' => [
                'name' => 'Name',
                'location' => 'Location',
                'workshop' => 'Workshop',
                'division' => 'Division',
            ],
            'buttons' => [
                'submit' => 'Update Workstation',
            ],
            'messages' => [
                'updated' => 'Workstation updated successfully!',
            ],
        ],
        'partials' => [
            'workstations' => [
                'messages' => [
                    'deleted' => 'Workstation deleted successfully!',
                ],
            ],
            'partials' => [
                'workstation_table' => [
                    'headers' => [
                        'name' => 'Name',
                        'location' => 'Location',
                        'workshop' => 'Workshop',
                        'division' => 'Division',
                    ],
                ],
                'workstation_card' => [
                    'headers' => [
                        'name' => 'Name',
                        'location' => 'Location: :location',
                        'workshop' => 'Workshop: :workshop',
                        'division' => 'Division: :division',
                    ],
                ],
            ],
        ],
    ],
    'user' => [
        'index' => [
            'title' => 'Staff',
            'buttons' => [
                'create' => 'Create Staff',
            ],
        ],
        'create' => [
            'title' => 'Create Staff',
            'fields' => [
                'nip' => 'Employee ID',
                'name' => 'Name',
                'email' => 'Email',
                'phone_number' => 'Phone Number',
                'password' => 'Password',
                'password_confirmation' => 'Confirm Password',
                'role' => 'Role',
                'workstation' => 'Workstation',
                'workstation_placeholder' => 'Select Workstation',
                'step' => 'Step',
                'step_placeholder' => 'Select Step',
                'avatar' => 'Avatar',
                'avatar_filepond_placeholder' => 'Drop files here or click to upload',
            ],
            'buttons' => [
                'submit' => 'Create Staff',
            ],
            'messages' => [
                'created' => 'Staff created successfully!',
            ],
        ],
        'edit' => [
            'title' => 'Edit Staff: :name',
            'fields' => [
                'nip' => 'Employee ID',
                'name' => 'Name',
                'email' => 'Email',
                'phone_number' => 'Phone Number',
                'password' => 'Password',
                'password_confirmation' => 'Confirm Password',
                'role' => 'Role',
                'workstation' => 'Workstation',
                'workstation_placeholder' => 'Select Workstation',
                'step' => 'Step',
                'step_placeholder' => 'Select Step',
                'avatar' => 'Avatar',
                'avatar_filepond_placeholder' => 'Drop files here or click to upload',
            ],
            'buttons' => [
                'submit' => 'Update Staff',
            ],
            'messages' => [
                'updated' => 'Staff updated successfully!',
            ],
        ],
        'partials' => [
            'users' => [
                'messages' => [
                    'deleted' => 'Staff deleted successfully!',
                ],
            ],
            'partials' => [
                'filters' => [
                    'worker_status' => [
                        'title' => 'Worker Status',
                        'fields' => [
                            'all' => 'All',
                            'active' => 'Active',
                            'inactive' => 'Inactive',
                        ],
                    ],
                ],
                'user_table' => [
                    'headers' => [
                        'nip' => 'Employee ID',
                        'name' => 'Name',
                        'email' => 'Email',
                        'phone_number' => 'Phone Number',
                        'role' => 'Role',
                        'workstation' => 'Workstation',
                        'step' => 'Step',
                        'avatar' => 'Avatar',
                    ],
                ],
                'user_card' => [
                    'headers' => [
                        'nip' => 'Employee ID: :nip',
                        'name' => 'Name: :name',
                        'email' => 'Email: :email',
                        'phone_number' => 'Phone Number: :phone_number',
                        'role' => 'Role: :role',
                        'workstation' => 'Workstation: :workstation',
                        'step' => 'Step: :step',
                        'avatar' => 'Avatar',
                    ],
                ],
            ],
        ],
    ],
    'access_control' => [
        'title' => 'Access Control',
    ],
    'permission' => [ // CRUD not implemented
        'index' => [
            'title' => 'Permission',
            'buttons' => [
                'create' => 'Create Permission',
            ],
        ],
        'create' => [
            'title' => 'Create Permission',
            'fields' => [
                'name' => 'Name',
            ],
            'buttons' => [
                'submit' => 'Create Permission',
            ],
            'messages' => [
                'created' => 'Permission created successfully!',
            ],
        ],
        'edit' => [
            'title' => 'Edit Permission: :name',
            'fields' => [
                'name' => 'Name',
            ],
            'buttons' => [
                'submit' => 'Update Permission',
            ],
            'messages' => [
                'updated' => 'Permission updated successfully!',
            ],
        ],
        'partials' => [
            'permissions' => [
                'messages' => [
                    'deleted' => 'Permission deleted successfully!',
                ],
            ],
            'partials' => [
                'permission_table' => [
                    'headers' => [
                        'group' => 'Group',
                        'name' => 'Name',
                    ],
                ],
                'permission_card' => [
                    'headers' => [
                        'group' => 'Group',
                        'name' => 'Name',
                    ],
                ],
            ],
        ],
    ],
    'role' => [ // Update not implemented
        'index' => [
            'title' => 'Role',
            'buttons' => [
                'create' => 'Create Role',
            ],
        ],
        'create' => [
            'title' => 'Create Role',
            'fields' => [
                'name' => 'Name',
                'division' => 'Division',
                'division_placeholder' => 'Select Division',
                'level' => 'Level',
                'permissions' => 'Permissions',
            ],
            'buttons' => [
                'submit' => 'Create Role',
            ],
            'messages' => [
                'created' => 'Role created successfully!',
            ],
        ],
        'edit' => [
            'title' => 'Edit Role: :name',
            'fields' => [
                'name' => 'Name',
                'division' => 'Division',
                'division_placeholder' => 'Select Division',
                'level' => 'Level',
                'permissions' => 'Permissions',
            ],
            'buttons' => [
                'submit' => 'Update Role',
            ],
            'messages' => [
                'updated' => 'Role updated successfully!',
            ],
        ],
        'partials' => [
            'roles' => [
                'messages' => [
                    'deleted' => 'Role deleted successfully!',
                ],
            ],
            'partials' => [
                'role_table' => [
                    'headers' => [
                        'name' => 'Name',
                        'division' => 'Division',
                        'level' => 'Level',
                        'users_count' => 'User Count',
                        'permissions_count' => 'Permission Count',
                    ],
                ],
                'role_card' => [
                    'headers' => [
                        'name' => 'Name: :name',
                        'division' => 'Division: :division',
                        'level' => 'Level: :level',
                        'users_count' => 'User Count: :users_count',
                        'permissions_count' => 'Permission Count: :permissions_count',
                    ],
                ],
            ],
        ],
    ],
    'step' => [
        'index' => [
            'title' => 'Step',
            'buttons' => [
                'create' => 'Create Step',
            ],
        ],
        'create' => [
            'title' => 'Create Step',
            'fields' => [
                'progress' => 'Progress',
                'progress_placeholder' => 'Select Progress',
                'process' => 'Process',
                'name' => 'Name',
                'estimated_manufacturing_time' => 'Estimated Manufacturing Time (Minutes)',
            ],
            'buttons' => [
                'submit' => 'Create Step',
            ],
            'messages' => [
                'created' => 'Step created successfully!',
            ],
        ],
        'edit' => [
            'title' => 'Edit Step: :name',
            'fields' => [
                'progress' => 'Progress',
                'progress_placeholder' => 'Select Progress',
                'process' => 'Process',
                'name' => 'Name',
                'estimated_manufacturing_time' => 'Estimated Manufacturing Time (Minutes)',
            ],
            'buttons' => [
                'submit' => 'Update Step',
            ],
            'messages' => [
                'updated' => 'Step updated successfully!',
            ],
        ],
        'partials' => [
            'steps' => [
                'messages' => [
                    'deleted' => 'Step deleted successfully!',
                ],
            ],
            'partials' => [
                'step_table' => [
                    'headers' => [
                        'name' => 'Name',
                        'process' => 'Process',
                        'estimated_manufacturing_time' => 'Estimated Manufacturing Time (Minutes)',
                    ],
                ],
                'step_card' => [
                    'headers' => [
                        'name' => 'Name: :name',
                        'process' => 'Process: :process',
                        'estimated_manufacturing_time' => 'Estimated Manufacturing Time: :estimated_manufacturing_time Minutes',
                    ],
                ],
            ],
        ],
    ],
    'raw_material' => [
        'index' => [
            'title' => 'Raw Material',
            'buttons' => [
                'create' => 'Create Raw Material',
            ],
        ],
        'create' => [
            'title' => 'Create Raw Material',
            'fields' => [
                'material_code' => 'Material Code',
                'description' => 'Description',
                'specs' => 'Specs',
                'unit' => 'Unit',
            ],
            'buttons' => [
                'submit' => 'Create Raw Material',
            ],
            'messages' => [
                'created' => 'Raw Material created successfully!',
            ],
        ],
        'edit' => [
            'title' => 'Edit Raw Material: :name',
            'fields' => [
                'material_code' => 'Material Code',
                'description' => 'Description',
                'specs' => 'Specs',
                'unit' => 'Unit',
            ],
            'buttons' => [
                'submit' => 'Update Raw Material',
            ],
            'messages' => [
                'updated' => 'Raw Material updated successfully!',
            ],
        ],
        'partials' => [
            'raw_materials' => [
                'messages' => [
                    'deleted' => 'Raw Material deleted successfully!',
                ],
            ],
            'import' => [
                'buttons' => [
                    'import' => 'Import Raw Material',
                ],
                'messages' => [
                    'imported' => 'Raw Material imported successfully!',
                ],
                'dialogs' => [
                    'title' => 'Import Raw Material',
                    'description' => 'Import Raw Material from Excel file',
                    'fields' => [
                        'download_template' => 'Download Template',
                        'file' => 'File',
                    ],
                    'buttons' => [
                        'import' => 'Import Raw Material',
                        'download_template' => 'Download',
                        'submit' => 'Import Raw Material',
                        'processing' => 'Processing...',
                    ],
                ],
            ],
            'partials' => [
                'raw_material_table' => [
                    'headers' => [
                        'material_code' => 'Material Code',
                        'description' => 'Description',
                        'specs' => 'Specs',
                        'unit' => 'Unit',
                    ],
                ],
                'raw_material_card' => [
                    'headers' => [
                        'material_code' => 'Material Code: :material_code',
                        'description' => 'Description: :description',
                        'specs' => 'Specs: :specs',
                        'unit' => 'Unit: :unit',
                    ],
                ],
            ],
        ],
    ],
    'component' => [
        'index' => [
            'title' => 'Component',
            'buttons' => [
                'create' => 'Create Component',
            ],
        ],
        'create' => [
            'title' => 'Create Component',
            'fields' => [
                'name' => 'Name',
                'description' => 'Description',
                'progress' => 'Progress',
                'progress_placeholder' => 'Select Progress',
            ],
            'buttons' => [
                'submit' => 'Create Component',
            ],
            'messages' => [
                'created' => 'Component created successfully!',
            ],
        ],
        'edit' => [
            'title' => 'Edit Component: :name',
            'fields' => [
                'name' => 'Name',
                'description' => 'Description',
                'progress' => 'Progress',
                'progress_placeholder' => 'Select Progress',
            ],
            'buttons' => [
                'submit' => 'Update Component',
            ],
            'messages' => [
                'updated' => 'Component updated successfully!',
            ],
        ],
        'partials' => [
            'components' => [
                'messages' => [
                    'deleted' => 'Component deleted successfully!',
                ],
            ],
            'partials' => [
                'component_table' => [
                    'headers' => [
                        'name' => 'Name',
                        'description' => 'Description',
                        'progress' => 'Progress',
                    ],
                ],
                'component_card' => [
                    'headers' => [
                        'name' => 'Name: :name',
                        'description' => 'Description: :description',
                        'progress' => 'Progress: :progress',
                    ],
                ],
            ],
        ],
    ],
    'panel' => [
        'index' => [
            'title' => 'Panel',
            'buttons' => [
                'create' => 'Create Panel',
            ],
        ],
        'create' => [
            'title' => 'Create Panel',
            'fields' => [
                'name' => 'Name',
                'progress' => 'Progress',
                'progress_placeholder' => 'Select Progress',
                'description' => 'Description',
            ],
            'buttons' => [
                'submit' => 'Create Panel',
            ],
            'messages' => [
                'created' => 'Panel created successfully!',
            ],
        ],
        'edit' => [
            'title' => 'Edit Panel: :name',
            'fields' => [
                'name' => 'Name',
                'progress' => 'Progress',
                'progress_placeholder' => 'Select Progress',
                'description' => 'Description',
            ],
            'buttons' => [
                'submit' => 'Update Panel',
            ],
            'messages' => [
                'updated' => 'Panel updated successfully!',
            ],
        ],
        'partials' => [
            'panels' => [
                'messages' => [
                    'deleted' => 'Panel deleted successfully!',
                ],
            ],
            'import' => [
                'title' => 'Import Panel',
                'description' => 'Import Panel from Excel file',
                'messages' => [
                    'imported' => 'Panel imported successfully!',
                ],
                'buttons' => [
                    'import' => 'Import Panel',
                ],
                'dialogs' => [
                    'fields' => [
                        'download_template' => 'Download Template',
                        'file' => 'File',
                    ],
                    'buttons' => [
                        'import' => 'Import Panel',
                        'download_template' => 'Download',
                        'submit' => 'Import Panel',
                        'processing' => 'Processing...',
                    ],
                ],
            ],
            'partials' => [
                'panel_table' => [
                    'headers' => [
                        'name' => 'Name',
                        'description' => 'Description',
                        'progress' => 'Progress',
                    ],
                ],
                'panel_card' => [
                    'headers' => [
                        'name' => 'Name: :name',
                        'description' => 'Description: :description',
                        'progress' => 'Progress: :progress',
                    ],
                ],
            ],
        ],
    ],
    'project' => [
        'index' => [
            'title' => 'Projects',
            'buttons' => [
                'create' => 'Create Project',
            ],
        ],
        'create' => [
            'title' => 'Create Project',
            'fields' => [
                'name' => 'Name',
                'description' => 'Description',
                'trainset_needed' => 'Trainset Needed',
                'initial_date' => 'Initial Date',
                'estimated_start_date' => 'Estimated Start Date (OPTIONAL)',
                'estimated_end_date' => 'Estimated End Date (OPTIONAL)',
                'buyer_selection' => 'Customer (OPTIONAL)',
            ],
            'buttons' => [
                'submit' => 'Create Project',
            ],
            'messages' => [
                'created' => 'Project created successfully!',
            ],
        ],
        'edit' => [
            'title' => 'Edit Project: :name',
            'fields' => [
                'name' => 'Name',
                'trainset_needed' => 'Trainset Needed',
                'initial_date' => 'Initial Date',
            ],
            'buttons' => [
                'submit' => 'Update Project',
            ],
            'messages' => [
                'updated' => 'Project updated successfully!',
            ],
        ],
        'trainset' => [
            'index' => [
                'title' => 'Trainsets',
                'initial_date' => 'Initial Date :initial_date',
                'buttons' => [
                    'add_trainset' => 'Add Trainset',
                ],
                'messages' => [
                    'trainset_added' => 'Trainset added successfully!',
                ],
                'breadcrumbs' => [
                    'home' => 'Home',
                    'project' => 'Project :project',
                ],
                'fields' => [
                    'trainset_needed_placeholder' => 'Select Trainset Needed',
                    'trainset_needed_error' => 'Trainset number must be greater than 0',
                ],
            ],
            'carriage_trainset' => [
                'index' => [
                    'title' => 'Carriages',
                    'initial_date' => 'Initial Date :initial_date',
                    'preset' => 'Preset :preset',
                    'status_in_progress' => 'Status: In Progress',
                    'new_preset_alert' => 'You are using a custom preset, do you want to save it as a new preset?',
                    'buttons' => [
                        'add_carriage' => 'Add Carriage',
                        'export_serial_numbers' => 'Export Serial Numbers',
                    ],
                    'messages' => [
                        'carriage_added' => 'Carriage added successfully!',
                    ],
                    'dialogs' => [
                        'export_serial_numbers' => [
                            'confirmations' => [
                                'title' => 'Are you sure?',
                                'text' => 'This process may take a while',
                            ],
                        ],
                    ],
                    'breadcrumbs' => [
                        'home' => 'Home',
                        'project' => 'Project :project',
                        'trainset' => 'Trainset :trainset',
                    ],
                    'fields' => [
                        'trainset_needed_placeholder' => 'Select Trainset Needed',
                        'trainset_needed_error' => 'Trainset number must be greater than 0',
                    ],
                ],
                'carriage_panel' => [
                    'index' => [
                        'title' => 'Carriage: :name',
                        'initial_date' => 'Initial Date :initial_date',
                        'preset' => 'Preset :preset',
                        'breadcrumbs' => [
                            'home' => 'Home',
                            'project' => 'Project :project',
                            'trainset' => 'Trainset :trainset',
                            'carriage' => 'Carriage :carriage',
                        ],
                    ],
                    'panel_material' => [
                        'index' => [
                            'title' => 'Panel Material',
                            'breadcrumbs' => [
                                'home' => 'Home',
                                'project' => 'Project :project',
                                'trainset' => 'Trainset :trainset',
                                'carriage' => 'Carriage :carriage',
                                'panel' => 'Panel :panel',
                            ],
                        ],
                        'partials' => [
                            'panel_materials' => [
                                'messages' => [
                                    'deleted' => 'Panel Material deleted successfully!',
                                ],
                            ],
                            'add_new_panel_raw_material' => [
                                'messages' => [
                                    'panel_material_added' => 'Panel Material added successfully!',
                                ],
                                'buttons' => [
                                    'add_new_panel_raw_material' => 'Add New Panel Material',
                                ],
                                'dialogs' => [
                                    'title' => 'Add New Panel Material',
                                    'fields' => [
                                        'raw_material' => 'Raw Material',
                                        'raw_material_placeholder' => 'Select Raw Material',
                                        'raw_material_code' => 'Raw Material Code',
                                        'raw_material_code_placeholder' => 'Raw Material Code',
                                        'raw_material_search' => 'Search Raw Material',
                                        'new_raw_material_code' => 'New Raw Material Code',
                                        'new_raw_material_description' => 'New Raw Material Description',
                                        'new_raw_material_unit' => 'New Raw Material Unit',
                                        'new_raw_material_specs' => 'New Raw Material Specs',
                                        'new_raw_material_qty' => 'New Raw Material Qty',
                                    ],
                                    'actions' => [
                                        'adding_panel_material' => 'Adding Panel Material...',
                                    ],
                                    'buttons' => [
                                        'add_panel_material' => 'Add Panel Material',
                                    ],
                                ],
                            ],
                            'partials' => [
                                'panel_material_table' => [
                                    'headers' => [
                                        'material_code' => 'Material Code',
                                        'qty' => 'Quantity',
                                        'description' => 'Description',
                                    ],
                                ],
                                'components' => [
                                    'panel_material_qty' => [
                                        'title' => 'Panel Material Quantity',
                                        'messages' => [
                                            'updated' => 'Panel Material quantity updated successfully!',
                                        ],
                                        'buttons' => [
                                            'update_qty' => 'Update Qty',
                                        ],
                                    ],
                                ],
                            ],
                        ],
                    ],
                    'carriage_panel_component' => [
                        'index' => [
                            'title' => 'Components',
                            'breadcrumbs' => [
                                'home' => 'Home',
                                'project' => 'Project :project',
                                'trainset' => 'Trainset :trainset',
                                'carriage' => 'Carriage :carriage',
                                'panel' => 'Panel :panel',
                            ],
                        ],
                        'component_material' => [
                            'index' => [
                                'title' => 'Component Material',
                                'breadcrumbs' => [
                                    'home' => 'Home',
                                    'project' => 'Project :project',
                                    'trainset' => 'Trainset :trainset',
                                    'carriage' => 'Carriage :carriage',
                                    'panel' => 'Panel :panel',
                                    'component' => 'Component :component',
                                ],
                            ],
                            'partials' => [
                                'component_materials' => [
                                    'messages' => [
                                        'deleted' => 'Component Material deleted successfully!',
                                    ],
                                ],
                                'add_new_component_raw_material' => [
                                    'messages' => [
                                        'created' => 'Component Material added successfully!',
                                    ],
                                    'buttons' => [
                                        'add_new_component_raw_material' => 'Add New Component Material',
                                    ],
                                    'dialogs' => [
                                        'title' => 'Add New Component Material',
                                        'fields' => [
                                            'raw_material' => 'Raw Material',
                                            'raw_material_placeholder' => 'Select Raw Material',
                                            'raw_material_code' => 'Raw Material Code',
                                            'raw_material_code_placeholder' => 'Raw Material Code',
                                            'raw_material_search' => 'Search Raw Material',
                                            'new_raw_material_code' => 'New Raw Material Code',
                                            'new_raw_material_description' => 'New Raw Material Description',
                                            'new_raw_material_unit' => 'New Raw Material Unit',
                                            'new_raw_material_specs' => 'New Raw Material Specs',
                                            'new_raw_material_qty' => 'New Raw Material Qty',
                                        ],
                                        'buttons' => [
                                            'add_component_material' => 'Add Component Material',
                                        ],
                                    ],
                                ],
                                'partials' => [
                                    'component_material_table' => [
                                        'headers' => [
                                            'material_code' => 'Material Code',
                                            'qty' => 'Quantity',
                                            'description' => 'Description',
                                        ],
                                    ],
                                    'components' => [
                                        'component_material_qty' => [
                                            'title' => 'Component Material Quantity',
                                            'messages' => [
                                                'updated' => 'Component Material quantity updated successfully!',
                                            ],
                                            'buttons' => [
                                                'update_qty' => 'Update Qty',
                                            ],
                                        ],
                                    ],
                                ],
                            ],
                        ],
                        'partials' => [
                            'add_new_component' => [
                                'buttons' => [
                                    'add_component' => 'Add Component',
                                ],
                                'dialogs' => [
                                    'fields' => [
                                        'progress' => 'Progress',
                                        'progress_search_placeholder' => 'Search Progress',
                                        'progress_placeholder' => 'Select Progress',
                                        'component' => 'Component',
                                        'component_placeholder' => 'Select Component',
                                        'component_name' => 'Component Name',
                                        'component_description' => 'Component Description',
                                        'component_qty' => 'Component Quantity',
                                    ],
                                ],
                                'messages' => [
                                    'created' => 'Component added successfully!',
                                ],
                            ],
                            'carriage_panel_component_table' => [
                                'headers' => [
                                    'component' => 'Component',
                                    'qty' => 'Quantity',
                                    'description' => 'Description',
                                    'progress' => 'Progress',
                                ],
                                'actions' => [
                                    'materials' => 'Materials',
                                ],
                            ],
                            'carriage_panel_components' => [
                                'messages' => [
                                    'deleted' => 'Component deleted successfully!',
                                ],
                            ],
                            'partials' => [
                                'carriage_panel_component_table' => [
                                    'headers' => [
                                        'component' => 'Component',
                                        'qty' => 'Qty',
                                        'description' => 'Description',
                                        'progress' => 'Progress',
                                    ],
                                    'actions' => [
                                        'materials' => 'Materials',
                                    ],
                                ],
                                'carriage_panel_component_card' => [
                                    'actions' => [
                                        'materials' => 'Materials',
                                    ],
                                ],
                                'components' => [
                                    'carriage_panel_component_qty' => [
                                        'messages' => [
                                            'updated' => 'Component quantity updated successfully!',
                                        ],
                                        'buttons' => [
                                            'update_qty' => 'Update Qty',
                                        ],
                                    ],
                                    'carriage_panel_component_progress' => [
                                        'buttons' => [
                                            'progress' => 'Progress',
                                        ],
                                        'accordions' => [
                                            'progress' => 'Progress',
                                            'progress_steps' => 'Progress Steps',
                                        ],
                                    ],
                                    'partials' => [
                                        'carriage_panel_component_progress' => [
                                            'fields' => [
                                                'progress' => 'Progress',
                                                'progress_search_placeholder' => 'Search Progress',
                                                'progress_placeholder' => 'Select Progress',
                                                'progress_name' => 'Progress Name',
                                                'work_aspect' => 'Work Aspect',
                                                'work_aspect_placeholder' => 'Select Work Aspect',
                                                'panel_component_qty' => 'Panel Component Quantity',
                                            ],
                                            'messages' => [
                                                'updated' => 'Panel progress updated successfully!',
                                            ],
                                        ],
                                        'carriage_panel_component_progress_steps' => [
                                            'messages' => [
                                                'updated' => 'Progress step updated successfully!',
                                                'deleted' => 'Progress step deleted successfully!',
                                            ],
                                            'fields' => [
                                                'step' => 'Step',
                                                'step_placeholder' => 'Select Step',
                                                'name' => 'Name',
                                                'name_placeholder' => 'Enter Step Name',
                                                'process' => 'Process',
                                                'process_placeholder' => 'Enter Step Process',
                                                'estimated_time' => 'Estimated Time (Minutes)',
                                                'estimated_time_placeholder' => 'Enter Estimated Time',
                                            ],
                                            'buttons' => [
                                                'add_step' => 'Add Step',
                                            ],
                                        ],
                                    ],
                                ],
                            ],
                        ],
                    ],
                    'partials' => [
                        'panels' => [
                            'messages' => [
                                'deleted' => 'Panel deleted successfully!',
                            ],
                        ],
                        'add_new_panel' => [
                            'messages' => [
                                'panel_added' => 'Panel added successfully!',
                            ],
                            'dialogs' => [
                                'fields' => [
                                    'progress' => 'Progress',
                                    'progress_placeholder' => 'Select Progress',
                                    'progress_search' => 'Search Progress',
                                    'panel' => 'Panel',
                                    'panel_placeholder' => 'Select Panel',
                                    'panel_search' => 'Search Panel',
                                    'new_panel_name' => 'New Panel Name',
                                    'new_panel_description' => 'New Panel Description',
                                    'new_panel_qty' => 'New Panel Qty',
                                ],
                                'buttons' => [
                                    'add_panel' => 'Add Panel',
                                ],
                            ],
                            'buttons' => [
                                'add_new_panel' => 'Add New Panel',
                            ],
                        ],
                        'partials' => [
                            'carriage_panel_table' => [
                                'headers' => [
                                    'panel' => 'Panel',
                                    'qty' => 'Qty',
                                    'description' => 'Description',
                                    'components' => 'Components',
                                    'progress' => 'Progress',
                                ],
                            ],
                            'carriage_panel_card' => [
                                'headers' => [
                                    'panel' => 'Panel',
                                    'qty' => 'Qty',
                                    'description' => 'Description',
                                    'components' => 'Components',
                                    'progress' => 'Progress',
                                ],
                            ],
                            'components' => [
                                'panel_qty' => [
                                    'title' => 'Panel Quantity',
                                    'messages' => [
                                        'updated' => 'Panel quantity updated successfully!',
                                    ],
                                    'buttons' => [
                                        'update_qty' => 'Update Qty',
                                    ],
                                ],
                                'panel_progress' => [
                                    'accordions' => [
                                        'progress' => 'Progress',
                                        'progress_steps' => 'Progress Steps',
                                    ],
                                    'messages' => [
                                        'updated' => 'Panel progress updated successfully!',
                                    ],
                                    'buttons' => [
                                        'progress' => 'Progress',
                                    ],
                                ],
                                'partials' => [
                                    'panel_progress' => [
                                        'buttons' => [
                                            'progress' => 'Progress',
                                        ],
                                        'accordions' => [
                                            'progress' => 'Progress',
                                            'progress_steps' => 'Progress Steps',
                                        ],
                                        'messages' => [
                                            'updated' => 'Panel progress updated successfully!',
                                        ],
                                        'fields' => [
                                            'progress' => 'Progress',
                                            'progress_placeholder' => 'Select Progress',
                                            'name' => 'Name',
                                            'work_aspect' => 'Work Aspect',
                                            'work_aspect_placeholder' => 'Select Work Aspect',
                                        ],
                                        'separators' => [
                                            'create_new_progress' => 'Create New Progress',
                                        ],
                                    ],
                                    'panel_progress_steps' => [
                                        'messages' => [
                                            'updated' => 'Progress step updated successfully!',
                                            'deleted' => 'Progress step deleted successfully!',
                                        ],
                                        'fields' => [
                                            'step' => 'Step',
                                            'step_placeholder' => 'Select Step',
                                            'name' => 'Name',
                                            'name_placeholder' => 'Enter Step Name',
                                            'process' => 'Process',
                                            'process_placeholder' => 'Enter Step Process',
                                            'estimated_time' => 'Estimated Time (Minutes)',
                                            'estimated_time_placeholder' => 'Enter Estimated Time',
                                        ],
                                        'buttons' => [
                                            'add_step' => 'Add Step',
                                        ],
                                    ],
                                ],
                            ],
                        ],
                    ],
                ],
                'partials' => [
                    'change_trainset_preset' => [
                        'title' => 'Change Trainset Preset',
                        'messages' => [
                            'changed' => 'Preset changed successfully!',
                            'kpm_generated' => 'KPM generated successfully!',
                            'preset_deleted' => 'Preset deleted successfully!',
                        ],
                        'fields' => [
                            'preset_trainset' => 'Preset Trainset',
                            'preset_trainset_placeholder' => 'Select Preset Trainset',
                        ],
                        'buttons' => [
                            'change_preset' => 'Change Preset',
                            'delete_preset' => 'Delete Preset',
                            'generate_kpm' => 'Generate KPM',
                        ],
                    ],
                    'generate_attachment' => [
                        'buttons' => [
                            'generate_attachment' => 'Generate Attachment',
                        ],
                        'messages' => [
                            'attachment_generated' => 'Attachment generated successfully!',
                            'attachment_not_generated' => 'Failed to generate attachment!',
                        ],
                        'dialogs' => [
                            'generate_attachment_title' => 'Generate Attachment',
                            'confirm_generate_attachment_raw_materials' => 'Raw Material Confirmation',
                            'confirm_generate_attachment_raw_materials_description' => 'Please confirm the following raw materials to be attached to the trainset.',
                            'fields' => [
                                'source_workstation' => 'Source Workstation',
                                'source_workstation_placeholder' => 'Select Source Workstation',
                                'source_workstation_search' => 'Search Source Workstation',
                                'workstation' => 'Select Workstation',
                                'workstation_placeholder' => 'Workstation',
                                'destination_workstation' => 'Destination Workstation',
                                'destination_workstation_placeholder' => 'Select Destination Workstation',
                                'destination_workstation_search' => 'Search Destination Workstation',
                            ],
                            'buttons' => [
                                'generate_attachment' => 'Generate Attachment',
                                'generate_mechanic_kpm' => 'Generate Mechanic Attachment',
                                'generate_electric_kpm' => 'Generate Electric Attachment',
                                'trainset_attachment_mechanic' => 'Mechanic',
                                'trainset_attachment_electric' => 'Electric',
                                'panel_attachment' => 'Panel (Assembly)',
                            ],
                        ],
                    ],
                    'carriages' => [
                        'messages' => [
                            'deleted' => 'Carriage deleted successfully!',
                        ],
                    ],
                    'add_new_trainset_preset' => [
                        'messages' => [
                            'preset_added' => 'Preset added successfully!',
                        ],
                        'buttons' => [
                            'add_new_preset' => 'Add New Preset',
                        ],
                        'dialogs' => [
                            'title' => 'Add New Preset',
                            'fields' => [
                                'preset_name' => 'Preset Name',
                            ],
                            'actions' => [
                                'saving' => 'Saving Preset...',
                            ],
                            'buttons' => [
                                'submit' => 'Save Preset',
                            ],
                        ],
                    ],
                    'add_carriage' => [
                        'title' => 'Add Carriage',
                        'buttons' => [
                            'add_carriage' => 'Add Carriage',
                        ],
                        'messages' => [
                            'carriage_added' => 'Carriage added successfully!',
                        ],
                        'dialogs' => [
                            'fields' => [
                                'carriage' => 'Carriage',
                                'carriage_placeholder' => 'Select Carriage',
                                'carriage_search' => 'Search Carriage',
                                'or' => 'Or',
                                'new_carriage_qty' => 'New Carriage Qty',
                                'new_carriage_type' => 'New Carriage Type',
                                'new_carriage_description' => 'New Carriage Description',
                            ],
                            'actions' => [
                                'adding_carriage' => 'Adding Carriage...',
                            ],
                            'buttons' => [
                                'add_carriage' => 'Add Carriage',
                            ],
                        ],
                    ],
                    'preview_attachments' => [
                        'dialogs' => [
                            'buttons' => [
                                'view_detail_attachment' => 'View Detail Attachment',
                                'mechanic_attachment' => 'Mechanic Attachment',
                                'electric_attachment' => 'Electric Attachment',
                                'panel_attachment' => 'Panel Attachment',
                            ],
                            'components' => [
                                'preview_trainset_attachment' => [
                                    'props' => [
                                        'title' => 'Trainset Attachment',
                                    ],
                                ],
                                'preview_panel_attachment' => [
                                    'props' => [
                                        'title' => 'Panel Attachment',
                                    ],
                                ],
                            ],
                        ],
                    ],
                    'progress_attachments' => [
                        'dialogs' => [
                            'buttons' => [
                                'trigger' => 'Trainset Progresses',
                            ],
                            'components' => [
                                'tabs' => [
                                    'props' => [
                                        'tab_list' => [
                                            'mechanic' => 'Mechanic Progress',
                                            'electric' => 'Electric Progress',
                                            'assembly' => 'Assembly Progress',
                                        ],
                                        'tab_content' => [
                                            'title' => [
                                                'mechanic' => 'Mechanic Progresses For :trainset Trainset',
                                                'electric' => 'Electric Progresses For :trainset Trainset',
                                                'assembly' => 'Assembly Progresses For :trainset Trainset',
                                            ],
                                        ],
                                    ],
                                ],
                            ],
                        ],
                    ],
                    'partials' => [
                        'carriage_table' => [
                            'headers' => [
                                'type' => 'Type',
                                'qty' => 'Qty',
                                'panels' => 'Panels',
                            ],
                            'actions' => [
                                'panels' => 'Panels',
                            ],
                        ],
                        'carriage_card' => [
                            'headers' => [
                                'type' => 'Type',
                                'qty' => 'Qty',
                                'panels' => 'Panels',
                            ],
                            'actions' => [
                                'panels' => 'Panels',
                            ],
                        ],
                    ],
                    'components' => [
                        'carriage_qty' => [
                            'title' => 'Carriage Quantity',
                            'messages' => [
                                'updated' => 'Carriage quantity updated successfully!',
                            ],
                            'buttons' => [
                                'submit' => 'Update Qty',
                            ],
                        ],
                        'preview_panel_attachment' => [
                            'buttons' => [
                                'download' => 'Download Attachment',
                            ],
                            'dialogs' => [
                                'title' => 'Panel Attachment',
                                'messages' => [
                                    'no_attachments' => 'No attachments found for the selected panel and carriage.',
                                ],
                                'headers' => [
                                    'handlers' => 'Attachment Handler',
                                    'attachment_number' => 'Attachment Number',
                                    'reservation_number' => 'Reservation Number',
                                    'serial_number' => 'Serial Number',
                                    'reference_number' => 'Reference Number',
                                    'date' => 'Date',
                                    'material_list' => 'Material List',
                                ],
                                'fields' => [
                                    'carriage' => 'Carriage',
                                    'carriage_placeholder' => 'Select Carriage',
                                    'panel' => 'Panel',
                                    'panel_placeholder' => 'Select Panel',
                                ],
                                'buttons' => [
                                    'print_qr' => 'Print QR',
                                ],
                                'raw_material_table' => [
                                    'headers' => [
                                        'material_code' => 'Material Code',
                                        'description' => 'Description',
                                        'specs' => 'Specs',
                                        'unit' => 'Unit',
                                        'total_qty' => 'Total Qty',
                                    ],
                                    'others' => [
                                        'captions' => [
                                            'list_material_within_attachment' => 'List of Material within Attachment',
                                        ],
                                    ],
                                ],
                            ],
                        ],
                        'preview_trainset_attachment' => [
                            'buttons' => [
                                'download' => 'Download Attachment',
                            ],
                            'dialogs' => [
                                'title' => 'Trainset Attachment',
                                'headers' => [
                                    'handlers' => 'Attachment Handler',
                                    'attachment_number' => 'Attachment Number',
                                    'reservation_number' => 'Reservation Number',
                                    'serial_number' => 'Serial Number',
                                    'reference_number' => 'Reference Number',
                                    'date' => 'Date',
                                    'material_list' => 'Material List',
                                ],
                                'fields' => [
                                    'carriage' => 'Carriage',
                                    'carriage_placeholder' => 'Select Carriage',
                                    'panel' => 'Panel',
                                    'panel_placeholder' => 'Select Panel',
                                ],
                                'buttons' => [
                                    'print_qr' => 'Print QR',
                                ],
                                'raw_material_table' => [
                                    'headers' => [
                                        'material_code' => 'Material Code',
                                        'description' => 'Description',
                                        'specs' => 'Specs',
                                        'unit' => 'Unit',
                                        'total_qty' => 'Total Qty',
                                    ],
                                    'others' => [
                                        'captions' => [
                                            'list_material_within_attachment' => 'List of Material within Trainset Attachment',
                                        ],
                                    ],
                                ],
                            ],
                        ],
                        'preview_generate_panel_attachment' => [
                            'dialogs' => [
                                'title' => 'Panel Attachment',
                                'messages' => [
                                    'no_materials' => 'No raw materials found for the selected panel and carriage.',
                                ],
                                'fields' => [
                                    'carriage' => 'Carriage',
                                    'carriage_placeholder' => 'Select Carriage',
                                    'panel' => 'Panel',
                                    'panel_placeholder' => 'Select Panel',
                                ],
                                'headers' => [
                                    'material_list' => 'Material List',
                                ],
                                'raw_material_table' => [
                                    'headers' => [
                                        'material_code' => 'Material Code',
                                        'description' => 'Description',
                                        'specs' => 'Specs',
                                        'unit' => 'Unit',
                                        'total_qty' => 'Total Qty',
                                    ],
                                    'others' => [
                                        'captions' => [
                                            'list_material_within_attachment' => 'List of Material within Attachment',
                                        ],
                                    ],
                                ],
                            ],
                        ],
                        'preview_generate_trainset_attachment' => [
                            'messages' => [
                                'no_materials' => 'No raw materials found for the selected panel and carriage.',
                            ],
                            'dialogs' => [
                                'title' => 'Trainset Attachment',
                                'raw_material_table' => [
                                    'headers' => [
                                        'material_code' => 'Material Code',
                                        'description' => 'Description',
                                        'specs' => 'Specs',
                                        'unit' => 'Unit',
                                        'total_qty' => 'Total Qty',
                                    ],
                                    'others' => [
                                        'captions' => [
                                            'list_material_within_attachment' => 'List of Material within Trainset Attachment',
                                        ],
                                    ],
                                ],
                            ],
                        ],
                        'progress_component' => [
                            'props' => [
                                'none' => 'No Progress Found (:status)',
                                'trainset' => 'Trainset: :trainset',
                                'component' => 'Component: :component',
                                'component_placeholder' => 'Select Component',
                                'select_all_components' => 'All Components',
                                'panel' => 'Panel: :panel',
                                'carriage' => 'Carriage: :carriage',
                                'workers' => 'Workers:',
                            ],
                        ],
                        'progress_panel' => [
                            'props' => [
                                'none' => 'No Progress Found',
                                'trainset' => 'Trainset: :trainset',
                                'panel' => 'Panel: :panel',
                                'carriage' => 'Carriage: :carriage',
                                'serial_number' => 'Serial Number: :serial_number',
                                'product_number' => 'Product Number: :product_number',
                                'workers' => 'Workers:',
                            ],
                        ],
                        'components' => [
                            'worker_card' => [
                                'worker_identification' => 'EIN: :worker_identification',
                                'acceptance_status' => 'Acceptance Status',
                                'work_status' => 'Work Status',
                                'start_at' => 'Started At',
                            ],
                            'worker_step_card' => [
                                'step_status' => 'Status',
                            ],
                        ],
                    ],
                ],
            ],
            'partials' => [
                'trainsets' => [
                    'messages' => [
                        'deleted' => 'Trainset deleted successfully!',
                    ],
                ],
                'custom_preset_alert' => [

                ],
                'partials' => [
                    'trainset_table' => [
                        'headers' => [
                            'name' => 'Name',
                            'trainset_carriage' => 'Trainset Carriage',
                        ],
                        'actions' => [
                            'carriages' => 'Carriages',
                            'components' => 'Components',
                            'panels' => 'Panels',
                        ],
                    ],
                    'trainset_card' => [
                        'headers' => [
                            'name' => 'Name: :name',
                            'trainset_carriage' => 'Trainset Carriage: :trainset_carriage',
                        ],
                        'actions' => [
                            'carriages' => 'Carriages',
                        ],
                    ],
                    'components' => [
                        'trainset_name' => [
                            'headers' => [
                                'name' => 'Name',
                            ],
                            'fields' => [
                                'trainset_error' => 'Trainset number must not be empty',
                            ],
                            'buttons' => [
                                'submit' => 'Save',
                            ],
                        ],
                    ],
                ],
            ],
        ],
        'panel' => [
            'index' => [
                'title' => 'Panels',
                'initial_date' => 'Initial Date :initial_date',
                'preset' => 'Preset :preset',
                'breadcrumbs' => [
                    'home' => 'Home',
                    'project' => 'Project :project',
                    'panels' => 'Panels',
                ],
            ],
            'partials' => [
                'panels' => [
                    'messages' => [
                        'deleted' => 'Panel deleted successfully!',
                    ],
                ],
                'import' => [
                    'buttons' => [
                        'import' => 'Import Panel',
                    ],
                    'messages' => [
                        'imported' => 'Panel imported successfully!',
                    ],
                    'dialogs' => [
                        'title' => 'Import Panel',
                        'description' => 'Import progress and raw material data of :panel_name on Project :project_name.',
                        'fields' => [
                            'download_template' => 'Download Template',
                            'file' => 'File',
                        ],
                        'buttons' => [
                            'import' => 'Import Panel',
                            'download_template' => 'Download',
                            'submit' => 'Import Panel',
                            'processing' => 'Processing...',
                        ],
                    ],
                ],
                'partials' => [
                    'panel_table' => [
                        'headers' => [
                            'name' => 'Name',
                            'description' => 'Description',
                            'total_qty' => 'Total Qty',
                        ],
                    ],
                    'panel_card' => [
                        'headers' => [
                            'name' => 'Name: :name',
                            'description' => 'Description: :description',
                            'total_qty' => 'Total Qty: :total_qty',
                        ],
                    ],
                ],
            ],
        ],
        'carriage' => [
            'index' => [
                'title' => 'Carriages',
                'initial_date' => 'Initial Date :initial_date',
                'preset' => 'Preset :preset',
                'breadcrumbs' => [
                    'home' => 'Home',
                    'project' => 'Project :project',
                    'carriages' => 'Carriages',
                ],
            ],
            'component' => [
                'index' => [
                    'title' => 'Components',
                    'initial_date' => 'Initial Date :initial_date',
                    'preset' => 'Preset :preset',
                    'breadcrumbs' => [
                        'home' => 'Home',
                        'project' => 'Project :project',
                        'carriage' => 'Carriage :carriage',
                        'components' => 'Components',
                    ],
                ],
                'partials' => [
                    'components' => [
                        'messages' => [
                            'deleted' => 'Component deleted successfully!',
                        ],
                    ],
                    'import' => [
                        'buttons' => [
                            'import' => 'Import Component',
                        ],
                        'messages' => [
                            'imported' => 'Component imported successfully!',
                        ],
                        'dialogs' => [
                            'title' => 'Import Component',
                            'description' => 'Import progress and raw material data of :component_name on Project :project_name.',
                            'description_already_has_material' => 'This component already has raw material data',
                            'fields' => [
                                'download_template' => 'Download Template',
                                'file' => 'File',
                                'work_aspect' => 'Work Aspect',
                                'override' => 'What is your action?',
                                'override_default' => 'Re-Import',
                                'override_override' => 'Override',
                                'override_merge' => 'Merge',
                            ],
                            'buttons' => [
                                'import' => 'Import Component',
                                'download_template' => 'Download',
                                'submit' => 'Import Component',
                                'processing' => 'Processing...',
                            ],
                        ],
                    ],
                    'partials' => [
                        'component_table' => [
                            'headers' => [
                                'name' => 'Name',
                                'description' => 'Description',
                                'total_qty' => 'Total Qty',
                            ],
                        ],
                        'component_card' => [
                            'headers' => [
                                'name' => 'Name: :name',
                                'description' => 'Description: :description',
                                'total_qty' => 'Total Qty: :total_qty',
                            ],
                        ],
                    ],
                ],
            ],
            'panel' => [
                'index' => [
                    'title' => 'Panels',
                    'initial_date' => 'Initial Date :initial_date',
                    'preset' => 'Preset :preset',
                    'breadcrumbs' => [
                        'home' => 'Home',
                        'project' => 'Project :project',
                        'carriage' => 'Carriage :carriage',
                        'panels' => 'Panels',
                    ],
                ],
                'partials' => [
                    'panels' => [
                        'messages' => [
                            'deleted' => 'Panel deleted successfully!',
                        ],
                    ],
                    'import' => [
                        'buttons' => [
                            'import' => 'Import Panel',
                        ],
                        'messages' => [
                            'imported' => 'Panel imported successfully!',
                        ],
                        'dialogs' => [
                            'title' => 'Import Panel',
                            'description' => 'Import progress and raw material data of :panel_name on Project :project_name.',
                            'fields' => [
                                'download_template' => 'Download Template',
                                'file' => 'File',
                            ],
                            'buttons' => [
                                'import' => 'Import Panel',
                                'download_template' => 'Download',
                                'submit' => 'Import Panel',
                                'processing' => 'Processing...',
                            ],
                        ],
                    ],
                    'partials' => [
                        'panel_table' => [
                            'headers' => [
                                'name' => 'Name',
                                'description' => 'Description',
                                'total_qty' => 'Total Qty',
                            ],
                        ],
                        'panel_card' => [
                            'headers' => [
                                'name' => 'Name: :name',
                                'description' => 'Description: :description',
                                'total_qty' => 'Total Qty: :total_qty',
                            ],
                        ],
                    ],
                ],
            ],
            'partials' => [
                'carriages' => [
                    'messages' => [
                        'deleted' => 'Carriage deleted successfully!',
                    ],
                ],
                'import' => [
                    'buttons' => [
                        'import' => 'Import Carriage',
                    ],
                    'messages' => [
                        'imported' => 'Carriage imported successfully!',
                    ],
                    'dialogs' => [
                        'title' => 'Import Carriage',
                        'description' => 'Import progress and raw material data of :carriage_name on Project :project_name.',
                        'fields' => [
                            'download_template' => 'Download Template',
                            'file' => 'File',
                            'work_aspect' => 'Work Aspect',
                        ],
                        'buttons' => [
                            'import' => 'Import Carriage',
                            'download_template' => 'Download',
                            'submit' => 'Import Carriage',
                            'processing' => 'Processing...',
                        ],
                    ],
                ],
                'partials' => [
                    'carriage_table' => [
                        'headers' => [
                            'name' => 'Name',
                            'description' => 'Description',
                            'total_qty' => 'Total Qty',
                        ],
                    ],
                    'carriage_card' => [
                        'headers' => [
                            'name' => 'Name: :name',
                            'description' => 'Description: :description',
                            'total_qty' => 'Total Qty: :total_qty',
                        ],
                    ],
                ],
            ],
        ],
        'component' => [
            'index' => [
                'title' => 'Components',
                'initial_date' => 'Initial Date :initial_date',
                'preset' => 'Preset :preset',
                'breadcrumbs' => [
                    'home' => 'Home',
                    'project' => 'Project :project',
                    'components' => 'Components',
                ],
            ],
            'partials' => [
                'components' => [
                    'messages' => [
                        'deleted' => 'Component deleted successfully!',
                    ],
                ],
                'import' => [
                    'buttons' => [
                        'import' => 'Import Component',
                    ],
                    'messages' => [
                        'imported' => 'Component imported successfully!',
                    ],
                    'dialogs' => [
                        'title' => 'Import Component',
                        'description' => 'Import progress and raw material data of :component_name on Project :project_name.',
                        'fields' => [
                            'download_template' => 'Download Template',
                            'file' => 'File',
                            'work_aspect' => 'Work Aspect',
                        ],
                        'buttons' => [
                            'import' => 'Import Component',
                            'download_template' => 'Download',
                            'submit' => 'Import Component',
                            'processing' => 'Processing...',
                        ],
                    ],
                ],
                'partials' => [
                    'component_table' => [
                        'headers' => [
                            'name' => 'Name',
                            'description' => 'Description',
                            'total_qty' => 'Total Qty',
                        ],
                    ],
                    'component_card' => [
                        'headers' => [
                            'name' => 'Name: :name',
                            'description' => 'Description: :description',
                            'total_qty' => 'Total Qty: :total_qty',
                        ],
                    ],
                ],
            ],
        ],
        'partials' => [
            'projects' => [
                'messages' => [
                    'deleted' => 'Project deleted successfully!',
                ],
            ],
            'import' => [
                'messages' => [
                    'imported' => 'Project imported successfully!',
                ],
                'dialogs' => [
                    'title' => 'Import Project',
                    'description' => 'Import Project from Excel file',
                    'fields' => [
                        'download_template' => 'Download Template',
                        'file' => 'File',
                    ],
                    'buttons' => [
                        'import' => 'Import Project',
                        'download_template' => 'Download',
                        'submit' => 'Import Project',
                        'processing' => 'Processing...',
                    ],
                    'messages' => [
                        'imported' => 'Project imported successfully!',
                    ],
                ],
                'buttons' => [
                    'import' => 'Import Project',
                ],
            ],
            'partials' => [
                'project_table' => [
                    'headers' => [
                        'name' => 'Name',
                        'initial_date' => 'Initial Date',
                        'trainset_count' => 'Trainset Count',
                    ],
                    'actions' => [
                        'carriages' => 'Carriages',
                        'trainsets' => 'Trainsets',
                        'components' => 'Components',
                        'panels' => 'Panels',
                    ],
                ],
                'project_card' => [
                    'headers' => [
                        'name' => 'Name: :name',
                        'initial_date' => 'Initial Date: :initial_date',
                        'trainset_count' => 'Trainset Count: :trainset_count',
                    ],
                    'actions' => [
                        'trainsets' => 'Trainsets',
                        'components' => 'Components',
                        'panels' => 'Panels',
                    ],
                ],
                'buyer_form' => [
                    'fields' => [
                        'buyer' => 'Customer',
                        'name' => 'Name',
                        'email' => 'Email',
                        'phone_number' => 'Phone Number',
                        'password' => 'Password',
                    ],
                    'placeholders' => [
                        'buyer' => 'Select Customer...',
                        'name' => 'Input Name...',
                        'email' => 'Input Email...',
                        'phone_number' => 'Input Phone Number...',
                        'password' => 'Input Password...',
                    ],
                    'messages' => [
                        'created' => 'Buyer created successfully!',
                    ],
                ],
            ],
        ],
    ],
    'carriage' => [
        'index' => [
            'title' => 'Carriages',
            'buttons' => [
                'create' => 'Create Carriage',
            ],
        ],
        'create' => [
            'title' => 'Create Carriage',
            'fields' => [
                'type' => 'Type',
                'description' => 'Description',
            ],
            'buttons' => [
                'submit' => 'Create Carriage',
            ],
            'messages' => [
                'created' => 'Carriage created successfully!',
            ],
        ],
        'edit' => [
            'title' => 'Edit Carriage: :name',
            'fields' => [
                'type' => 'Type',
                'description' => 'Description',
            ],
            'buttons' => [
                'submit' => 'Update Carriage',
            ],
            'messages' => [
                'updated' => 'Carriage updated successfully!',
            ],
        ],
        'partials' => [
            'carriages' => [
                'messages' => [
                    'deleted' => 'Carriage deleted successfully!',
                ],
            ],
            'import' => [
                'messages' => [
                    'imported' => 'Carriage imported successfully!',
                ],
                'dialogs' => [
                    'title' => 'Import Carriage',
                    'description' => 'Import Carriage from Excel file',
                    'fields' => [
                        'download_template' => 'Download Template',
                        'file' => 'File',
                    ],
                    'buttons' => [
                        'import' => 'Import Carriage',
                        'download_template' => 'Download',
                        'submit' => 'Import Carriage',
                        'processing' => 'Processing...',
                    ],
                    'messages' => [
                        'imported' => 'Carriage imported successfully!',
                    ],
                ],
                'buttons' => [
                    'import' => 'Import Carriage',
                ],
            ],
            'partials' => [
                'carriage_table' => [
                    'headers' => [
                        'type' => 'Type',
                        'description' => 'Description',
                    ],
                ],
                'carriage_card' => [
                    'headers' => [
                        'type' => 'Type: :type',
                        'description' => 'Description: :description',
                    ],
                ],
            ],
        ],
    ],
    'settings' => [
        'title' => 'Settings',
    ],
    'feedback' => [
        'index' => [
            'title' => 'Feedback',
            'buttons' => [
                'create' => 'Create Feedback',
            ],
        ],
        'partials' => [
            'feedbacks' => [
                'messages' => [
                    'deleted' => 'Feedback deleted successfully!',
                ],
            ],
            'partials' => [
                'feedback_table' => [
                    'headers' => [
                        'name' => 'Name',
                        'email' => 'Email',
                        'rating' => 'Rating',
                        'message' => 'Message',
                        'status' => 'Status',
                    ],
                    'values' => [
                        'pending' => 'Pending',
                        'approved' => 'Approved',
                        'rejected' => 'Rejected',
                    ],
                ],
                'feedback_card' => [
                    'headers' => [
                        'name' => 'Name: :name',
                        'email' => 'Email: :email',
                        'rating' => 'Rating: :rating',
                        'message' => 'Message: :message',
                        'status' => 'Status: :status',
                    ],
                ],
            ],
        ],
    ],
    'helpdesk' => [
        'title' => 'Helpdesk',
    ],
    'profile' => [
        'edit' => [
            'title' => 'Edit Profile',
        ],
        'partials' => [
            'delete_user_form' => [
                'title' => 'Delete Account',
                'description' => 'Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain.',
                'dialogs' => [
                    'title' => 'Delete Account',
                    'description' => 'Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account.',
                    'fields' => [
                        'password' => 'Password',
                        'password_placeholder' => 'Enter your password',
                    ],
                    'buttons' => [
                        'delete_account' => 'Delete Account',
                    ],
                ],
                'buttons' => [
                    'delete_account' => 'Delete Account',
                ],
            ],
            'update_password_form' => [
                'title' => 'Update Password',
                'description' => 'Ensure your account is using a long, random password to stay secure.',
                'fields' => [
                    'current_password' => 'Current Password',
                    'password' => 'Password',
                    'password_confirmation' => 'Confirm Password',
                ],
                'buttons' => [
                    'submit' => 'Update Password',
                ],
                'messages' => [
                    'updated' => 'Password updated successfully!',
                ],
            ],
            'update_profile_information_form' => [
                'title' => 'Update Profile Information',
                'description' => 'Update your account\'s profile information and email address.',
                'fields' => [
                    'name' => 'Name',
                    'email' => 'Email',
                    'phone_number' => 'Phone Number',
                    'avatar' => 'Avatar',
                    'avatar_filepond_placeholder' => 'Drop files here or click to upload',
                ],
                'buttons' => [
                    'submit' => 'Update Information',
                    'resend_verification_email' => 'Click here to re-send the verification email.',
                ],
                'messages' => [
                    'updated' => 'Profile information updated successfully!',
                    'verify_email' => 'Your email address is unverified.',
                    'verification_email_sent' => 'A new verification email has been sent to the address you provided during registration.',
                ],
            ],
        ],
    ],
    'trainset_attachment' => [
        'document_trainset_attachment' => [
            'title' => 'Material Withdrawal Card (MWC)',
            'headers' => [
                'mechanic_attachment' => 'Mechanic Attachment',
                'electric_attachment' => 'Electric Attachment',
                'attachment_number' => 'Attachment Number',
                'reservation_number' => 'Reservation Number',
                'serial_number' => 'Serial Number',
                'reference_number' => 'Reference Number',
                'date' => 'Date',
                'source_workstation' => 'Source Workstation',
                'destination_workstation' => 'Destination Workstation',
                'material_list' => 'Material List',
            ],
            'raw_material_table' => [
                'headers' => [
                    'number' => 'No',
                    'material_code' => 'Material Code',
                    'description' => 'Description',
                    'specs' => 'Specs',
                    'unit' => 'Unit',
                    'total_required' => 'Total Requested',
                    'total_received' => 'Total Received',
                    'lot' => 'Lot/TS',
                ],
            ],
            'props' => [
                'signatures' => [
                    'prepare' => 'Prepared By',
                    'send' => 'Sended By',
                    'receive' => 'Received By',
                    'identifier' => 'EID',
                ],
            ],
        ],
    ],
    'panel_attachment' => [
        'document_panel_attachment' => [
            'title' => 'Material Withdrawal Card (MWC)',
            'headers' => [
                'kpm_assembly' => 'Assembly Attachment',
                'attachment_number' => 'Attachment Number',
                'reservation_number' => 'Reservation Number',
                'serial_number' => 'Serial Number',
                'reference_number' => 'Reference Number',
                'date' => 'Date',
                'source_workstation' => 'Source Workstation',
                'destination_workstation' => 'Destination Workstation',
                'description' => 'Description',
                'material_list' => 'Material List',
            ],
            'raw_material_table' => [
                'headers' => [
                    'number' => 'No',
                    'material_code' => 'Material Code',
                    'description' => 'Description',
                    'specs' => 'Specs',
                    'unit' => 'Unit',
                    'total_required' => 'Total Requested',
                    'total_received' => 'Total Received',
                    'lot' => 'Lot/TS',
                ],
            ],
            'props' => [
                'signatures' => [
                    'prepare' => 'Prepared By',
                    'send' => 'Sended By',
                    'receive' => 'Received By',
                    'identifier' => 'EID',
                ],
            ],
        ],
    ],
];
