import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/Components/UI/pagination';
import { PAGINATION_NAVIGATOR } from '@/Support/Constants/paginationNavigator';
import { PaginateMeta, PaginateMetaLink } from '@/Support/Interfaces/Others';
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon } from 'lucide-react';
import { Button } from './UI/button';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function ({
    meta,
    handleChangePage,
    isCompact = false,
}: {
    meta?: PaginateMeta;
    handleChangePage: (page: number) => void;
    isCompact?: boolean;
}) {
    const { t } = useLaravelReactI18n();
    const fixPagination = (link: string) => {
        // convert link to number, if it's not a number, it's a string
        const pageNumber = Number(link);
        // if it's a number, it's a page number
        if (!isNaN(pageNumber)) {
            return pageNumber;
        }
        // if it's not a number, it's a string
        // check if it's an url
        if (!link) {
            return null;
        }
        // if it's an url, extract the page number
        const url = new URL(link);
        const page = url.searchParams.get('page');
        return Number(page);
    };

    const ParsedPagination = ({ html }: { html: string }) => {
        const obj = { __html: html };
        return (
            <div
                onClick={() => console.log(fixPagination(html))}
                dangerouslySetInnerHTML={obj}
            ></div>
        );
    };

    const ConditionallyRenderPagination = ({ link }: { link: PaginateMetaLink }) => {
        if (!meta) {
            return null;
        }
        const navigateToPrevious = () => {
            if (meta.current_page > 1) {
                handleChangePage(meta.current_page - 1);
            }
        };

        const navigateToNext = () => {
            if (meta.current_page < meta.last_page) {
                handleChangePage(meta.current_page + 1);
            }
        };

        const navigateToPage = (page: number) => {
            handleChangePage(page);
        };
        const GeneratedPagination = () => {
            if (link.label === PAGINATION_NAVIGATOR.PREVIOUS) {
                if (meta.current_page !== 1)
                    return <PaginationPrevious onClick={navigateToPrevious} />;
            } else if (link.label === PAGINATION_NAVIGATOR.NEXT) {
                if (meta.current_page !== meta.last_page)
                    return <PaginationNext onClick={navigateToNext} />;
            } else if (link.label === PAGINATION_NAVIGATOR.ELLIPSIS) {
                return (
                    <PaginationItem key={link.label}>
                        <PaginationLink onClick={() => {}}>
                            <ParsedPagination html={link.label} />
                        </PaginationLink>
                    </PaginationItem>
                );
            } else {
                return (
                    <PaginationItem key={link.label}>
                        <PaginationLink
                            onClick={() =>
                                handleChangePage(
                                    fixPagination(link.label) ?? PAGINATION_NAVIGATOR.FIRST_PAGE,
                                )
                            }
                            isActive={meta.current_page === fixPagination(link.label)}
                        >
                            <ParsedPagination html={link.label} />
                        </PaginationLink>
                    </PaginationItem>
                );
            }
        };

        return (
            <div className='cursor-pointer'>
                <GeneratedPagination />
            </div>
        );
    };

    return (
        meta && (
            <Pagination>
                <PaginationContent className=' '>
                    <div className='grid grid-cols-8 md:flex'>
                        {!isCompact ? meta.links.map((link, index) => (
                            <ConditionallyRenderPagination
                                link={link}
                                key={`${link.label}-${index}`}
                            />
                        )) : (
                            <>
                            <div className="flex items-center justify-between px-4">
                                <div className="flex w-full items-center gap-8 lg:w-fit">
                                    <div className="flex w-fit items-center justify-center text-sm font-medium">
                                    {t('pagination.current_page_of_total_pages', {
                                        current_page: meta.current_page,
                                        total_pages: meta.last_page,
                                    })}
                                    </div>
                                    <div className="ml-auto flex items-center gap-2 lg:ml-0">
                                    <Button
                                        variant="outline"
                                        className="h-8 w-8 p-0 flex"
                                        onClick={() => handleChangePage(1)}
                                        disabled={meta.current_page === 1}
                                    >
                                        <ChevronsLeftIcon />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="size-8"
                                        size="icon"
                                        onClick={() => handleChangePage(meta.current_page - 1)}
                                        disabled={meta.current_page - 1 === 0}
                                    >
                                        <ChevronLeftIcon />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="size-8"
                                        size="icon"
                                        onClick={() => handleChangePage(meta.current_page + 1)}
                                        disabled={meta.current_page + 1 > meta.last_page}
                                    >
                                        <ChevronRightIcon />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="h-8 w-8 p-0 flex"
                                        size="icon"
                                        onClick={() => handleChangePage(meta.last_page)}
                                        disabled={meta.current_page === meta.last_page}
                                    >
                                        <ChevronsRightIcon />
                                    </Button>
                                    </div>
                                </div>
                            </div>
                            </>
                        )}
                    </div>
                </PaginationContent>
            </Pagination>
        )
    );
}
