interface PaginationProps {
    page: number;
    setPage: (page: number) => void;
    hasNextPage: boolean;
}
const Pagination = ({ page, setPage, hasNextPage }: PaginationProps) => {
    const handleNextPage = () => {
        setPage(page + 1);
    };

    const handlePrevPage = () => {
        setPage(page - 1);
    };

    return (
        <div className="pagination">
            <button onClick={handlePrevPage} disabled={page === 1}>
                이전
            </button>
            <span>{page}</span>
            <button onClick={handleNextPage} disabled={!hasNextPage}>
                다음
            </button>
        </div>
    );
}