
export default function Pagination({page, setPage}) {

    const goToPage = (newPage) => {
        if(newPage > 0) {
            setPage(newPage);
        }
    }
    return (
        <>
            <div className="border-0 mt-5" aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item">
                        <a 
                        disabled = {page <= 1} 
                        onClick={() => goToPage(page - 1)}
                        className="page-link bg-darkGrey border-0" 
                        href="#" 
                        aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    <li className="page-item"><a className="page-link border-0 bg-darkGrey" href="#">{page}</a></li>
                    <li className="page-item">
                        <a 
                        onClick={() => goToPage(page + 1)}
                        className="page-link bg-darkGrey border-0" 
                        href="#" 
                        aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </div>
        </>
    )
}