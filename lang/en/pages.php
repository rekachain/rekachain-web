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
        'title' => 'Workstations',
    ],
    'staff' => [
        'title' => 'Staff',
    ],
    'access_control' => [
        'title' => 'Access Control',
    ],
    'permissions' => [
        'title' => 'Permissions',
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
