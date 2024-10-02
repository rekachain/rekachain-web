<?php

namespace App\Support\Enums;

enum IntentEnum: string {
    case API_USER_UPDATE_PASSWORD = 'api.user.update.password';

    case API_PANEL_IMPORT_PANEL = 'api.panel.import.panel';

    case API_PANEL_ATTACHMENT_GET_ATTACHMENTS_BY_PROCESS = 'api.panel.attachment.get.attachments.by.process';

    case API_PANEL_ATTACHMENT_GET_ATTACHMENTS_BY_DONE = 'api.panel.attachment.get.attachments.by.done';

    case API_PANEL_ATTACHMENT_GET_ATTACHMENT_DETAILS = 'api.panel.attachment.get.attachment.details';

    case API_PANEL_ATTACHMENT_GET_ATTACHMENT_DETAILS_WITH_QR = 'api.panel.attachment.get.attachment.details.with.qr';

    case API_PANEL_ATTACHMENT_GET_ATTACHMENT_SERIAL_NUMBER = 'api.panel.attachment.get.attachment.serial.number';

    case API_PANEL_ATTACHMENT_GET_ATTACHMENT_SERIAL_NUMBERS = 'api.panel.attachment.get.attachment.serial.numbers';

    case API_PANEL_ATTACHMENT_GET_ATTACHMENT_SERIAL_NUMBER_DETAILS = 'api.panel.attachment.get.attachment.serial.number.details';

    case API_PANEL_ATTACHMENT_GET_ATTACHMENT_SERIAL_NUMBER_DETAILS_WITH_QR = 'api.panel.attachment.get.attachment.serial.number.details.with.qr';
    case API_TRAINSET_ATTACHMENT_GET_ATTACHMENTS_BY_PROCESS = 'api.trainset.attachment.get.attachments.by.process';

    case API_TRAINSET_ATTACHMENT_GET_ATTACHMENTS_BY_DONE = 'api.trainset.attachment.get.attachments.by.done';

    case API_TRAINSET_ATTACHMENT_GET_ATTACHMENT_DETAILS = 'api.trainset.attachment.get.attachment.details';

    case API_TRAINSET_ATTACHMENT_GET_ATTACHMENT_DETAILS_WITH_QR = 'api.trainset.attachment.get.attachment.details.with.qr';

    case API_TRAINSET_ATTACHMENT_GET_ATTACHMENT_SERIAL_NUMBER = 'api.trainset.attachment.get.attachment.serial.number';

    case API_TRAINSET_ATTACHMENT_GET_ATTACHMENT_SERIAL_NUMBERS = 'api.trainset.attachment.get.attachment.serial.numbers';

    case API_TRAINSET_ATTACHMENT_GET_ATTACHMENT_SERIAL_NUMBER_DETAILS = 'api.trainset.attachment.get.attachment.serial.number.details';

    case API_TRAINSET_ATTACHMENT_GET_ATTACHMENT_SERIAL_NUMBER_DETAILS_WITH_QR = 'api.trainset.attachment.get.attachment.serial.number.details.with.qr';

    case API_DETAIL_WORKER_PANEL_GET_PANELS = 'api.detail.worker.panel.get.panels';
    
    case API_DETAIL_WORKER_PANEL_GET_PANEL_DETAILS = 'api.detail.worker.panel.get.panel.details';

    case API_TRAINSET_ATTACHMENT_GET_ATTACHMENTS = 'api.trainset.attachment.get.attachments';

    case API_DETAIL_WORKER_PANEL_ASSIGN_WORKER = 'api.detail.worker.panel.assign.worker';
    
    case API_DETAIL_WORKER_PANEL_ACCEPT_ASSIGN_WORKER = 'api.detail.worker.panel.accept.assign.worker';
    
    case API_DETAIL_WORKER_PANEL_DECLINE_ASSIGN_WORKER = 'api.detail.worker.panel.decline.assign.worker';

    case API_DETAIL_WORKER_PANEL_GET_DETAIL_BY_PROCESS = 'api.detail.worker.panel.get.detail.by.process';
    
    case API_DETAIL_WORKER_PANEL_GET_DETAIL_BY_DONE = 'api.detail.worker.panel.get.detail.by.done';

    // case API_DETAIL_WORKER_PANEL_GET_PANELS = 'api.detail.worker.panel.get.panels';
    
    // case API_DETAIL_WORKER_PANEL_GET_PANEL_DETAILS = 'api.detail.worker.panel.get.panel.details';

    // case API_TRAINSET_ATTACHMENT_GET_ATTACHMENTS = 'api.trainset.attachment.get.attachments';

    // case API_DETAIL_WORKER_PANEL_ASSIGN_WORKER = 'api.detail.worker.panel.assign.worker';
    
    // case API_DETAIL_WORKER_PANEL_ACCEPT_ASSIGN_WORKER = 'api.detail.worker.panel.accept.assign.worker';
    
    // case API_DETAIL_WORKER_PANEL_DECLINE_ASSIGN_WORKER = 'api.detail.worker.panel.decline.assign.worker';

    // case API_DETAIL_WORKER_PANEL_GET_DETAIL_BY_PROCESS = 'api.detail.worker.panel.get.detail.by.process';
    
    // case API_DETAIL_WORKER_PANEL_GET_DETAIL_BY_DONE = 'api.detail.worker.panel.get.detail.by.done';

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

    case WEB_RAW_MATERIAL_GET_TEMPLATE_IMPORT_RAW_MATERIAL = 'web.raw.material.get.template.import.raw.material';

    case WEB_RAW_MATERIAL_IMPORT_RAW_MATERIAL = 'web.raw.material.import.raw.material';

    case WEB_CARRIAGE_GET_TEMPLATE_IMPORT_CARRIAGE = 'web.carriage.get.template.import.carriage';

    case WEB_CARRIAGE_IMPORT_CARRIAGE = 'web.carriage.import.carriage';

    case WEB_TRAINSET_GET_TEMPLATE_IMPORT_TRAINSET = 'web.trainset.get.template.import.trainset';

    case WEB_TRAINSET_IMPORT_TRAINSET = 'web.trainset.import.trainset';

    case WEB_COMPONENT_GET_TEMPLATE_IMPORT_COMPONENT = 'web.component.get.template.import.component';

    case WEB_COMPONENT_IMPORT_COMPONENT = 'web.component.import.component';

    case WEB_PROGRESS_GET_TEMPLATE_IMPORT_PROGRESS = 'web.progress.get.template.import.progress';

    case WEB_PROGRESS_IMPORT_PROGRESS = 'web.progress.import.progress';

    case WEB_STEP_GET_TEMPLATE_IMPORT_STEP = 'web.step.get.template.import.step';

    case WEB_STEP_IMPORT_STEP = 'web.step.import.step';

    case WEB_TRAINSET_GENERATE_PANEL_ATTACHMENTS = 'web.trainset.generate.panel.attachments';

    case WEB_TRAINSET_GENERATE_TRAINSET_ATTACHMENTS = 'web.trainset.generate.trainset.attachments';

    case WEB_TRAINSET_GET_COMPONENTS = 'web.trainset.get.components';

    case WEB_PANEL_ATTACHMENT_GET_PANEL_MATERIALS = 'web.panel.attachment.get.panel.materials';

}