<?php

namespace App\Support\Enums;

enum IntentEnum: string {
    case API_USER_UPDATE_PASSWORD = 'api.user.update.password';

    case WEB_PROJECT_SHOW_PROJECT = 'web.project.show.project';
}
