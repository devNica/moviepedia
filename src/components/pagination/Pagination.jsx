import './pagination.css'

const Pagination = ({totalItems, handleFunction}) => {

    const pages = ([...Array(totalItems).keys()].map((e,i) => i+1)).map(number=>(
        <li key={number} className="page-item" onClick={()=>handleFunction(number)}>
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