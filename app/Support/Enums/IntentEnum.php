<?php

namespace App\Support\Enums;

enum IntentEnum: string {
    // To determine if current delete request is soft delete or hard delete (can be used in every model)
    case SOFT_DELETE_ENTRY = 'soft.delete.entry';

    case STORE_APK_FILE = 'store.apk.file';

    case STORE_MANUAL_BOOK_FILE = 'store.manual.book.file';

    case DOWNLOAD_APK_FILE = 'download.apk.file';

    case DOWNLOAD_MANUAL_BOOK_FILE = 'download.manual.book.file';

    case API_USER_UPDATE_PASSWORD = 'api.user.update.password';

    case API_PROJECT_IMPORT_PROJECT_TEMPLATE = 'api.project.import.project.template';

    case API_PANEL_IMPORT_PANEL = 'api.panel.import.panel';

    case API_TRAINSET_ATTACHMENT_GET_ATTACHMENTS = 'api.trainset.attachment.get.attachments';

    case API_TRAINSET_ATTACHMENT_GET_ATTACHMENTS_BY_CURRENT_USER = 'api.trainset.attachment.get.attachments.by.current.user';

    case API_TRAINSET_ATTACHMENT_GET_ATTACHMENTS_BY_STATUS = 'api.trainset.attachment.get.attachments.by.status';

    case API_TRAINSET_ATTACHMENT_GET_ATTACHMENTS_BY_STATUS_AND_CURRENT_USER = 'api.trainset.attachment.get.attachments.by.status.and.current.user';

    case API_TRAINSET_ATTACHMENT_GET_ATTACHMENT_DETAILS = 'api.trainset.attachment.get.attachment.details';

    case API_TRAINSET_ATTACHMENT_GET_ATTACHMENT_DETAILS_WITH_MATERIALS = 'api.trainset.attachment.get.attachment.details.with.materials';

    case API_TRAINSET_ATTACHMENT_GET_ATTACHMENT_DETAILS_WITH_QR = 'api.trainset.attachment.get.attachment.details.with.qr';

    case API_TRAINSET_ATTACHMENT_GET_ATTACHMENT_COMPONENTS = 'api.trainset.attachment.get.attachment.components';

    case API_TRAINSET_ATTACHMENT_GET_ATTACHMENT_REQUIRED_COMPONENTS = 'api.trainset.attachment.get.attachment.required.components';

    case API_TRAINSET_ATTACHMENT_GET_ATTACHMENT_MATERIALS = 'api.trainset.attachment.get.attachment.materials';

    case API_TRAINSET_ATTACHMENT_GET_ATTACHMENT_PROGRESS = 'api.trainset.attachment.get.attachment.progress';

    case API_TRAINSET_ATTACHMENT_UPDATE_ATTACHMENT_STATUS = 'api.trainset.attachment.update.attachment.status';

    case API_TRAINSET_ATTACHMENT_UPDATE_ASSIGN_SPV_AND_RECEIVER = 'api.trainset.attachment.update.assign.spv.and.receiver';

    case API_TRAINSET_ATTACHMENT_COMPONENT_GET_COMPONENT_DETAILS = 'api.trainset.attachment.component.get.component.details';

    case API_TRAINSET_ATTACHMENT_CONFIRM_KPM_BY_SPV = 'api.trainset.attachment.confirm.kpm.by.spv';

    case API_TRAINSET_ATTACHMENT_ASSIGN_WORKER_COMPONENT = 'api.trainset.attachment.assign.worker.component';

    case API_TRAINSET_ATTACHMENT_ASSIGN_HANDLER = 'api.trainset.attachment.assign.handler';

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

    case API_PANEL_ATTACHMENT_UPDATE_ATTACHMENT_STATUS = 'api.panel.attachment.update.attachment.status';

    case API_PANEL_ATTACHMENT_UPDATE_ASSIGN_SPV_AND_RECEIVER = 'api.panel.attachment.update.assign.spv.and.receiver';

    case API_PANEL_ATTACHMENT_REJECT_KPM = 'api.panel.attachment.reject.kpm';

