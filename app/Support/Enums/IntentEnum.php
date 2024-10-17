<?php

namespace App\Support\Enums;

enum IntentEnum: string
{
    case API_USER_UPDATE_PASSWORD = 'api.user.update.password';

    case API_PANEL_IMPORT_PANEL = 'api.panel.import.panel';

    case API_TRAINSET_ATTACHMENT_GET_ATTACHMENTS = 'api.trainset.attachment.get.attachments';

    case API_TRAINSET_ATTACHMENT_GET_ATTACHMENTS_BY_CURRENT_USER = 'api.trainset.attachment.get.attachments.by.current.user';

    case API_TRAINSET_ATTACHMENT_GET_ATTACHMENTS_BY_STATUS = 'api.trainset.attachment.get.attachments.by.status';

    case API_TRAINSET_ATTACHMENT_GET_ATTACHMENTS_BY_STATUS_AND_CURRENT_USER = 'api.trainset.attachment.get.attachments.by.status.and.current.user';

    case API_TRAINSET_ATTACHMENT_GET_ATTACHMENT_DETAILS = 'api.trainset.attachment.get.attachment.details';

    case API_TRAINSET_ATTACHMENT_GET_ATTACHMENT_DETAILS_WITH_MATERIALS = 'api.trainset.attachment.get.attachment.details.with.materials';

    case API_TRAINSET_ATTACHMENT_GET_ATTACHMENT_DETAILS_WITH_QR = 'api.trainset.attachment.get.attachment.details.with.qr';

    case API_TRAINSET_ATTACHMENT_GET_ATTACHMENT_MATERIALS = 'api.trainset.attachment.get.attachment.materials';

    case API_TRAINSET_ATTACHMENT_GET_ATTACHMENT_PROGRESS = 'api.trainset.attachment.get.attachment.progress';

    case API_TRAINSET_ATTACHMENT_UPDATE_ASSIGN_SPV_AND_RECEIVER = 'api.trainset.attachment.update.assign.spv.and.receiver';

    case API_TRAINSET_ATTACHMENT_COMPONENT_GET_COMPONENT_DETAILS = 'api.trainset.attachment.component.get.component.details';

    case API_TRAINSET_ATTACHMENT_CONFIRM_KPM_BY_SPV = 'api.trainset.attachment.confirm.kpm.by.spv';

    case API_TRAINSET_ATTACHMENT_ASSIGN_WORKER = 'api.trainset.attachment.assign.worker';

    case API_PANEL_ATTACHMENT_GET_ATTACHMENTS = 'api.panel.attachment.get.attachments';

    case API_PANEL_ATTACHMENT_GET_ATTACHMENTS_BY_CURRENT_USER = 'api.panel.attachment.get.attachments.by.current.user';

    case API_PANEL_ATTACHMENT_GET_ATTACHMENTS_BY_STATUS = 'api.panel.attachment.get.attachments.by.status';

    case API_PANEL_ATTACHMENT_GET_ATTACHMENTS_BY_STATUS_AND_CURRENT_USER = 'api.panel.attachment.get.attachments.by.status.and.current.user';

    case API_PANEL_ATTACHMENT_GET_ATTACHMENT_DETAILS = 'api.panel.attachment.get.attachment.details';

    case API_PANEL_ATTACHMENT_GET_ATTACHMENT_MATERIALS = 'api.panel.attachment.get.attachment.materials';

    case API_PANEL_ATTACHMENT_GET_ATTACHMENT_PROGRESS = 'api.panel.attachment.get.attachment.progress';

    case API_PANEL_ATTACHMENT_GET_ATTACHMENT_DETAILS_WITH_MATERIALS = 'api.panel.attachment.get.attachment.details.with.materials';

    case API_PANEL_ATTACHMENT_GET_ATTACHMENT_DETAILS_WITH_QR = 'api.panel.attachment.get.attachment.details.with.qr';

    case API_PANEL_ATTACHMENT_GET_ATTACHMENT_SERIAL_NUMBER = 'api.panel.attachment.get.attachment.serial.number';

