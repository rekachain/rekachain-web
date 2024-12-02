const intents = {
    SOFT_DELETE_ENTRY: 'soft.delete.entry',
    API_USER_UPDATE_PASSWORD: 'api.user.update.password',
    API_PROJECT_IMPORT_PROJECT_TEMPLATE: 'api.project.import.project.template',
    API_PANEL_IMPORT_PANEL: 'api.panel.import.panel',
    API_TRAINSET_ATTACHMENT_GET_ATTACHMENTS: 'api.trainset.attachment.get.attachments',
    API_TRAINSET_ATTACHMENT_GET_ATTACHMENTS_BY_CURRENT_USER:
        'api.trainset.attachment.get.attachments.by.current.user',
    API_TRAINSET_ATTACHMENT_GET_ATTACHMENTS_BY_STATUS:
        'api.trainset.attachment.get.attachments.by.status',
    API_TRAINSET_ATTACHMENT_GET_ATTACHMENTS_BY_STATUS_AND_CURRENT_USER:
        'api.trainset.attachment.get.attachments.by.status.and.current.user',
    API_TRAINSET_ATTACHMENT_GET_ATTACHMENT_DETAILS:
        'api.trainset.attachment.get.attachment.details',
    API_TRAINSET_ATTACHMENT_GET_ATTACHMENT_DETAILS_WITH_MATERIALS:
        'api.trainset.attachment.get.attachment.details.with.materials',
    API_TRAINSET_ATTACHMENT_GET_ATTACHMENT_DETAILS_WITH_QR:
        'api.trainset.attachment.get.attachment.details.with.qr',
    API_TRAINSET_ATTACHMENT_GET_ATTACHMENT_COMPONENTS:
        'api.trainset.attachment.get.attachment.components',
    API_TRAINSET_ATTACHMENT_GET_ATTACHMENT_REQUIRED_COMPONENTS:
        'api.trainset.attachment.get.attachment.required.components',
    API_TRAINSET_ATTACHMENT_GET_ATTACHMENT_MATERIALS:
        'api.trainset.attachment.get.attachment.materials',
    API_TRAINSET_ATTACHMENT_GET_ATTACHMENT_PROGRESS:
        'api.trainset.attachment.get.attachment.progress',
    API_TRAINSET_ATTACHMENT_UPDATE_ATTACHMENT_STATUS:
        'api.trainset.attachment.update.attachment.status',
    API_TRAINSET_ATTACHMENT_UPDATE_ASSIGN_SPV_AND_RECEIVER:
        'api.trainset.attachment.update.assign.spv.and.receiver',
    API_TRAINSET_ATTACHMENT_COMPONENT_GET_COMPONENT_DETAILS:
        'api.trainset.attachment.component.get.component.details',
    API_TRAINSET_ATTACHMENT_CONFIRM_KPM_BY_SPV: 'api.trainset.attachment.confirm.kpm.by.spv',
    API_TRAINSET_ATTACHMENT_ASSIGN_WORKER_COMPONENT:
        'api.trainset.attachment.assign.worker.component',
    API_TRAINSET_ATTACHMENT_ASSIGN_HANDLER: 'api.trainset.attachment.assign.handler',
    API_PANEL_ATTACHMENT_GET_ATTACHMENTS: 'api.panel.attachment.get.attachments',
    API_PANEL_ATTACHMENT_GET_ATTACHMENTS_BY_CURRENT_USER:
        'api.panel.attachment.get.attachments.by.current.user',
    API_PANEL_ATTACHMENT_GET_ATTACHMENTS_BY_STATUS:
        'api.panel.attachment.get.attachments.by.status',
    API_PANEL_ATTACHMENT_GET_ATTACHMENTS_BY_STATUS_AND_CURRENT_USER:
        'api.panel.attachment.get.attachments.by.status.and.current.user',
    API_PANEL_ATTACHMENT_GET_ATTACHMENT_DETAILS: 'api.panel.attachment.get.attachment.details',
    API_PANEL_ATTACHMENT_GET_ATTACHMENT_MATERIALS: 'api.panel.attachment.get.attachment.materials',
    API_PANEL_ATTACHMENT_GET_ATTACHMENT_PROGRESS: 'api.panel.attachment.get.attachment.progress',
    API_PANEL_ATTACHMENT_GET_ATTACHMENT_DETAILS_WITH_MATERIALS:
        'api.panel.attachment.get.attachment.details.with.materials',
    API_PANEL_ATTACHMENT_GET_ATTACHMENT_DETAILS_WITH_QR:
        'api.panel.attachment.get.attachment.details.with.qr',
    API_PANEL_ATTACHMENT_GET_ATTACHMENT_SERIAL_NUMBER:
        'api.panel.attachment.get.attachment.serial.number',
    API_PANEL_ATTACHMENT_GET_ATTACHMENT_SERIAL_NUMBERS:
        'api.panel.attachment.get.attachment.serial.numbers',
    API_PANEL_ATTACHMENT_GET_ATTACHMENT_SERIAL_NUMBER_DETAILS:
        'api.panel.attachment.get.attachment.serial.number.details',
    API_PANEL_ATTACHMENT_GET_ATTACHMENT_SERIAL_NUMBER_DETAILS_WITH_QR:
        'api.panel.attachment.get.attachment.serial.number.details.with.qr',
    API_PANEL_ATTACHMENT_CONFIRM_KPM_BY_SPV: 'api.panel.attachment.confirm.kpm.by.spv',
    API_PANEL_ATTACHMENT_UPDATE_ATTACHMENT_STATUS: 'api.panel.attachment.update.attachment.status',
    API_PANEL_ATTACHMENT_UPDATE_ASSIGN_SPV_AND_RECEIVER:
        'api.panel.attachment.update.assign.spv.and.receiver',
    API_PANEL_ATTACHMENT_REJECT_KPM: 'api.panel.attachment.reject.kpm',
    API_PANEL_ATTACHMENT_ASSIGN_HANDLER: 'api.panel.attachment.assign.handler',
    API_DETAIL_WORKER_PANEL_GET_PANELS: 'api.detail.worker.panel.get.panels',
    API_DETAIL_WORKER_PANEL_GET_PANEL_DETAILS: 'api.detail.worker.panel.get.panel.details',
    API_DETAIL_WORKER_PANEL_GET_WORK_DETAILS: 'api.detail.worker.panel.get.work.details',
    API_DETAIL_WORKER_PANELS_GET_ALL_WORK_DETAIL: 'api.detail.worker.panels.get.all.work.detail',
    API_DETAIL_WORKER_PANELS_GET_ALL_REQUEST_WORKER:
        'api.detail.worker.panels.get.all.request.worker',
    API_DETAIL_WORKER_PANEL_ASSIGN_REQUEST_WORKER: 'api.detail.worker.panel.request.assign.worker',
    API_DETAIL_WORKER_PANELS_BY_STATUS: 'api.detail.worker.panels.by.status',
    API_DETAIL_WORKER_PANELS_BY_CURRENT_USER: 'api.detail.worker.panels.by.current.user',
    API_DETAIL_WORKER_PANELS_BY_STATUS_AND_CURRENT_USER:
        'api.detail.worker.panels.by.status.and.current.user',
    API_DETAIL_WORKER_PANEL_ACCEPT_WORK_WITH_IMAGE:
        'api.detail.worker.panel.accept.work.with.image',
    API_DETAIL_WORKER_TRAINSET_GET_TRAINSETS: 'api.detail.worker.trainset.get.trainsets',
    API_DETAIL_WORKER_TRAINSET_GET_TRAINSET_DETAILS:
        'api.detail.worker.trainset.get.trainset.details',
    API_DETAIL_WORKER_TRAINSET_ASSIGN_REQUEST_WORKER:
        'api.detail.worker.trainset.assign.request.worker',
    API_DETAIL_WORKER_TRAINSETS_BY_STATUS: 'api.detail.worker.trainset.by.status',
    API_DETAIL_WORKER_TRAINSETS_BY_CURRENT_USER: 'api.detail.worker.trainsets.by.current.user',
    API_DETAIL_WORKER_TRAINSETS_BY_STATUS_AND_CURRENT_USER:
        'api.detail.worker.trainsets.by.status.and.current.user',
    API_DETAIL_WORKER_TRAINSETS_GET_ALL_WORK_DETAIL:
        'api.detail.worker.trainsets.get.all.work.detail',
    API_DETAIL_WORKER_TRAINSETS_GET_ALL_REQUEST_WORKER:
        'api.detail.worker.trainsets.get.all.request.worker',
    API_DETAIL_WORKER_TRAINSET_GET_WORK_DETAILS: 'api.detail.worker.trainset.get.work.details',
    API_DETAIL_WORKER_TRAINSET_REJECT_WORK: 'api.detail.worker.trainset.reject.work',
    API_DETAIL_WORKER_TRAINSET_ACCEPT_WORK_WITH_IMAGE:
        'api.detail.worker.trainset.accept.work.with.image',
    API_SERIAL_PANEL_UPDATE_ASSIGN_WORKER_PANEL: 'api.serial.panel.update.assign.worker.panel',
    API_SERIAL_PANEL_UPDATE_PANEL_MANUFACTURE_STATUS:
        'api.serial.panel.update.panel.manufacture.status',
    WEB_PROJECT_GET_ALL_TRAINSET_COMPONENTS: 'web.project.get.all.trainset.components',
    WEB_PROJECT_GET_ALL_TRAINSET_COMPONENTS_WITH_QTY:
        'web.project.get.all.trainset.components.with.qty',
    WEB_PROJECT_GET_ALL_TRAINSET_PANELS: 'web.project.get.all.trainset.panels',
    WEB_PROJECT_GET_ALL_TRAINSET_PANELS_WITH_QTY: 'web.project.get.all.trainset.panels.with.qty',
    WEB_PROJECT_GET_ALL_CARRIAGES: 'web.project.get.all.carriages',
    WEB_PROJECT_GET_ALL_CARRIAGES_WITH_QTY: 'web.project.get.all.carriages.with.qty',
    WEB_PROJECT_GET_ALL_CARRIAGE_COMPONENTS: 'web.project.get.all.carriage.components',
    WEB_PROJECT_GET_ALL_CARRIAGE_COMPONENTS_WITH_QTY:
        'web.project.get.all.carriage.components.with.qty',
    WEB_PROJECT_GET_ALL_CARRIAGE_PANELS: 'web.project.get.all.carriage.panels',
    WEB_PROJECT_GET_ALL_CARRIAGE_PANELS_WITH_QTY: 'web.project.get.all.carriage.panels.with.qty',
    WEB_PROJECT_GET_ALL_PANELS: 'web.project.get.all.panels',
    WEB_PROJECT_GET_ALL_PANELS_WITH_QTY: 'web.project.get.all.panels.with.qty',
    WEB_PROJECT_GET_ALL_COMPONENTS: 'web.project.get.all.components',
    WEB_PROJECT_GET_ALL_COMPONENTS_WITH_QTY: 'web.project.get.all.components.with.qty',
    WEB_PROJECT_ADD_TRAINSET: 'web.project.add.trainset',
    WEB_PROJECT_CHANGE_TRAINSET_PRESET: 'web.project.change.trainset.preset',
    WEB_PROJECT_SAVE_TRAINSET_PRESET: 'web.project.save.trainset.preset',
    WEB_PROJECT_IMPORT_PROJECT_TEMPLATE: 'web.project.import.project.template',
    WEB_PROJECT_IMPORT_COMPONENT_PROGRESS_AND_MATERIAL:
        'web.project.import.component.progress.and.material',
    WEB_PROJECT_IMPORT_TRAINSET_COMPONENT_PROGRESS_AND_MATERIAL:
        'web.project.import.trainset.component.progress.and.material',
    WEB_PROJECT_IMPORT_CARRIAGE_COMPONENT_PROGRESS_AND_MATERIAL:
        'web.project.import.carriage.component.progress.and.material',
    WEB_PROJECT_IMPORT_CARRIAGE_PANEL_PROGRESS_AND_MATERIAL:
        'web.project.import.carriage.panel.progress.and.material',
    WEB_PROJECT_IMPORT_PANEL_PROGRESS_AND_MATERIAL:
        'web.project.import.panel.progress.and.material',
    WEB_TRAINSET_DELETE_CARRIAGE_TRAINSET: 'web.trainset.delete.carriage.trainset',
    WEB_TRAINSET_ADD_CARRIAGE_TRAINSET: 'web.trainset.add.carriage.trainset',
    WEB_TRAINSET_GET_ALL_COMPONENTS: 'web.trainset.get.all.components',
    WEB_TRAINSET_GET_ALL_COMPONENTS_WITH_QTY: 'web.trainset.get.all.components.with.qty',
    WEB_TRAINSET_GET_ALL_PANELS: 'web.trainset.get.all.panels',
    WEB_TRAINSET_GET_ALL_PANELS_WITH_QTY: 'web.trainset.get.all.panels.with.qty',
    WEB_TRAINSET_UPDATE_CARRIAGE_TRAINSET: 'web.trainset.update.carriage.trainset',
    WEB_TRAINSET_EXPORT_SERIAL_NUMBERS: 'web.trainset.export.serial.numbers',
    WEB_CARRIAGE_TRAINSET_ADD_CARRIAGE_PANEL: 'web.carriage.trainset.add.carriage.panel',
    WEB_CARRIAGE_PANEL_ADD_COMPONENT: 'web.carriage.panel.add.component',
    WEB_CARRIAGE_PANEL_ADD_RAW_MATERIAL: 'web.carriage.panel.add.raw.material',
    WEB_CARRIAGE_PANEL_CHANGE_PROGRESS: 'web.carriage.panel.change.progress',
    WEB_CARRIAGE_PANEL_COMPONENT_ADD_RAW_MATERIAL: 'web.carriage.panel.component.add.raw.material',
    WEB_CARRIAGE_PANEL_COMPONENT_CHANGE_PROGRESS: 'web.carriage.panel.component.change.progress',
    WEB_PANEL_GET_TEMPLATE_IMPORT_PANEL: 'web.panel.get.template.import.panel',
    WEB_PANEL_GET_PANEL_MATERIAL_AND_PROGRESS_TEMPLATE:
        'web.panel.get.panel.material.and.progress.template',
    WEB_COMPONENT_GET_COMPONENT_MATERIAL_AND_PROGRESS_TEMPLATE:
        'web.component.get.component.material.and.progress.template',
    WEB_PROGRESS_GET_TEMPLATE_IMPORT_PROGRESS: 'web.progress.get.template.import.progress',
    WEB_PROGRESS_IMPORT_PROGRESS: 'web.progress.import.progress',
    WEB_PROGRESS_CREATE_STEP: 'web.progress.create.step',
    WEB_PANEL_IMPORT_PANEL: 'web.panel.import.panel',
    WEB_RAW_MATERIAL_GET_TEMPLATE_IMPORT_RAW_MATERIAL:
        'web.raw.material.get.template.import.raw.material',
    // WEB_TRAINSET_DELETE_CARRIAGE_TRAINSET: 'web.trainset.delete.carriage.trainset',
    // WEB_TRAINSET_ADD_CARRIAGE_TRAINSET: 'web.trainset.add.carriage.trainset',
    // WEB_TRAINSET_GET_ALL_COMPONENTS: 'web.trainset.get.all.components',
    WEB_TRAINSET_GET_ALL_COMPONENTS_PROGRESS: 'web.trainset.get.all.components.progress',
    // WEB_TRAINSET_GET_ALL_COMPONENTS_WITH_QTY: 'web.trainset.get.all.components.with.qty',
    // WEB_TRAINSET_GET_ALL_PANELS: 'web.trainset.get.all.panels',
    WEB_TRAINSET_GET_ALL_PANELS_PROGRESS: 'web.trainset.get.all.panels.progress',
    // WEB_TRAINSET_GET_ALL_PANELS_WITH_QTY: 'web.trainset.get.all.panels.with.qty',
    // WEB_TRAINSET_UPDATE_CARRIAGE_TRAINSET: 'web.trainset.update.carriage.trainset',
    // WEB_CARRIAGE_TRAINSET_ADD_CARRIAGE_PANEL: 'web.carriage.trainset.add.carriage.panel',
    WEB_CARRIAGE_PANEL_GET_PANEL_PROGRESS: 'web.carriage.panel.get.panel.progress',
    // WEB_CARRIAGE_PANEL_ADD_COMPONENT: 'web.carriage.panel.add.component',
    // WEB_CARRIAGE_PANEL_ADD_RAW_MATERIAL: 'web.carriage.panel.add.raw.material',
    // WEB_CARRIAGE_PANEL_CHANGE_PROGRESS: 'web.carriage.panel.change.progress',
    WEB_CARRIAGE_PANEL_IMPORT_PROGRESS_AND_MATERIAL:
        'web.carriage.panel.import.progress.and.material',
    // WEB_CARRIAGE_PANEL_COMPONENT_ADD_RAW_MATERIAL: 'web.carriage.panel.component.add.raw.material',
    WEB_CARRIAGE_PANEL_COMPONENT_IMPORT_PROGRESS_AND_MATERIAL:
        'web.carriage.panel.component.import.progress.and.material',
    // WEB_CARRIAGE_PANEL_COMPONENT_CHANGE_PROGRESS: 'web.carriage.panel.component.change.progress',
    // WEB_PANEL_GET_TEMPLATE_IMPORT_PANEL: 'web.panel.get.template.import.panel',
    // WEB_PANEL_GET_PANEL_MATERIAL_AND_PROGRESS_TEMPLATE:
    //     'web.panel.get.panel.material.and.progress.template',
    // WEB_PANEL_IMPORT_PANEL: 'web.panel.import.panel',
    // WEB_PROJECT_IMPORT_PANEL_PROGRESS_AND_MATERIAL:
    //     'web.project.import.panel.progress.and.material',
    // WEB_PROJECT_IMPORT_COMPONENT_PROGRESS_AND_MATERIAL:
    //     'web.project.import.component.progress.and.material',
    // WEB_PROJECT_IMPORT_TRAINSET_PANEL_PROGRESS_AND_MATERIAL:
    //     'web.project.import.trainset.panel.progress.and.material',
    // WEB_PROJECT_IMPORT_TRAINSET_COMPONENT_PROGRESS_AND_MATERIAL:
    //     'web.project.import.trainset.component.progress.and.material',
    // WEB_PROJECT_IMPORT_CARRIAGE_PANEL_PROGRESS_AND_MATERIAL:
    //     'web.project.import.carriage.panel.progress.and.material',
    // WEB_PROJECT_IMPORT_CARRIAGE_COMPONENT_PROGRESS_AND_MATERIAL:
    //     'web.project.import.carriage.component.progress.and.material',
    // WEB_RAW_MATERIAL_GET_TEMPLATE_IMPORT_RAW_MATERIAL:
    //     'web.raw.material.get.template.import.raw.material',
    WEB_RAW_MATERIAL_IMPORT_RAW_MATERIAL: 'web.raw.material.import.raw.material',
    WEB_CARRIAGE_GET_TEMPLATE_IMPORT_CARRIAGE: 'web.carriage.get.template.import.carriage',
    WEB_CARRIAGE_IMPORT_CARRIAGE: 'web.carriage.import.carriage',
    WEB_TRAINSET_GET_PANEL_MATERIALS_WITH_QTY: 'web.trainset.get.panel.materials.with.qty',
    WEB_TRAINSET_GET_COMPONENT_MATERIALS_WITH_QTY: 'web.trainset.get.component.materials.with.qty',
    WEB_TRAINSET_GET_TEMPLATE_IMPORT_TRAINSET: 'web.trainset.get.template.import.trainset',
    WEB_TRAINSET_IMPORT_TRAINSET: 'web.trainset.import.trainset',
    // WEB_TRAINSET_EXPORT_SERIAL_NUMBERS: 'web.trainset.export.serial.numbers',
    WEB_COMPONENT_GET_TEMPLATE_IMPORT_COMPONENT: 'web.component.get.template.import.component',
    // WEB_COMPONENT_GET_COMPONENT_MATERIAL_AND_PROGRESS_TEMPLATE:
    //     'web.component.get.component.material.and.progress.template',
    WEB_COMPONENT_IMPORT_COMPONENT: 'web.component.import.component',
    // WEB_PROGRESS_GET_TEMPLATE_IMPORT_PROGRESS: 'web.progress.get.template.import.progress',
    // WEB_PROGRESS_IMPORT_PROGRESS: 'web.progress.import.progress',
    // WEB_PROGRESS_CREATE_STEP: 'web.progress.create.step',
    WEB_STEP_GET_TEMPLATE_IMPORT_STEP: 'web.step.get.template.import.step',
    WEB_STEP_IMPORT_STEP: 'web.step.import.step',
    WEB_TRAINSET_GENERATE_PANEL_ATTACHMENTS: 'web.trainset.generate.panel.attachments',
    WEB_TRAINSET_GENERATE_TRAINSET_ATTACHMENTS: 'web.trainset.generate.trainset.attachments',
    WEB_TRAINSET_GET_COMPONENTS: 'web.trainset.get.components',
    WEB_TRAINSET_ATTACHMENT_GET_COMPONENT_MATERIALS:
        'web.trainset.attachment.get.component.materials',
    WEB_TRAINSET_GET_PANEL_PROGRESS: 'web.trainset.get.panel.progress',
    WEB_TRAINSET_GET_PANEL_PROGRESS_WITH_WORKER_STEPS:
        'web.trainset.get.panel.progress.with.worker.steps',
    WEB_TRAINSET_ATTACHMENT_GET_ATTACHMENT_PROGRESS:
        'web.trainset.attachment.get.attachment.progress',
    WEB_TRAINSET_ATTACHMENT_GET_ATTACHMENT_PROGRESS_WITH_WORKER_STEPS:
        'web.trainset.attachment.get.attachment.progress.with.worker.steps',
    // WEB_TRAINSET_ATTACHMENT_GET_COMPONENT_MATERIALS:
    //     'web.trainset.attachment.get.component.materials',
    WEB_TRAINSET_ATTACHMENT_GET_COMPONENT_MATERIALS_WITH_QTY:
        'web.trainset.attachment.get.component.materials.with.qty',
    WEB_TRAINSET_ATTACHMENT_GET_CUSTOM_ATTACHMENT_MATERIAL_IMPORT_TEMPLATE:
        'web.trainset.attachment.get.custom.attachment.material.import.template',
    WEB_TRAINSET_ATTACHMENT_ASSIGN_REFERENCED_ATTACHMENT:
        'web.trainset.attachment.assign.referenced.attachment',
    WEB_TRAINSET_ATTACHMENT_GET_COMPONENT_MATERIALS_WITH_QTY_FOR_TEMPLATE:
        'web.trainset.attachment.get.component.materials.with.qty.for.template',
    WEB_TRAINSET_ATTACHMENT_ASSIGN_REFERENCED_ATTACHMENT_AND_MATERIAL_IMPORT:
        'web.trainset.attachment.assign.referenced.attachment.and.material.import',
    WEB_TRAINSET_ATTACHMENT_ASSIGN_CUSTOM_ATTACHMENT_MATERIAL:
        'web.trainset.attachment.assign.custom.attachment.material',
    WEB_TRAINSET_ATTACHMENT_DOWNLOAD_TRAINSET_ATTACHMENT:
        'web.trainset.attachment.download.trainset.attachment',
    WEB_PANEL_ATTACHMENT_DOWNLOAD_PANEL_ATTACHMENT:
        'web.panel.attachment.download.panel.attachment',
    WEB_PANEL_ATTACHMENT_GET_CUSTOM_ATTACHMENT_MATERIAL_IMPORT_TEMPLATE:
        'web.panel.attachment.get.custom.attachment.material.import.template',
    WEB_PANEL_ATTACHMENT_GET_PANEL_MATERIALS_WITH_QTY:
        'web.panel.attachment.get.panel.materials.with.qty',
    WEB_PANEL_ATTACHMENT_ASSIGN_REFERENCED_ATTACHMENT:
        'web.panel.attachment.assign.referenced.attachment',
    WEB_PANEL_ATTACHMENT_ASSIGN_CUSTOM_ATTACHMENT_MATERIAL:
        'web.panel.attachment.assign.custom.attachment.material',
    WEB_PANEL_ATTACHMENT_ASSIGN_REFERENCED_ATTACHMENT_AND_MATERIAL_IMPORT:
        'web.panel.attachment.assign.referenced.attachment.and.material.import',
    WEB_PANEL_ATTACHMENT_GET_PANEL_MATERIALS: 'web.panel.attachment.get.panel.materials',
    // WEB_PROJECT_GET_ALL_CARRIAGES_WITH_QTY: 'web.project.get.all.carriages.with.qty',
    // WEB_PROJECT_GET_ALL_COMPONENTS_WITH_QTY: 'web.project.get.all.components.with.qty',
    // WEB_PROJECT_GET_ALL_PANELS_WITH_QTY: 'web.project.get.all.panels.with.qty',
    // WEB_PROJECT_GET_ALL_CARRIAGE_COMPONENTS_WITH_QTY: 'web.project.get.all.carriage.components.with.qty',
    // WEB_PROJECT_GET_ALL_CARRIAGE_PANELS_WITH_QTY: 'web.project.get.all.carriage.panels.with.qty',
    // "API_USER_UPDATE_PASSWORD": "api.user.update.password",
    // "API_PROJECT_IMPORT_PROJECT_TEMPLATE": "api.project.import.project.template",
    // "API_PANEL_IMPORT_PANEL": "api.panel.import.panel",
    // "API_TRAINSET_ATTACHMENT_GET_ATTACHMENTS": "api.trainset.attachment.get.attachments",
    // "API_TRAINSET_ATTACHMENT_GET_ATTACHMENTS_BY_CURRENT_USER": "api.trainset.attachment.get.attachments.by.current.user",
    // "API_TRAINSET_ATTACHMENT_GET_ATTACHMENTS_BY_STATUS": "api.trainset.attachment.get.attachments.by.status",
    // "API_TRAINSET_ATTACHMENT_GET_ATTACHMENTS_BY_STATUS_AND_CURRENT_USER": "api.trainset.attachment.get.attachments.by.status.and.current.user",
    // "API_TRAINSET_ATTACHMENT_GET_ATTACHMENT_DETAILS": "api.trainset.attachment.get.attachment.details",
    // "API_TRAINSET_ATTACHMENT_GET_ATTACHMENT_DETAILS_WITH_MATERIALS": "api.trainset.attachment.get.attachment.details.with.materials",
    // "API_TRAINSET_ATTACHMENT_GET_ATTACHMENT_DETAILS_WITH_QR": "api.trainset.attachment.get.attachment.details.with.qr",
    // "API_TRAINSET_ATTACHMENT_GET_ATTACHMENT_COMPONENTS": "api.trainset.attachment.get.attachment.components",
    // "API_TRAINSET_ATTACHMENT_GET_ATTACHMENT_REQUIRED_COMPONENTS": "api.trainset.attachment.get.attachment.required.components",
    // "API_TRAINSET_ATTACHMENT_GET_ATTACHMENT_MATERIALS": "api.trainset.attachment.get.attachment.materials",
    // "API_TRAINSET_ATTACHMENT_GET_ATTACHMENT_PROGRESS": "api.trainset.attachment.get.attachment.progress",
    // "API_TRAINSET_ATTACHMENT_UPDATE_ATTACHMENT_STATUS": "api.trainset.attachment.update.attachment.status",
    // "API_TRAINSET_ATTACHMENT_UPDATE_ASSIGN_SPV_AND_RECEIVER": "api.trainset.attachment.update.assign.spv.and.receiver",
    // "API_TRAINSET_ATTACHMENT_COMPONENT_GET_COMPONENT_DETAILS": "api.trainset.attachment.component.get.component.details",
    // "API_TRAINSET_ATTACHMENT_CONFIRM_KPM_BY_SPV": "api.trainset.attachment.confirm.kpm.by.spv",
    // "API_TRAINSET_ATTACHMENT_ASSIGN_WORKER_COMPONENT": "api.trainset.attachment.assign.worker.component",
    // "API_TRAINSET_ATTACHMENT_ASSIGN_HANDLER": "api.trainset.attachment.assign.handler",
    // "API_PANEL_ATTACHMENT_GET_ATTACHMENTS": "api.panel.attachment.get.attachments",
    // "API_PANEL_ATTACHMENT_GET_ATTACHMENTS_BY_CURRENT_USER": "api.panel.attachment.get.attachments.by.current.user",
    // "API_PANEL_ATTACHMENT_GET_ATTACHMENTS_BY_STATUS": "api.panel.attachment.get.attachments.by.status",
    // "API_PANEL_ATTACHMENT_GET_ATTACHMENTS_BY_STATUS_AND_CURRENT_USER": "api.panel.attachment.get.attachments.by.status.and.current.user",
    // "API_PANEL_ATTACHMENT_GET_ATTACHMENT_DETAILS": "api.panel.attachment.get.attachment.details",
    // "API_PANEL_ATTACHMENT_GET_ATTACHMENT_MATERIALS": "api.panel.attachment.get.attachment.materials",
    // "API_PANEL_ATTACHMENT_GET_ATTACHMENT_PROGRESS": "api.panel.attachment.get.attachment.progress",
    // "API_PANEL_ATTACHMENT_GET_ATTACHMENT_DETAILS_WITH_MATERIALS": "api.panel.attachment.get.attachment.details.with.materials",
    // "API_PANEL_ATTACHMENT_GET_ATTACHMENT_DETAILS_WITH_QR": "api.panel.attachment.get.attachment.details.with.qr",
    // "API_PANEL_ATTACHMENT_GET_ATTACHMENT_SERIAL_NUMBER": "api.panel.attachment.get.attachment.serial.number",
    // "API_PANEL_ATTACHMENT_GET_ATTACHMENT_SERIAL_NUMBERS": "api.panel.attachment.get.attachment.serial.numbers",
    // "API_PANEL_ATTACHMENT_GET_ATTACHMENT_SERIAL_NUMBER_DETAILS": "api.panel.attachment.get.attachment.serial.number.details",
    // "API_PANEL_ATTACHMENT_GET_ATTACHMENT_SERIAL_NUMBER_DETAILS_WITH_QR": "api.panel.attachment.get.attachment.serial.number.details.with.qr",
    // "API_PANEL_ATTACHMENT_CONFIRM_KPM_BY_SPV": "api.panel.attachment.confirm.kpm.by.spv",
    // "API_PANEL_ATTACHMENT_UPDATE_ATTACHMENT_STATUS": "api.panel.attachment.update.attachment.status",
    // "API_PANEL_ATTACHMENT_UPDATE_ASSIGN_SPV_AND_RECEIVER": "api.panel.attachment.update.assign.spv.and.receiver",
    // "API_PANEL_ATTACHMENT_REJECT_KPM": "api.panel.attachment.reject.kpm",
    // "API_PANEL_ATTACHMENT_ASSIGN_HANDLER": "api.panel.attachment.assign.handler",
    // "API_DETAIL_WORKER_PANEL_GET_PANELS": "api.detail.worker.panel.get.panels",
    // "API_DETAIL_WORKER_PANEL_GET_PANEL_DETAILS": "api.detail.worker.panel.get.panel.details",
    // "API_DETAIL_WORKER_PANEL_GET_WORK_DETAILS": "api.detail.worker.panel.get.work.details",
    // "API_DETAIL_WORKER_PANELS_GET_ALL_WORK_DETAIL": "api.detail.worker.panels.get.all.work.detail",
    // "API_DETAIL_WORKER_PANELS_GET_ALL_REQUEST_WORKER": "api.detail.worker.panels.get.all.request.worker",
    // "API_DETAIL_WORKER_PANEL_ASSIGN_REQUEST_WORKER": "api.detail.worker.panel.request.assign.worker",
    // "API_DETAIL_WORKER_PANELS_BY_STATUS": "api.detail.worker.panels.by.status",
    // "API_DETAIL_WORKER_PANELS_BY_CURRENT_USER": "api.detail.worker.panels.by.current.user",
    // "API_DETAIL_WORKER_PANELS_BY_STATUS_AND_CURRENT_USER": "api.detail.worker.panels.by.status.and.current.user",
    // "API_DETAIL_WORKER_PANEL_ACCEPT_WORK_WITH_IMAGE": "api.detail.worker.panel.accept.work.with.image",
    // "API_DETAIL_WORKER_TRAINSET_GET_TRAINSETS": "api.detail.worker.trainset.get.trainsets",
    // "API_DETAIL_WORKER_TRAINSET_GET_TRAINSET_DETAILS": "api.detail.worker.trainset.get.trainset.details",
    // "API_DETAIL_WORKER_TRAINSET_ASSIGN_REQUEST_WORKER": "api.detail.worker.trainset.assign.request.worker",
    // "API_DETAIL_WORKER_TRAINSETS_BY_STATUS": "api.detail.worker.trainset.by.status",
    // "API_DETAIL_WORKER_TRAINSETS_BY_CURRENT_USER": "api.detail.worker.trainsets.by.current.user",
    // "API_DETAIL_WORKER_TRAINSETS_BY_STATUS_AND_CURRENT_USER": "api.detail.worker.trainsets.by.status.and.current.user",
    // "API_DETAIL_WORKER_TRAINSETS_GET_ALL_WORK_DETAIL": "api.detail.worker.trainsets.get.all.work.detail",
    // "API_DETAIL_WORKER_TRAINSETS_GET_ALL_REQUEST_WORKER": "api.detail.worker.trainsets.get.all.request.worker",
    // "API_DETAIL_WORKER_TRAINSET_GET_WORK_DETAILS": "api.detail.worker.trainset.get.work.details",
    // "API_DETAIL_WORKER_TRAINSET_REJECT_WORK": "api.detail.worker.trainset.reject.work",
    // "API_DETAIL_WORKER_TRAINSET_ACCEPT_WORK_WITH_IMAGE": "api.detail.worker.trainset.accept.work.with.image",
    // "API_SERIAL_PANEL_UPDATE_ASSIGN_WORKER_PANEL": "api.serial.panel.update.assign.worker.panel",
    // "API_SERIAL_PANEL_UPDATE_PANEL_MANUFACTURE_STATUS": "api.serial.panel.update.panel.manufacture.status",
    // "WEB_PROJECT_GET_ALL_TRAINSET_COMPONENTS": "web.project.get.all.trainset.components",
    // "WEB_PROJECT_GET_ALL_TRAINSET_COMPONENTS_WITH_QTY": "web.project.get.all.trainset.components.with.qty",
    // "WEB_PROJECT_GET_ALL_TRAINSET_PANELS": "web.project.get.all.trainset.panels",
    // "WEB_PROJECT_GET_ALL_TRAINSET_PANELS_WITH_QTY": "web.project.get.all.trainset.panels.with.qty",
    // "WEB_PROJECT_GET_ALL_CARRIAGES": "web.project.get.all.carriages",
    // "WEB_PROJECT_GET_ALL_CARRIAGE_COMPONENTS": "web.project.get.all.carriage.components",
    // "WEB_PROJECT_GET_ALL_CARRIAGE_PANELS": "web.project.get.all.carriage.panels",
    // "WEB_PROJECT_GET_ALL_PANELS": "web.project.get.all.panels",
    // "WEB_PROJECT_GET_ALL_COMPONENTS": "web.project.get.all.components",
    // "WEB_CARRIAGE_PANEL_COMPONENT_IMPORT_PROGRESS_AND_MATERIAL": "web.carriage.panel.component.import.progress.and.material",
    // "WEB_TRAINSET_GET_TEMPLATE_IMPORT_TRAINSET": "web.trainset.get.template.import.trainset",
    // "WEB_TRAINSET_IMPORT_TRAINSET": "web.trainset.import.trainset",
    // "WEB_COMPONENT_GET_TEMPLATE_IMPORT_COMPONENT": "web.component.get.template.import.component",
    // "WEB_COMPONENT_IMPORT_COMPONENT": "web.component.import.component",
    // "WEB_TRAINSET_ATTACHMENT_GET_ATTACHMENT_PROGRESS": "web.trainset.attachment.get.attachment.progress",
    WEB_PANEL_ATTACHMENT_GET_PANEL: 'web.panel.attachment.get.panel',
    WEB_PANEL_ATTACHMENT_GET_SERIAL_PANELS: 'web.panel.attachment.get.serial.panels',
    WEB_PANEL_ATTACHMENT_GET_ATTACHMENT_PROGRESS: 'web.panel.attachment.get.attachment.progress',
    WEB_PANEL_ATTACHMENT_GET_PANEL_WITH_QTY: 'web.panel.attachment.get.panel.with.qty',
    // WEB_TRAINSET_ATTACHMENT_ASSIGN_REFERENCED_ATTACHMENT:
    //     'web.trainset.attachment.assign.referenced.attachment',
    // WEB_TRAINSET_ATTACHMENT_ASSIGN_CUSTOM_ATTACHMENT_MATERIAL:
    //     'web.trainset.attachment.assign.custom.attachment.material',
    // WEB_TRAINSET_ATTACHMENT_ASSIGN_REFERENCED_ATTACHMENT_AND_MATERIAL_IMPORT:
    //     'web.trainset.attachment.assign.referenced.attachment.and.material.import',
    // WEB_PANEL_ATTACHMENT_GET_PANEL: 'web.panel.attachment.get.panel',
    // WEB_PANEL_ATTACHMENT_GET_SERIAL_PANELS: 'web.panel.attachment.get.serial.panels',
    // WEB_PANEL_ATTACHMENT_GET_ATTACHMENT_PROGRESS: 'web.panel.attachment.get.attachment.progress',
    // WEB_PANEL_ATTACHMENT_GET_PANEL_WITH_QTY: 'web.panel.attachment.get.panel.with.qty',
    // WEB_TRAINSET_ATTACHMENT_DOWNLOAD_TRAINSET_ATTACHMENT:
    //     'web.trainset.attachment.download.trainset.attachment',
    // WEB_PANEL_ATTACHMENT_DOWNLOAD_PANEL_ATTACHMENT:
    //     'web.panel.attachment.download.panel.attachment',
    // WEB_PANEL_ATTACHMENT_GET_CUSTOM_ATTACHMENT_MATERIAL_IMPORT_TEMPLATE:
    //     'web.panel.attachment.get.custom.attachment.material.import.template',
    // WEB_PANEL_ATTACHMENT_GET_PANEL_MATERIALS: 'web.panel.attachment.get.panel.materials',
    // WEB_PANEL_ATTACHMENT_GET_PANEL_MATERIALS_WITH_QTY:
    //     'web.panel.attachment.get.panel.materials.with.qty',
    // WEB_PANEL_ATTACHMENT_ASSIGN_REFERENCED_ATTACHMENT:
    //     'web.panel.attachment.assign.referenced.attachment',
    // WEB_PANEL_ATTACHMENT_ASSIGN_CUSTOM_ATTACHMENT_MATERIAL:
    //     'web.panel.attachment.assign.custom.attachment.material',
    // WEB_PANEL_ATTACHMENT_ASSIGN_REFERENCED_ATTACHMENT_AND_MATERIAL_IMPORT:
    //     'web.panel.attachment.assign.referenced.attachment.and.material.import',
    // WEB_TRAINSET_ATTACHMENT_GET_COMPONENT_MATERIALS_WITH_QTY_FOR_TEMPLATE:
    //     'web.trainset.attachment.get.component.materials.with.qty.for.template',
};

export const IntentEnum = intents;

export type IntentEnum = (typeof intents)[keyof typeof intents];
