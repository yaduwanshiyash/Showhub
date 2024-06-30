import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import { asynclaodmovie } from "../store/actions/movieAction";
import { removemovie } from '../store/reducers/movieSlice'
import Loading from '../components/Loading'
import HorizontalCards from '../components/partials/HorizontalCards'

const MovieDetails = () => {
    const { pathname } = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()
    const { info } = useSelector(state => state.movie)
    console.log(info);
    useEffect(() => {
        dispatch(asynclaodmovie(id))

        return () => {
            dispatch(removemovie())
        }
    }, [id])
    return info ? (
        <div
            style={{
                background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5), rgba(0,0,0,.8)), 
                url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
            }}
            className="relative w-screen sm:h-[130vh] overflow-hidden h-[200vh] px-[10%] font-normal"
        >
            {/* Part 1 navigation */}
            <nav className='w-full h-[10vh] flex  items-center gap-10 text-xl'>
                <Link
                    onClick={() => navigate(-1)}
                    className="hover:text-[#6556CD] ri-arrow-left-line"
                ></Link>
                <a target="_blank" href={info.detail.homepage}>
                    <i className="ri-external-link-fill hover:text-[#6556CD]"></i>
                </a>
                <a
                    target="_blank"
                    href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
                >
                    <i className="ri-earth-fill hover:text-[#6556CD]"></i>
                </a>

                <a className='hover:text-[#6556CD]'
                    target="_blank"
                    href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}
                >
                    imdb
                </a>
            </nav>
            {/* Part 2 Poster and details */}
            <div className='w-full flex flex-col sm:flex-row'>
                <img
                    className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] rounded h-[50vh] object-cover"
                    src={`https://image.tmdb.org/t/p/original/${info.detail.poster_path || info.detail.backdrop_path
                        }`}
                    alt=""
                />
                <div className='w-full ml-0 sm:ml-20'>
                    <h1 className='text-5xl font-black'>{info.detail.original_title || info.detail.name ||
                        info.detail.title || info.detail.original_name}
                        <small className='text-2xl  font-semibold text-zinc-300'>({info.detail.release_date.split('-')[0]})</small>
                    </h1>
                    <div className="mt-3 mb-5 flex  items-center gap-x-3">
                        <span className="rounded-full text-xl font-semibold bg-yellow-600 text-white w-[5vh] h-[5vh] flex justify-center items-center">
                            {(info.detail.vote_average * 10).toFixed()}
                            <sup>%</sup>
                        </span>
                        <h1 className="w-[60px] font-semibold text-2xl leading-6">
                            User Score
                        </h1>
                        <h1 className='font-normal'>{info.detail.release_date}</h1>
                        <h1 className='font-normal'>
                            {info.detail.genres.map((g) => g.name).join(",")}
                        </h1>
                        <h1 className='font-normal'>{info.detail.runtime}min</h1>
                    </div>
                    <h1 className='text-2xl italic font-medium text-zinc-300'>{info.detail.tagline}</h1>
                    <h1 className="text-2xl sm:mb-3  sm:mt-5  mb-3  mt-5">Overview</h1>
                    <p className='text-md'>{info.detail.overview}</p>
                    <h1 className="text-2xl sm:mb-3  sm:mt-5  mb-3  mt-5">Movie Translated</h1>
                    <p className="mb-10">{info.translations.join(", ")}</p>
                    <Link
                        className="p-5 bg-[#6556CD] rounded-lg"
                        to={`${pathname}/trailer`}
                    >
                        <i className="text-xl ri-play-fill mr-3 "></i>
                        Play Trailer
                    </Link>
                </div>
                {/** Part 3 Recommendations and Similar Stuff */}

            </div>
            <hr className='w-full sm:mt-20 mt-0' />
            <h1 className=" text-3xl font-bold mt-5 text-white ">
                Recommendations & Similar stuff
            </h1>
           <div className=' w-full'>
           <HorizontalCards title="movie" data={info.recommendations.length > 0
                ? info.recommendations
                : info.similar} />  
       <Outlet/>
           </div>
        </div>

    ) : (<Loading />)
}

export default MovieDetails