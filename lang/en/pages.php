<?php

return [
    'login' => [
        'title' => 'Welcome Back!',
        'fields' => [
            'nip' => 'Employee ID',
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
        ],
    ],
    'work_days' => [
        'index' => [
            'title' => 'Work Days',
            'buttons' => [
                'create' => 'Create Work Day',
            ],
            'partials' => [
                'work_days' => [
                    'messages' => [
                        'deleted' => 'Work Day deleted successfully!',
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
    ],
    'staff_management' => [
        'title' => 'Staff Management',
    ],
    'divisions' => [
        'index' => [
            'title' => 'Divisions',
            'buttons' => [
                'create' => 'Create Division',
            ],
            'partials' => [
                'divisions' => [
                    'messages' => [
                        'deleted' => 'Division deleted successfully!',
                    ],
                    'partials' => [
                        'divisions_table' => [
                            'headers' => [
                                'name' => 'Name',
                            ],
                        ],
                        'divisions_card' => [
                            'headers' => [
                                'name' => 'Name',
                            ],
                        ],
                    ],
                ],
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
    ],
    'workshops' => [
        'index' => [
            'title' => 'Workshops',
            'buttons' => [
                'create' => 'Create Workshop',
            ],
            'partials' => [
                'workshops' => [
                    'messages' => [
                        'deleted' => 'Workshop deleted successfully!',
                    ],
                    'partials' => [
                        'workshops_table' => [
                            'headers' => [
                                'name' => 'Name',
                                'address' => 'Address',
                            ],
                        ],
                        'workshops_card' => [
                            'headers' => [
                                'name' => 'Name',
                                'address' => 'Address : :address',
                            ],
                        ],
                    ],
                ],
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
    ],
    'workstations' => [
        'index' => [
            'title' => 'Workstation',
            'buttons' => [
                'create' => 'Create Workstation',
            ],
            'partials' => [
                'workstations' => [
                    'messages' => [
                        'deleted' => 'Workstation deleted successfully!',
                    ],
                    'partials' => [
                        'workstations_table' => [
                            'headers' => [
                                'name' => 'Name',
                                'location' => 'Location',
                                'workshop' => 'Workshop',
                                'division' => 'Division',
                            ],
                        ],
                        'workstations_card' => [
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
    ],
    'users' => [
        'index' => [
            'title' => 'Staff',
            'buttons' => [
                'create' => 'Create Staff',
            ],
            'partials' => [
                'users' => [
                    'messages' => [
                        'deleted' => 'Staff deleted successfully!',
                    ],
                    'partials' => [
                        'users_table' => [
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
                        'users_card' => [
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
    ],
    'access_control' => [
        'title' => 'Access Control',
    ],
    'permissions' => [ // CRUD Not implemented
        'index' => [
            'title' => 'Permission',
            'buttons' => [
                'create' => 'Create Permission',
            ],
            'partials' => [
                'permissions' => [
                    'messages' => [
                        'deleted' => 'Permission deleted successfully!',
                    ],
                    'partials' => [
                        'permissions_table' => [
                            'headers' => [
                                'group' => 'Group',
                                'name' => 'Name',
                            ],
                        ],
                        'permissions_card' => [
                            'headers' => [
                                'group' => 'Group',
                                'name' => 'Name',
                            ],
                        ],
                    ],
                ],
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
    ],
    'roles' => [
        'title' => 'Roles',
    ],
    'steps' => [
        'title' => 'List Steps',
    ],
    'raw_materials' => [
        'title' => 'List Raw Materials',
    ],
    'components' => [
        'title' => 'List Components',
    ],
    'panels' => [
        'title' => 'List Panels',
    ],
    'projects' => [
        'title' => 'List Projects',
    ],
    'carriages' => [
        'title' => 'List Carriages',
    ],
    'settings' => [
        'title' => 'Settings',
    ],
    'feedback' => [
        'title' => 'Feedback',
    ],
    'helpdesk' => [
        'title' => 'Helpdesk',
    ],
];
