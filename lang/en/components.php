<?php

return [
    'navbar' => [
        'toggle_dark_mode' => [
            'title' => 'Toggle Dark Mode',
        ],
        'download_app' => [
            'title' => 'Download App',
        ],
        'view_manual_book' => [
            'title' => 'View Manual Book',
        ],
        'search' => [
            'placeholder' => 'Search...',
        ],
        'localization' => [
            'title' => 'Language',
        ],
        'notification' => [
            'title' => 'Notifications',
            'empty' => 'You have no notifications, enjoy your day',
        ],
        'profile' => [
            'title' => 'My Account',
            'menus' => [
                'profile' => 'Profile',
                'logout' => 'Logout',
            ],
        ],
    ],
    'sidebar' => [
        'menus' => [
            'general' => 'General',
            'manufacturing' => 'Manufacturing',
            'support' => 'Support',
        ],
        'links' => [
            'dashboard' => 'Dashboard',
            'work_days' => 'Work Days',
            'staff_management' => 'Staff Management',
            'divisions' => 'Divisions',
            'workshops' => 'Workshops',
            'workstations' => 'Workstations',
            'staff' => 'Staff',
            'access_control' => 'Access Control',
            'permissions' => 'Permissions',
            'roles' => 'Roles',
            'steps' => 'List Steps',
            'raw_materials' => 'List Raw Materials',
            'components' => 'List Components',
            'panels' => 'List Panels',
            'projects' => 'List Projects',
            'carriages' => 'List Carriages',
            'settings' => 'Settings',
            'feedback' => 'Feedback',
            'helpdesk' => 'Helpdesk',
        ],
    ],
    'sidebar_logout' => [
        'title' => 'Are you sure you want to logout?',
        'description' => 'Press "Logout" below if you are ready to end your current session.',
        'buttons' => [
            'back' => 'Back',
            'logout' => 'Logout',
        ],
    ],
    'feedback' => [
        'title' => 'Feedback',
        'description' => 'Your feedback is important to us. We value and consider every suggestion and feedback.',
        'fields' => [
            'name' => 'Name',
            'name_placeholder' => 'Your name...',
            'email' => 'Email',
            'email_placeholder' => 'Your email...',
            'rating' => 'Rating',
            'message' => 'Message',
            'message_placeholder' => 'Your feedback message...',
        ],
    ],
    'generic_data_selector' => [
        'fields' => [
            'search_placeholder' => 'Search...',
            'select_placeholder' => 'Select',
        ],
        'actions' => [
            'clear_selection' => '-- Clear Selection --',
            'loading' => 'Loading...',
            'no_results' => 'No results found',
        ],
    ],
    'generic_filters' => [
        'fields' => [
            'search_placeholder' => 'Search...',
            'select_placeholder' => 'Select',
            'pagination_placeholder' => 'Items per page',
        ],
    ],
    'sidebar_helpdesk' => [
        'messages' => [
            'created' => 'Helpdesk contact created successfully.',
            'updated' => 'Helpdesk contact updated successfully.',
        ],
        'dialogs' => [
            'messages' => [
                'no_email' => 'No email available.',
                'no_notice' => 'No notice available.',
                'no_phone' => 'No phone number available.',
                'no_helpdesk_contact' => 'No helpdesk contact available.',
            ],
            'headers' => [
                'contact' => 'Contact Information',
                'email' => 'Email :',
                'phone_number' => 'Phone Number :',
                'notice' => 'Notice :',
            ],
            'title' => 'Helpdesk Contact',
            'edit_title' => 'Edit Helpdesk Contact',
            'create_title' => 'Create Helpdesk Contact',
            'fields' => [
                'email' => 'Email',
                'phone_number' => 'Phone Number',
                'notice' => 'Notice',
            ],
            'buttons' => [
                'create_first_helpdesk_contact' => 'Create First Helpdesk Contact',
            ],
        ],
    ],
];
