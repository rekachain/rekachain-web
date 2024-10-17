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
            'title' => 'Edit Work Day :name',
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
        'title' => 'Divisions',
    ],
    'workshops' => [
        'title' => 'Workshops',
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
