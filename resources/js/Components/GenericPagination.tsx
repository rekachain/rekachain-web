import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/Components/UI/pagination';
import { PaginateMeta, PaginateMetaLink } from '@/Support/Interfaces/Others';
import { PAGINATION_NAVIGATOR } from '@/Support/Constants/paginationNavigator';

export default function ({
    meta,
    handleChangePage,
}: {
    meta?: PaginateMeta;
    handleChangePage: (page: number) => void;
}) {
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
        return <div dangerouslySetInnerHTML={obj} onClick={() => console.log(fixPagination(html))}></div>;
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
                if (meta.current_page !== 1) return <PaginationPrevious onClick={navigateToPrevious} />;
            } else if (link.label === PAGINATION_NAVIGATOR.NEXT) {
                if (meta.current_page !== meta.last_page) return <PaginationNext onClick={navigateToNext} />;
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
                            isActive={meta.current_page === fixPagination(link.label)}
                            onClick={() =>
                                handleChangePage(fixPagination(link.label) ?? PAGINATION_NAVIGATOR.FIRST_PAGE)
                            }
                        >
                            <ParsedPagination html={link.label} />
                        </PaginationLink>
                    </PaginationItem>
                );
            }
        };

        return (
            <div className="cursor-pointer">
                <GeneratedPagination />
            </div>
        );
    };

    return (
        meta && (
            <Pagination>
                <PaginationContent>
                    {meta.links.map(link => (
                        <ConditionallyRenderPagination key={link.label} link={link} />
                    ))}
                </PaginationContent>
            </Pagination>
        )
    );
}
