const intents = {
    WEB_PROJECT_ADD_TRAINSET: 'web.project.add.trainset',
    WEB_PROJECT_CHANGE_TRAINSET_PRESET: 'web.project.change.trainset.preset',
    WEB_PROJECT_SAVE_TRAINSET_PRESET: 'web.project.save.trainset.preset',
    WEB_PROJECT_IMPORT_PROJECT_TEMPLATE: 'web.project.import.project.template',
    WEB_PROJECT_IMPORT_COMPONENT_PROGRESS_AND_MATERIAL: 'web.project.import.component.progress.and.material',
    WEB_PROJECT_IMPORT_CARRIAGE_COMPONENT_PROGRESS_AND_MATERIAL:
        'web.project.import.carriage.component.progress.and.material',
    WEB_PROJECT_IMPORT_CARRIAGE_PANEL_PROGRESS_AND_MATERIAL: 'web.project.import.carriage.panel.progress.and.material',
    WEB_PROJECT_IMPORT_PANEL_PROGRESS_AND_MATERIAL: 'web.project.import.panel.progress.and.material',
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
    WEB_PANEL_GET_TEMPLATE_IMPORT_PANEL: 'web.panel.get.template.import.panel',
    WEB_PANEL_GET_PANEL_MATERIAL_AND_PROGRESS_TEMPLATE: 'web.panel.get.panel.material.and.progress.template',
    WEB_COMPONENT_GET_COMPONENT_MATERIAL_AND_PROGRESS_TEMPLATE:
        'web.component.get.component.material.and.progress.template',
    WEB_PANEL_IMPORT_PANEL: 'web.panel.import.panel',
    WEB_RAW_MATERIAL_GET_TEMPLATE_IMPORT_RAW_MATERIAL: 'web.raw.material.get.template.import.raw.material',
    WEB_RAW_MATERIAL_IMPORT_RAW_MATERIAL: 'web.raw.material.import.raw.material',
    WEB_CARRIAGE_GET_TEMPLATE_IMPORT_CARRIAGE: 'web.carriage.get.template.import.carriage',
    WEB_CARRIAGE_IMPORT_CARRIAGE: 'web.carriage.import.carriage',
    WEB_TRAINSET_GET_PANEL_MATERIALS_WITH_QTY: 'web.trainset.get.panel.materials.with.qty',
    WEB_TRAINSET_GET_COMPONENT_MATERIALS_WITH_QTY: 'web.trainset.get.component.materials.with.qty',
    WEB_STEP_GET_TEMPLATE_IMPORT_STEP: 'web.step.get.template.import.step',
    WEB_STEP_IMPORT_STEP: 'web.step.import.step',
    WEB_TRAINSET_GENERATE_PANEL_ATTACHMENTS: 'web.trainset.generate.panel.attachments',
    WEB_TRAINSET_GENERATE_TRAINSET_ATTACHMENTS: 'web.trainset.generate.trainset.attachments',
    WEB_TRAINSET_GET_COMPONENTS: 'web.trainset.get.components',
    WEB_TRAINSET_ATTACHMENT_GET_COMPONENT_MATERIALS: 'web.trainset.attachment.get.component.materials',
    WEB_TRAINSET_ATTACHMENT_GET_COMPONENT_MATERIALS_WITH_QTY:
        'web.trainset.attachment.get.component.materials.with.qty',
    WEB_TRAINSET_ATTACHMENT_GET_CUSTOM_ATTACHMENT_MATERIAL_IMPORT_TEMPLATE:
        'web.trainset.attachment.get.custom.attachment.material.import.template',
    WEB_TRAINSET_ATTACHMENT_ASSIGN_REFERENCED_ATTACHMENT: 'web.trainset.attachment.assign.referenced.attachment',
    WEB_TRAINSET_ATTACHMENT_GET_COMPONENT_MATERIALS_WITH_QTY_FOR_TEMPLATE:
        'web.trainset.attachment.get.component.materials.with.qty.for.template',
    WEB_TRAINSET_ATTACHMENT_ASSIGN_REFERENCED_ATTACHMENT_AND_MATERIAL_IMPORT:
        'web.trainset.attachment.assign.referenced.attachment.and.material.import',
    WEB_TRAINSET_ATTACHMENT_ASSIGN_CUSTOM_ATTACHMENT_MATERIAL:
        'web.trainset.attachment.assign.custom.attachment.material',
    WEB_TRAINSET_ATTACHMENT_DOWNLOAD_TRAINSET_ATTACHMENT: 'web.trainset.attachment.download.trainset.attachment',
    WEB_PANEL_ATTACHMENT_DOWNLOAD_PANEL_ATTACHMENT: 'web.panel.attachment.download.panel.attachment',
    WEB_PANEL_ATTACHMENT_GET_CUSTOM_ATTACHMENT_MATERIAL_IMPORT_TEMPLATE:
        'web.panel.attachment.get.custom.attachment.material.import.template',
    WEB_PANEL_ATTACHMENT_GET_PANEL_MATERIALS_WITH_QTY: 'web.panel.attachment.get.panel.materials.with.qty',
    WEB_PANEL_ATTACHMENT_ASSIGN_REFERENCED_ATTACHMENT: 'web.panel.attachment.assign.referenced.attachment',
    WEB_PANEL_ATTACHMENT_ASSIGN_CUSTOM_ATTACHMENT_MATERIAL: 'web.panel.attachment.assign.custom.attachment.material',
    WEB_PANEL_ATTACHMENT_ASSIGN_REFERENCED_ATTACHMENT_AND_MATERIAL_IMPORT:
        'web.panel.attachment.assign.referenced.attachment.and.material.import',
    WEB_PANEL_ATTACHMENT_GET_PANEL_MATERIALS: 'web.panel.attachment.get.panel.materials',
    WEB_PROJECT_GET_ALL_CARRIAGES_WITH_QTY: 'web.project.get.all.carriages.with.qty',
    WEB_PROJECT_GET_ALL_COMPONENTS_WITH_QTY: 'web.project.get.all.components.with.qty',
    WEB_PROJECT_GET_ALL_PANELS_WITH_QTY: 'web.project.get.all.panels.with.qty',
    WEB_PROJECT_GET_ALL_CARRIAGE_COMPONENTS_WITH_QTY: 'web.project.get.all.carriage.components.with.qty',
    WEB_PROJECT_GET_ALL_CARRIAGE_PANELS_WITH_QTY: 'web.project.get.all.carriage.panels.with.qty',
};

export const IntentEnum = intents;

export type IntentEnum = (typeof intents)[keyof typeof intents];
