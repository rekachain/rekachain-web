import { Component } from '../Models';
import { ProgressResource, Resource } from '';

export interface ComponentResource extends Resource, Component {
    progress?: ProgressResource;
    can_be_deleted: boolean;
}
