import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { ProjectResource } from '@/support/interfaces/resources';

export default function ({ project }: { project: ProjectResource }) {
    console.log(project);
    return (
        <div className="space-y-4">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Kode TS</TableHead>
                        <TableHead>Susunan Kereta</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {project?.trainsets?.map(trainset => (
                        <TableRow key={trainset.id}>
                            <TableCell>{trainset.name}</TableCell>
                            <TableCell>
                                {trainset.carriages &&
                                    trainset.carriages.length > 0 &&
                                    trainset.carriages.map((carriage, index) => (
                                        <span key={carriage.id}>
                                            {carriage.qty} {carriage.type}
                                            {index < trainset.carriages!.length - 1 && ' + '}
                                        </span>
                                    ))}
                            </TableCell>
                            <TableCell>
                                {/*<Link*/}
                                {/*    className={buttonVariants({ variant: 'link' })}*/}
                                {/*    href={route(`${ROUTES.PROJECTS}.edit`, trainset.id)}*/}
                                {/*>*/}
                                {/*    Edit*/}
                                {/*</Link>*/}
                                {/*<Button variant="link" onClick={() => handleProjectDeletion(trainset.id)}>*/}
                                {/*    Delete*/}
                                {/*</Button>*/}
                                {/*<Link*/}
                                {/*    className={buttonVariants({ variant: 'link' })}*/}
                                {/*    href={route(`${ROUTES.PROJECTS}.show`, trainset.id)}*/}
                                {/*>*/}
                                {/*    Detail*/}
                                {/*</Link>*/}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
