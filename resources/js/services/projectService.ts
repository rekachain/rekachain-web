import { ROUTES } from '@/support/constants/routes.js';
import { serviceFactory } from '@/services/serviceFactory';
import { ProjectResource } from '@/support/interfaces/resources';

export const projectService = {
    ...serviceFactory<ProjectResource>(ROUTES.PROJECTS),
};
