import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Topnav from './partials/Topnav'
import Dropdown from './partials/Dropdown'
import Cards from './partials/Cards'
import axios from '../utils/axios'
import InfiniteScroll from 'react-infinite-scroll-component'
import Loading from './Loading'


const Movies = () => {
    const navigate = useNavigate()

    const [movie, setmovie] = useState([])
    const [page, setpage] = useState(1)
    const [category, setcategory] = useState('now_playing')
    const [hasMore, sethasMore] = useState(true)

    const GetMovie = async () => {
        try {
            const { data } = await axios.get(`/movie/${category}?page=${page}`)
            if (data.results.length > 0) {
                setmovie((prevState => [...prevState, ...data.results]))
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
        if (movie.length === 0) {
            GetMovie()
        }
        else {
            setmovie([])
            setpage(1)
            GetMovie()
        }
    }


    useEffect(() => {
        refershHandler()
    }, [category])

    return movie ? (
        <div className='w-screen h-fit'>
            <div className=" px-[5%] w-full flex items-center justify-between ">
                <h1 className=" text-2xl font-semibold text-zinc-400">
                    <i
                        onClick={() => navigate(-1)}
                        className="hover:text-[#6556CD] ri-arrow-left-line"
                    ></i>{" "}
                    Movie
                    <small className="ml-2 text-sm text-zinc-600">
                        ({category})
                    </small>
                </h1>
                <div className='w-[80%] flex items-center'>

                    <Topnav />
                    <Dropdown title='Category' options={["popular",
                        "top_rated",
                        "upcoming",
                        "now_playing",]} func={(e) => setcategory(e.target.value)} />
                </div>
            </div>


            <InfiniteScroll
                dataLength={movie.length}
                next={GetMovie}
                hasMore={hasMore}
                loader={<Loading/>}
            >
                <Cards data={movie} title="movie" />
            </InfiniteScroll>
        </div>




    ) : (<Loading />)
}

export default Movies