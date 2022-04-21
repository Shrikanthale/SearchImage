import React, { useState, useEffect } from 'react';
import { Grid } from '@giphy/react-components'
import { GiphyFetch } from '@giphy/js-fetch-api'
import axios from 'axios';
import Pagination from './Pagination';

const Photo = () => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('https://api.giphy.com/v1/gifs/trending', {
                params: {
                    api_key: 'Dst7UyI10lCaZeA9seXlAWA2qaXf0uGY',
                    limit: 100
                }
            });
            // console.log(result);
            setData(result.data.data);
        }
        fetchData();
    }, []);
    // const gif = new GiphyFetch('Dst7UyI10lCaZeA9seXlAWA2qaXf0uGY');

    const handleSearch = (e) => {
        setSearch(e.target.value);
    }

    const handleRes = async (e) => {
        e.preventDefault();
        try {
            // const result = await axios.get(`https://api.giphy.com/v1/gifs/${search}`, {
            const result = await axios.get('https://api.giphy.com/v1/gifs/search', {
                params: {
                    api_key: 'Dst7UyI10lCaZeA9seXlAWA2qaXf0uGY',
                    q: search,
                    limit: 20
                }
            });
            setData(result.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const pageSelected = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {/* <Grid width={1500} columns={5} fetchGifs={fetchGifs} /> */}
            <form className='form'>
                <input type='text' placeholder='search here' className='form-control' onChange={handleSearch} value={search} />
                <button type='submit' className='btn' onClick={handleRes}>Go</button>
            </form>
            <div className='container gifs'>
                {
                    currentItems.map(elem => {
                        return (

                            <div className='gif' key={elem.id}>
                                <img src={elem.images.fixed_height.url} />
                            </div>
                            // console.log(elem.images.fixed_height.url)
                        )
                    })
                }
            </div>
            <Pagination pageSelected={pageSelected} currentPage={currentPage} itemsPerPage={itemsPerPage} totalItems={data.length} />
        </div>

    )
}

export default Photo;