    case API_PANEL_ATTACHMENT_ASSIGN_HANDLER = 'api.panel.attachment.assign.handler';

    case API_DETAIL_WORKER_PANEL_GET_PANELS = 'api.detail.worker.panel.get.panels';

    case API_DETAIL_WORKER_PANEL_GET_PANEL_DETAILS = 'api.detail.worker.panel.get.panel.details';

    case API_DETAIL_WORKER_PANEL_GET_WORK_DETAILS = 'api.detail.worker.panel.get.work.details';

    case API_DETAIL_WORKER_PANELS_GET_ALL_WORK_DETAIL = 'api.detail.worker.panels.get.all.work.detail';

    case API_DETAIL_WORKER_PANELS_GET_ALL_REQUEST_WORKER = 'api.detail.worker.panels.get.all.request.worker';

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

    case API_DETAIL_WORKER_TRAINSETS_GET_ALL_WORK_DETAIL = 'api.detail.worker.trainsets.get.all.work.detail';

    case API_DETAIL_WORKER_TRAINSETS_GET_ALL_REQUEST_WORKER = 'api.detail.worker.trainsets.get.all.request.worker';

    case API_DETAIL_WORKER_TRAINSET_GET_WORK_DETAILS = 'api.detail.worker.trainset.get.work.details';

    case API_DETAIL_WORKER_TRAINSET_REJECT_WORK = 'api.detail.worker.trainset.reject.work';

    case API_DETAIL_WORKER_TRAINSET_ACCEPT_WORK_WITH_IMAGE = 'api.detail.worker.trainset.accept.work.with.image';

    case API_SERIAL_PANEL_UPDATE_ASSIGN_WORKER_PANEL = 'api.serial.panel.update.assign.worker.panel';

    case API_SERIAL_PANEL_UPDATE_PANEL_MANUFACTURE_STATUS = 'api.serial.panel.update.panel.manufacture.status';

    case API_RETURNED_PRODUCT_GET_ALL_RETURNED_PRODUCTS = 'api.returned.product.get.all.returned.products';

    case API_RETURNED_PRODUCT_GET_RETURNED_PRODUCT_DETAILS = 'api.returned.product.get.returned.product.details';

    case API_RETURNED_PRODUCT_GET_ATTACHMENT_SERIAL_NUMBER_DETAILS_WITH_QR = 'api.returned.product.get.attachment.serial.number.details.with.qr';

    case API_RETURNED_PRODUCT_GET_PRODUCT_PROBLEMS = 'api.returned.product.get.product.problems';

    case API_RETURNED_PRODUCT_ADD_RETURNED_PRODUCT_WITH_NOTE = 'api.returned.product.add.returned.product.with.note';

    case API_RETURNED_PRODUCT_CREATE_PRODUCT_PROBLEM = 'api.returned.product.create.product.problem';

    case API_RETURNED_PRODUCT_UPDATE_RETURNED_PRODUCT_WITH_NOTE = 'api.returned.product.update.returned.product.with.note';

    case API_PRODUCT_PROBLEM_UPDATE_PRODUCT_PROBLEM_WITH_NOTE = 'api.product.problem.update.product.problem.with.note';

    case WEB_PROJECT_GET_ALL_TRAINSET_COMPONENTS = 'web.project.get.all.trainset.components';

    case WEB_PROJECT_GET_ALL_TRAINSET_COMPONENTS_WITH_QTY = 'web.project.get.all.trainset.components.with.qty';

    case WEB_PROJECT_GET_ALL_TRAINSET_PANELS = 'web.project.get.all.trainset.panels';

    case WEB_PROJECT_GET_ALL_TRAINSET_PANELS_WITH_QTY = 'web.project.get.all.trainset.panels.with.qty';

    case WEB_PROJECT_GET_ALL_CARRIAGES = 'web.project.get.all.carriages';

    case WEB_PROJECT_GET_ALL_CARRIAGES_WITH_QTY = 'web.project.get.all.carriages.with.qty';

    case WEB_PROJECT_GET_ALL_CARRIAGE_COMPONENTS = 'web.project.get.all.carriage.components';

