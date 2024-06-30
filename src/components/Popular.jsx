import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Topnav from './partials/Topnav'
import Dropdown from './partials/Dropdown'
import Cards from './partials/Cards'
import axios from '../utils/axios'
import InfiniteScroll from 'react-infinite-scroll-component'
import Loading from './Loading'

const Popular = () => {
    document.title = 'Showhub |  Popular'

    const navigate = useNavigate()
    const [popular, setpopular] = useState([])
    const [category, setcategory] = useState('tv')
    const [page, setpage] = useState(1)
    const [hasMore, sethasMore] = useState(true)

    const GetPopular = async () => {
        try {
            const { data } = await axios.get(`${category}/popular?page=${page}`)
            if (data.results.length > 0) {
                setpopular(prevState => [...prevState, ...data.results])
                setpage(page + 1)
            }
            else {
                sethasMore(false)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const refershHandler = () => {
        if (popular.length === 0) {
            GetPopular();
        } else {
            setpage(1);
            setpopular([]);
            GetPopular();
        }
    };

    useEffect(() => {
        refershHandler();
    }, [category]);
    return popular.length > 0 ? (
        <div className='w-screen h-fit'>
            <div className='w-full flex items-center justify-between px-[5%]'>
                <h1 className=" text-2xl font-semibold text-zinc-400">
                    <i
                        onClick={() => navigate(-1)}
                        className="hover:text-[#6556CD] ri-arrow-left-line"
                    ></i>{" "}
                    Popular
                </h1>
                <div className='flex items-center w-[80%]'>
                    <Topnav />
                    <Dropdown title="category" options={["tv", "movie"]} func={(e) => setcategory(e.target.value)} />
                </div>
            </div>
            <InfiniteScroll
                dataLength={popular.length} //This is important field to render the next data
                next={GetPopular}
                hasMore={true}
                loader={<h4>Loading...</h4>}
            >

                <Cards data={popular} title={category} />
            </InfiniteScroll>
        </div>
    ) : (<Loading />)
}

export default Popular