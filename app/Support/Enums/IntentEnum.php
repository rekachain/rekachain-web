<?php

namespace App\Support\Enums;

enum IntentEnum: string {
    case API_USER_UPDATE_PASSWORD = 'api.user.update.password';

    case API_PANEL_IMPORT_PANEL = 'api.panel.import.panel';

    case WEB_PROJECT_GET_TRAINSETS = 'web.project.show.project';

    case WEB_PROJECT_ADD_TRAINSET = 'web.project.add.trainset';

    case WEB_PROJECT_CHANGE_TRAINSET_PRESET = 'web.project.change.trainset.preset';

    case WEB_PROJECT_SAVE_TRAINSET_PRESET = 'web.project.save.trainset.preset';

    case WEB_TRAINSET_DELETE_CARRIAGE_TRAINSET = 'web.trainset.delete.carriage.trainset';

    case WEB_TRAINSET_ADD_CARRIAGE_TRAINSET = 'web.trainset.add.carriage.trainset';

    case WEB_TRAINSET_UPDATE_CARRIAGE_TRAINSET = 'web.trainset.update.carriage.trainset';

    case WEB_CARRIAGE_TRAINSET_ADD_CARRIAGE_PANEL = 'web.carriage.trainset.add.carriage.panel';

    case WEB_PANEL_GET_TEMPLATE_IMPORT_PANEL = 'web.panel.get.template.import.panel';

    case WEB_PANEL_IMPORT_PANEL = 'web.panel.import.panel';

}
