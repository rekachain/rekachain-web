import { ProgressResource, Resource } from '@/Support/Interfaces/Resources';
import { Component } from '@/Support/Interfaces/Models';

export interface ComponentResource extends Resource, Component {
    progress?: ProgressResource;
    can_be_deleted: boolean;
}