    case WEB_PROJECT_GET_ALL_CARRIAGE_COMPONENTS_WITH_QTY = 'web.project.get.all.carriage.components.with.qty';

    case WEB_PROJECT_GET_ALL_CARRIAGE_PANELS = 'web.project.get.all.carriage.panels';

    case WEB_PROJECT_GET_ALL_CARRIAGE_PANELS_WITH_QTY = 'web.project.get.all.carriage.panels.with.qty';

    case WEB_PROJECT_GET_ALL_PANELS = 'web.project.get.all.panels';

    case WEB_PROJECT_GET_ALL_PANELS_WITH_QTY = 'web.project.get.all.panels.with.qty';

    case WEB_PROJECT_GET_ALL_COMPONENTS = 'web.project.get.all.components';

    case WEB_PROJECT_GET_ALL_COMPONENTS_WITH_QTY = 'web.project.get.all.components.with.qty';

    case WEB_PROJECT_ADD_TRAINSET = 'web.project.add.trainset';

    case WEB_PROJECT_CHANGE_TRAINSET_PRESET = 'web.project.change.trainset.preset';

    case WEB_PROJECT_SAVE_TRAINSET_PRESET = 'web.project.save.trainset.preset';

    case WEB_PROJECT_IMPORT_PROJECT_TEMPLATE = 'web.project.import.project.template';

    case WEB_PROJECT_UPDATE_INITIAL_DATE = 'web.project.update.initial.date';

    case WEB_PROJECT_GET_COMPONENTS = 'web.project.get.components';

    case WEB_PROJECT_GET_PANELS = 'web.project.get.panels';

    case WEB_TRAINSET_DELETE_CARRIAGE_TRAINSET = 'web.trainset.delete.carriage.trainset';

    case WEB_TRAINSET_ADD_CARRIAGE_TRAINSET = 'web.trainset.add.carriage.trainset';

    case WEB_TRAINSET_GET_ALL_COMPONENTS = 'web.trainset.get.all.components';

    case WEB_TRAINSET_GET_ALL_COMPONENTS_PROGRESS = 'web.trainset.get.all.components.progress';

    case WEB_TRAINSET_GET_ALL_COMPONENTS_WITH_QTY = 'web.trainset.get.all.components.with.qty';

    case WEB_TRAINSET_GET_ALL_PANELS = 'web.trainset.get.all.panels';

    case WEB_TRAINSET_GET_ALL_PANELS_PROGRESS = 'web.trainset.get.all.panels.progress';

    case WEB_TRAINSET_GET_ALL_PANELS_WITH_QTY = 'web.trainset.get.all.panels.with.qty';

    case WEB_TRAINSET_UPDATE_CARRIAGE_TRAINSET = 'web.trainset.update.carriage.trainset';

    case WEB_CARRIAGE_TRAINSET_ADD_CARRIAGE_PANEL = 'web.carriage.trainset.add.carriage.panel';

    case WEB_CARRIAGE_PANEL_GET_PANEL_PROGRESS = 'web.carriage.panel.get.panel.progress';

    case WEB_CARRIAGE_PANEL_ADD_COMPONENT = 'web.carriage.panel.add.component';

    case WEB_CARRIAGE_PANEL_ADD_RAW_MATERIAL = 'web.carriage.panel.add.raw.material';

    case WEB_CARRIAGE_PANEL_CHANGE_PROGRESS = 'web.carriage.panel.change.progress';

    case WEB_CARRIAGE_PANEL_IMPORT_PROGRESS_AND_MATERIAL = 'web.carriage.panel.import.progress.and.material';

    case WEB_CARRIAGE_PANEL_COMPONENT_ADD_RAW_MATERIAL = 'web.carriage.panel.component.add.raw.material';

    case WEB_CARRIAGE_PANEL_COMPONENT_IMPORT_PROGRESS_AND_MATERIAL = 'web.carriage.panel.component.import.progress.and.material';

    case WEB_CARRIAGE_PANEL_COMPONENT_CHANGE_PROGRESS = 'web.carriage.panel.component.change.progress';

    case WEB_PANEL_GET_TEMPLATE_IMPORT_PANEL = 'web.panel.get.template.import.panel';

