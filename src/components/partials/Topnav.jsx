import axios from '../../utils/axios'
import { useEffect, useState, useRef  } from 'react'
import { Link } from 'react-router-dom'
import NotFound from '../../../public/image.jpg'

const Topnav = () => {
    const [query, setquery] = useState('')
    const [searches, setsearches] = useState([])

    const getSearch = async () => {
        try {
            const { data } = await axios.get(`/search/multi?query=${query}`)
           // console.log(data.results);
            setsearches(data.results)
        } catch (error) {
            console.log('error:', error);
        }
    }
    useEffect(() => {
        getSearch();
    }, [query])


    const searchInputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === '/') {
        event.preventDefault(); 
        searchInputRef.current.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
    
    
    return (
        <div className=' w-[80%]   h-[10vh] relative mx-auto flex items-center '>
            <i className="ml-5 text-zinc-400 text-3xl ri-search-line"></i>
            <input  ref={searchInputRef} onChange={(e) => setquery(e.target.value)} value={query}
                className='w-[50%] text-xl p-5 mx-10 bg-transparent border-none outline-none text-zinc-400'
                type="text" placeholder='Search Anything ? Type / to search' />
            {query.length > 0 && (
                <i onClick={() => setquery('')} className="text-zinc-400 text-3xl ri-close-line"></i>
            )}

            <div className='absolute sm:w-[50%] w-[85%] max-h-[50vh] overflow-auto bg-zinc-200 top-[90%] left-10 '>
                {searches.map((s, i) => (
                    <Link  to={`/${s.media_type}/details/${s.id}`} key={i} className="hover:text-black hover:bg-zinc-300 duration-300 font-semibold text-zinc-600 w-[100%] p-10 flex justify-start items-center border-b-2 border-zinc-100">
                        <img className='w-[10vh] h-[10vh] mr-10 rounded-md object-cover' src={s.backdrop_path || s.profile_path ? `https://image.tmdb.org/t/p/original/${s.backdrop_path || s.profile_path} ` : NotFound} alt="" />
                        <span className='text-zinc-700'>{s.original_title || s.name || s.title || s.original_name}</span>
                    </Link>
                ))}

            </div>

        </div>
    )
}

export default Topnav