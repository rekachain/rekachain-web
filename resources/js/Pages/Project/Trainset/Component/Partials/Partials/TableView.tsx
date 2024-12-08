import { PaginateResponse } from '@/Support/Interfaces/Others'
import { ProjectComponentResource, ProjectResource, TrainsetResource } from '@/Support/Interfaces/Resources'
import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/Components/UI/table';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import Import from '../Import';

export default function TableView(
    {
        project,
        trainset,
        componentResponse
    }:{
        project:ProjectResource,
        trainset:TrainsetResource
        componentResponse:PaginateResponse<ProjectComponentResource>
    }
) {
    const { t } = useLaravelReactI18n();
  return (
    <div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            {t(
                                'pages.project.component.partials.partials.component_table.headers.name',
                            )}
                        </TableHead>
                        <TableHead>
                            {t(
                                'pages.project.component.partials.partials.component_table.headers.description',
                            )}
                        </TableHead>
                        <TableHead>
                            {t(
                                'pages.project.component.partials.partials.component_table.headers.total_qty',
                            )}
                        </TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {componentResponse?.data.map((data) => (
                        <TableRow key={data.component.id}>
                            <TableCell>{data.component.name}</TableCell>
                            <TableCell>{data.component.description}</TableCell>
                            <TableCell>{data.total_qty}</TableCell>
                            <TableCell>
                                <Import
                                    trainset={trainset}
                                    project={project}
                                    hasMaterials={data.has_materials}
                                    component={data.component}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
    </div>
  )
}