    case WEB_PANEL_GET_PANEL_MATERIAL_AND_PROGRESS_TEMPLATE = 'web.panel.get.panel.material.and.progress.template';

    case WEB_PANEL_IMPORT_PANEL = 'web.panel.import.panel';

    case WEB_PROJECT_IMPORT_PANEL_PROGRESS_AND_MATERIAL = 'web.project.import.panel.progress.and.material';

    case WEB_PROJECT_IMPORT_COMPONENT_PROGRESS_AND_MATERIAL = 'web.project.import.component.progress.and.material';

    case WEB_PROJECT_IMPORT_TRAINSET_PANEL_PROGRESS_AND_MATERIAL = 'web.project.import.trainset.panel.progress.and.material';

    case WEB_PROJECT_IMPORT_TRAINSET_COMPONENT_PROGRESS_AND_MATERIAL = 'web.project.import.trainset.component.progress.and.material';

    case WEB_PROJECT_IMPORT_CARRIAGE_PANEL_PROGRESS_AND_MATERIAL = 'web.project.import.carriage.panel.progress.and.material';

    case WEB_PROJECT_IMPORT_CARRIAGE_COMPONENT_PROGRESS_AND_MATERIAL = 'web.project.import.carriage.component.progress.and.material';

    case WEB_RAW_MATERIAL_GET_TEMPLATE_IMPORT_RAW_MATERIAL = 'web.raw.material.get.template.import.raw.material';

    case WEB_RAW_MATERIAL_IMPORT_RAW_MATERIAL = 'web.raw.material.import.raw.material';

    case WEB_CARRIAGE_GET_TEMPLATE_IMPORT_CARRIAGE = 'web.carriage.get.template.import.carriage';

    case WEB_CARRIAGE_IMPORT_CARRIAGE = 'web.carriage.import.carriage';

    case WEB_TRAINSET_GET_PANEL_MATERIALS_WITH_QTY = 'web.trainset.get.panel.materials.with.qty';

    case WEB_TRAINSET_GET_COMPONENT_MATERIALS_WITH_QTY = 'web.trainset.get.component.materials.with.qty';

    case WEB_TRAINSET_GET_TEMPLATE_IMPORT_TRAINSET = 'web.trainset.get.template.import.trainset';

    case WEB_TRAINSET_IMPORT_TRAINSET = 'web.trainset.import.trainset';

    case WEB_TRAINSET_EXPORT_SERIAL_NUMBERS = 'web.trainset.export.serial.numbers';

    case WEB_COMPONENT_GET_TEMPLATE_IMPORT_COMPONENT = 'web.component.get.template.import.component';

    case WEB_COMPONENT_GET_COMPONENT_MATERIAL_AND_PROGRESS_TEMPLATE = 'web.component.get.component.material.and.progress.template';

    case WEB_COMPONENT_IMPORT_COMPONENT = 'web.component.import.component';

    case WEB_PROGRESS_GET_TEMPLATE_IMPORT_PROGRESS = 'web.progress.get.template.import.progress';

    case WEB_PROGRESS_IMPORT_PROGRESS = 'web.progress.import.progress';

    case WEB_PROGRESS_CREATE_STEP = 'web.progress.create.step';

    case WEB_STEP_GET_TEMPLATE_IMPORT_STEP = 'web.step.get.template.import.step';

    case WEB_STEP_IMPORT_STEP = 'web.step.import.step';

    case WEB_TRAINSET_GENERATE_PANEL_ATTACHMENTS = 'web.trainset.generate.panel.attachments';

    case WEB_TRAINSET_GENERATE_TRAINSET_ATTACHMENTS = 'web.trainset.generate.trainset.attachments';

    case WEB_TRAINSET_GET_COMPONENTS = 'web.trainset.get.components';

    case WEB_TRAINSET_GET_PANEL_PROGRESS = 'web.trainset.get.panel.progress';

    case WEB_TRAINSET_GET_PANEL_PROGRESS_WITH_WORKER_STEPS = 'web.trainset.get.panel.progress.with.worker.steps';

