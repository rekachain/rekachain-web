<?php

namespace App\Support\Enums;

enum IntentEnum: string {
    case API_USER_UPDATE_PASSWORD = 'api.user.update.password';

    case WEB_PROJECT_GET_TRAINSETS = 'web.project.show.project';

    case WEB_PROJECT_ADD_TRAINSET = 'web.project.add.trainset';
}