import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/Components/UI/table';
import { PaginateResponse } from '@/Support/Interfaces/Others';
import {
    ProjectPanelResource,
    ProjectResource,
    TrainsetResource,
} from '@/Support/Interfaces/Resources';
import Import from '../Import';

export default function TableView({
    project,
    trainset,
    panelResponse,
}: {
    project: ProjectResource;
    trainset: TrainsetResource;
    panelResponse: PaginateResponse<ProjectPanelResource>;
}) {
    // const [panelResponse, setPanelResponse] = useState<PaginateResponse<ProjectPanelResource>>();
    // const [panelResponseMeta, setPanelResponseMeta] = useState<PaginateMeta>();
    // const [filters, setFilters] = useState<ServiceFilterOptions>({
    //     page: 1,
    //     perPage: 10,
    // }
    // )
    return (
        <>
            <div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nama Panel</TableHead>
                            <TableHead>Deskripsi</TableHead>
                            <TableHead>Total Quantity</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {panelResponse?.data.map((data) => (
                            <TableRow key={data.panel.id}>
                                <TableCell>{data.panel.name}</TableCell>
                                <TableCell>{data.panel.description}</TableCell>
                                <TableCell>{data.total_qty}</TableCell>
                                <TableCell>
                                    <Import
                                        trainset={trainset}
                                        project={project}
                                        panel={data.panel}
                                        hasMaterials={data.has_materials}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    );
}
