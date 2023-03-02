import './pagination.css'

const Pagination = ({totalItems}) => {

    const pages = ([...Array(totalItems).keys()].map((e,i) => i+1)).map(number=>(
        <li key={number} className="page-item">
            <a href="!#" className="page-link">
                {number}
            </a>
        </li>
    ))

    return (
        <nav className="pagination-container">
            <ul className="pagination">
                { pages }
            </ul>
        </nav>
    )
}


export default Pagination