import { Component } from '@/Support/Interfaces/Models';
import { ProgressResource, Resource } from '@/Support/Interfaces/Resources';

export interface ComponentResource extends Resource, Component {
    progress?: ProgressResource;
    can_be_deleted: boolean;
}