    case WEB_TRAINSET_ATTACHMENT_GET_ATTACHMENT_HANDLERS = 'web.trainset.attachment.get.attachment.handlers';

    case WEB_TRAINSET_ATTACHMENT_GET_ATTACHMENT_PROGRESS = 'web.trainset.attachment.get.attachment.progress';

    case WEB_TRAINSET_ATTACHMENT_GET_ATTACHMENT_PROGRESS_WITH_WORKER_STEPS = 'web.trainset.attachment.get.attachment.progress.with.worker.steps';

    case WEB_TRAINSET_ATTACHMENT_GET_ATTACHMENT_COMPONENTS = 'web.trainset.attachment.get.attachment.components';

    case WEB_TRAINSET_ATTACHMENT_GET_COMPONENT_MATERIALS = 'web.trainset.attachment.get.component.materials';

    case WEB_TRAINSET_ATTACHMENT_GET_COMPONENT_MATERIALS_WITH_QTY = 'web.trainset.attachment.get.component.materials.with.qty';

    case WEB_TRAINSET_ATTACHMENT_GET_CUSTOM_ATTACHMENT_MATERIAL_IMPORT_TEMPLATE = 'web.trainset.attachment.get.custom.attachment.material.import.template';

    case WEB_TRAINSET_ATTACHMENT_ASSIGN_REFERENCED_ATTACHMENT = 'web.trainset.attachment.assign.referenced.attachment';

    case WEB_TRAINSET_ATTACHMENT_ASSIGN_CUSTOM_ATTACHMENT_MATERIAL = 'web.trainset.attachment.assign.custom.attachment.material';

    case WEB_TRAINSET_ATTACHMENT_ASSIGN_REFERENCED_ATTACHMENT_AND_MATERIAL_IMPORT = 'web.trainset.attachment.assign.referenced.attachment.and.material.import';

    case WEB_PANEL_ATTACHMENT_GET_PANEL = 'web.panel.attachment.get.panel';

    case WEB_PANEL_ATTACHMENT_GET_SERIAL_PANELS = 'web.panel.attachment.get.serial.panels';

    case WEB_PANEL_ATTACHMENT_GET_ATTACHMENT_HANDLERS = 'web.panel.attachment.get.attachment.handlers';

    case WEB_PANEL_ATTACHMENT_GET_ATTACHMENT_PROGRESS = 'web.panel.attachment.get.attachment.progress';

    case WEB_PANEL_ATTACHMENT_GET_PANEL_WITH_QTY = 'web.panel.attachment.get.panel.with.qty';

    case WEB_TRAINSET_ATTACHMENT_DOWNLOAD_TRAINSET_ATTACHMENT = 'web.trainset.attachment.download.trainset.attachment';

    case WEB_PANEL_ATTACHMENT_DOWNLOAD_PANEL_ATTACHMENT = 'web.panel.attachment.download.panel.attachment';

    case WEB_PANEL_ATTACHMENT_GET_CUSTOM_ATTACHMENT_MATERIAL_IMPORT_TEMPLATE = 'web.panel.attachment.get.custom.attachment.material.import.template';

    case WEB_PANEL_ATTACHMENT_GET_PANEL_MATERIALS = 'web.panel.attachment.get.panel.materials';

    case WEB_PANEL_ATTACHMENT_GET_PANEL_MATERIALS_WITH_QTY = 'web.panel.attachment.get.panel.materials.with.qty';

    case WEB_PANEL_ATTACHMENT_ASSIGN_REFERENCED_ATTACHMENT = 'web.panel.attachment.assign.referenced.attachment';

    case WEB_PANEL_ATTACHMENT_ASSIGN_CUSTOM_ATTACHMENT_MATERIAL = 'web.panel.attachment.assign.custom.attachment.material';

    case WEB_PANEL_ATTACHMENT_ASSIGN_REFERENCED_ATTACHMENT_AND_MATERIAL_IMPORT = 'web.panel.attachment.assign.referenced.attachment.and.material.import';

    case WEB_TRAINSET_ATTACHMENT_GET_COMPONENT_MATERIALS_WITH_QTY_FOR_TEMPLATE = 'web.trainset.attachment.get.component.materials.with.qty.for.template';

