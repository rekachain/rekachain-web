import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import AnimateIn from '@/lib/AnimateIn';
import { Head } from '@inertiajs/react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/Components/ui/accordion';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';

export default function DetailTrainset() {
    return (
        <div className="">
            <AuthenticatedLayout>
                <Head title="Detail Trainset" />
                <div className="py-12">
                    <div className="max-w-7xl h-screen sm:px-6 lg:px-8 space-y-6 ">
                        <h1 className="text-2xl font-bold">Trainset 1</h1>
                        <AnimateIn
                            from="opacity-0 -translate-y-4"
                            to="opacity-100 translate-y-0 translate-x-0"
                            duration={300}
                        >
                            {/* <div className="p-4 sm:p-8 bg-white h-fit dark:bg-gray-800 shadow sm:rounded-lg"> */}
                            <Accordion type="single" collapsible>
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>Gerbong 1</AccordionTrigger>
                                    <AccordionContent>
                                        <div className="p-2">
                                            <Input placeholder="Gerbong 1"></Input>
                                            <div className="flex mt-2 gap-4">
                                                <Input placeholder="Nama Panel"></Input>
                                                <Input placeholder="Jumlah"></Input>
                                                <Button>Tambah Panel</Button>
                                            </div>
                                            <hr className="mt-4 border-black" />
                                            <div className="flex mt-4 gap-4 justify-between items-center ">
                                                <p className="pl-2">Panel 1</p>
                                                <p>x 12</p>
                                                <Button>Detail KPM</Button>
                                            </div>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                            <Button className="mt-5 w-full">Tambah Gerbong</Button>
                            {/* </div> */}
                        </AnimateIn>
                    </div>
                </div>
            </AuthenticatedLayout>
        </div>
    );
}
