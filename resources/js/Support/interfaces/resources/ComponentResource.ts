import { Component } from '@/Support/models';
import { ProgressResource, Resource } from '@/Support/interfaces/resources';

export interface ComponentResource extends Resource, Component {
    progress?: ProgressResource;
    can_be_deleted: boolean;
}