    case WEB_RETURNED_PRODUCT_GET_PRODUCT_PROBLEM_COMPONENTS = 'web.returned.product.get.product.problem.components';

    case WEB_RETURNED_PRODUCT_GET_RETURNED_PRODUCT_COMPONENTS = 'web.returned.product.get.returned.product.components';

    case WEB_RETURNED_PRODUCT_ADD_PRODUCT_PROBLEM = 'web.returned.product.add.product.problem';

    case WEB_RETURNED_PRODUCT_ADD_RETURNED_PRODUCT_WITH_NOTE = 'web.returned.product.add.returned.product.with.note';

    case WEB_RETURNED_PRODUCT_ADD_RETURNED_PRODUCT_REQUEST = 'web.returned.product.add.returned.product.request';

    case WEB_RETURNED_PRODUCT_IMPORT_RETURNED_PRODUCT_AND_PRODUCT_PROBLEM = 'web.returned.product.import.returned.product.and.product.problem';

    case WEB_RETURNED_PRODUCT_IMPORT_PRODUCT_PROBLEM = 'web.returned.product.import.product.problem';

    case WEB_RETURNED_PRODUCT_UPDATE_REPLACEMENT_STOCK = 'web.returned.product.update.replacement.stock';

    case WEB_RETURNED_PRODUCT_UPDATE_REPLACEMENT_STOCK_FOR_SCRAP = 'web.returned.product.update.replacement.stock.for.scrap';

    case WEB_REPLACEMENT_STOCK_UPDATE_REPLACEMENT_STOCK_FOR_RETURNED_PRODUCT = 'web.replacement.stock.update.replacement.stock.for.returned.product';

    case WEB_REPLACEMENT_STOCK_UPDATE_REPLACEMENT_STOCK_FROM_RETURNED_PRODUCT = 'web.replacement.stock.update.replacement.stock.from.returned.product';

    case WEB_REPLACEMENT_STOCK_IMPORT_REPLACEMENT_STOCK = 'web.replacement.stock.import.replacement.stock';

    case WEB_REPLACEMENT_STOCK_GET_TEMPLATE_IMPORT_REPLACEMENT_STOCK = 'web.replacement.stock.get.template.import.replacement.stock';

    case WEB_PRODUCT_PROBLEM_ADD_PRODUCT_PROBLEM_WITH_NOTE = 'web.product.problem.add.product.problem.with.note';

    case WEB_PRODUCT_PROBLEM_UPDATE_PRODUCT_PROBLEM_WITH_NOTE = 'web.product.problem.update.product.problem.with.note';

    case WEB_PRODUCT_RESTOCK_INITIATE_PROJECT = 'web.product.restock.initiate.project';

    case WEB_USER_CREATE_BUYER = 'web.user.create.buyer';

    case WEB_DASHBOARD_GET_RETURNED_PRODUCT_STATUS_SUMMARY = 'web.dashboard.get.returned.product.status.summary';
    case WEB_DASHBOARD_GET_RETURNED_PRODUCT_TIME_DIFFERENCE = 'web.dashboard.get.returned.product.time.difference';
    case WEB_DASHBOARD_GET_RETURNED_PRODUCT_TIME_MIN_MAX = 'web.dashboard.get.returned.product.time.min.max';
    case WEB_DASHBOARD_GET_REPLACEMENT_STOCK = 'web.dashboard.get.replacement.stock';
    case WEB_DASHBOARD_GET_PRODUCT_PROBLEM = 'web.dashboard.get.product.problem';
    case WEB_DASHBOARD_GET_VENDOR_PROBLEM_COMPONENTS = 'web.dashboard.get.vendor.problem.components';
    case WEB_DASHBOARD_DISPATCH_PRODUCT_PROBLEM_ANALYSIS = 'web.dashboard.dispatch.product.problem.analysis';
    case WEB_DASHBOARD_GET_WORKSTATION_STATUS = 'web.dashboard.get.workstation.status';
    case WEB_DASHBOARD_GET_TRAINSET_ATTACHMENT_STATUS = 'web.dashboard.get.trainset.attachment.status';
}
