import React from 'react';

const Pagination = ({ currentPage, itemsPerPage, totalItems, pageSelected }) => {
    const pageNumber = [];
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumber.push(i);
    }
    return (
        <div className='pagination'>
            <ul>
                {
                    pageNumber.map(num => {
                        let classes = "page-item";
                        if (num === currentPage) {
                            classes += "active";
                        }
                        return (
                            <>
                                <li className='page-item' style={{ display: 'inline', margin: '5px' }}>
                                    <a onClick={() => pageSelected(num)} href={num} className='page-link' style={{ color: 'blue', background: 'white', padding: '10px', textDecoration: 'none' }}>{num}</a>
                                </li>
                            </>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Pagination;