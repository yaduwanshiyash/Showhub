import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Dropdown from './partials/Dropdown'
import Topnav from './partials/Topnav'
import axios from '../utils/axios'
import Cards from './partials/Cards'
import InfiniteScroll from 'react-infinite-scroll-component'
import Loading from './Loading'

const Trending = () => {
    document.title = "Showhub | Trending";
    const navigate = useNavigate()
    const [category, setcategory] = useState('all')
    const [duration, setduration] = useState('day')
    const [trending, settrending] = useState([])
    const [hasMore, sethasMore] = useState(true)
    const [page, setpage] = useState(1)

    const GetTrending = async () => {
        try {
            const { data } = await axios.get(`trending/${category}/${duration}?page=${page}`)
            //settrending(data.results)
            if (data.results.length > 0) {
                settrending((prevState => [...prevState, ...data.results]))
                setpage(page + 1)
            }
            else {
                sethasMore(false)
            }
        } catch (error) {
            console.log(error);
        }
    }
    //  console.log(trending);
    const refershHandler = () => {
        if (trending.length === 0) {
            GetTrending();
        } else {
            setpage(1);
            settrending([]);
            GetTrending();
        }
    };
    useEffect(() => {
        refershHandler()
    }, [category, duration])

    return trending.length > 0 ? (
        <div className='w-screen  h-fit '>
            <div className='w-full flex justify-between items-center'>
                <h1 className='text-zinc-400 text-2xl p-10 font-semibold'> <i
                    onClick={() => navigate(-1)}
                    className="hover:text-[#6556CD] text-zinc-400 ri-arrow-left-line"
                ></i> Trending</h1>
                <div className='w-[80%] flex items-center '>
                    <Topnav />
                    <Dropdown  title='Category' options={['all', 'tv', 'movie']} func={(e) => setcategory(e.target.value)}/>
                    <div className='w-[2%]'></div>
                    <Dropdown  title='Duration' options={['day', 'week']} func={(e) => setduration(e.target.value)}/>

                </div>
            </div>
            <InfiniteScroll
                dataLength={trending.length}
                next={GetTrending}
                hasMore={true}
                loader={<h4>Loading...</h4>}
            >

                <Cards data={trending} title={category} />
            </InfiniteScroll>
        </div>
    ) : (<Loading />)
}

export default Trending
