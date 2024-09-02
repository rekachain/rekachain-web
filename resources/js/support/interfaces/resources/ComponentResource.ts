import { Component } from '@/support/models';
import { ProgressResource, Resource } from '@/support/interfaces/resources';

export interface ComponentResource extends Resource, Component {
    progress: ProgressResource;
}
