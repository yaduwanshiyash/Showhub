import { Link } from 'react-router-dom';

const Header = ({ data }) => {
   // console.log(data);
    return (
        <div style={{
            background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5), rgba(0,0,0,.8)), url(https://image.tmdb.org/t/p/original/${data.backdrop_path || data.profile_path
                })`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
        }} className="w-full h-[50vh] flex flex-col justify-end items-start p-[5%]">
            <h1 className='text-5xl mb-2 font-black w-[70%]'>{data.title || data.orignal_name || data.orignal_title || data.name}</h1>
            <p className='w-[75%] mb-8 '>{data.overview.slice(0, 200)}...<Link className='text-blue-400'>more</Link></p>
            <p>
                <i className="text-yellow-500 ri-megaphone-fill"></i>{" "}
                {data.release_date || "No Information"}
                <i className="ml-5 text-yellow-500 ri-album-fill"></i>{" "}
                {data.media_type.toUpperCase()}
            </p>
            <Link className='bg-[#6550CD] mt-4 font-lg px-4 py-4 rounded'>Watch Trailer</Link>
        </div>
    )
}

export default Header