    case API_PANEL_ATTACHMENT_GET_ATTACHMENT_SERIAL_NUMBERS = 'api.panel.attachment.get.attachment.serial.numbers';

    case API_PANEL_ATTACHMENT_GET_ATTACHMENT_SERIAL_NUMBER_DETAILS = 'api.panel.attachment.get.attachment.serial.number.details';

    case API_PANEL_ATTACHMENT_GET_ATTACHMENT_SERIAL_NUMBER_DETAILS_WITH_QR = 'api.panel.attachment.get.attachment.serial.number.details.with.qr';

    case API_PANEL_ATTACHMENT_CONFIRM_KPM_BY_SPV = 'api.panel.attachment.confirm.kpm.by.spv';
    
    case API_PANEL_ATTACHMENT_UPDATE_ASSIGN_SPV_AND_RECEIVER = 'api.panel.attachment.update.assign.spv.and.receiver';

    case API_PANEL_ATTACHMENT_REJECT_KPM = 'api.panel.attachment.reject.kpm';

    case API_DETAIL_WORKER_PANEL_GET_PANELS = 'api.detail.worker.panel.get.panels';

    case API_DETAIL_WORKER_PANEL_GET_PANEL_DETAILS = 'api.detail.worker.panel.get.panel.details';

    case API_DETAIL_WORKER_PANELS_GET_ALL_REQUEST_WORKER = 'api.detail.worker.panels.get.all.request.worker';

    case API_DETAIL_WORKER_PANEL_STORE_AND_CHECK = 'api.detail.worker.panel.store.and.check';

    case API_DETAIL_WORKER_PANEL_ASSIGN_REQUEST_WORKER = 'api.detail.worker.panel.request.assign.worker';

    case API_DETAIL_WORKER_PANELS_BY_STATUS = 'api.detail.worker.panels.by.status';

    case API_DETAIL_WORKER_PANELS_BY_CURRENT_USER = 'api.detail.worker.panels.by.current.user';

    case API_DETAIL_WORKER_PANELS_BY_STATUS_AND_CURRENT_USER = 'api.detail.worker.panels.by.status.and.current.user';

    case API_DETAIL_WORKER_PANEL_ACCEPT_WORK_WITH_IMAGE = 'api.detail.worker.panel.accept.work.with.image';

    case API_DETAIL_WORKER_TRAINSET_GET_TRAINSETS = 'api.detail.worker.trainset.get.trainsets';

    case API_DETAIL_WORKER_TRAINSET_GET_TRAINSET_DETAILS = 'api.detail.worker.trainset.get.trainset.details';

    case API_DETAIL_WORKER_TRAINSET_ASSIGN_REQUEST_WORKER = 'api.detail.worker.trainset.assign.request.worker';

    case API_DETAIL_WORKER_TRAINSETS_BY_STATUS = 'api.detail.worker.trainset.by.status';

    case API_DETAIL_WORKER_TRAINSETS_BY_CURRENT_USER = 'api.detail.worker.trainsets.by.current.user';

    case API_DETAIL_WORKER_TRAINSETS_BY_STATUS_AND_CURRENT_USER = 'api.detail.worker.trainsets.by.status.and.current.user';

    case API_DETAIL_WORKER_TRAINSETS_GET_ALL_REQUEST_WORKER = 'api.detail.worker.trainsets.get.all.request.worker';

    case API_DETAIL_WORKER_TRAINSET_GET_WORK_DETAILS = 'api.detail.worker.trainset.get.work.details';

    case API_DETAIL_WORKER_TRAINSET_REJECT_WORK = 'api.detail.worker.trainset.reject.work';

    case API_DETAIL_WORKER_TRAINSET_ACCEPT_WORK_WITH_IMAGE = 'api.detail.worker.trainset.accept.work.with.image';
    
    case API_SERIAL_PANEL_UPDATE_WORKER_PANEL = 'api.serial.panel.update.worker.panel';

    case API_SERIAL_PANEL_UPDATE_PANEL_MANUFACTURE_STATUS = 'api.serial.panel.manufacture.status';

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