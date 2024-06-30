import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Sidenav = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 640) {
                setIsSidebarOpen(true);
            } else {
                setIsSidebarOpen(false);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            <i 
                onClick={toggleSidebar} 
                className={`ri-menu-line fixed top-3 left-5 bg-zinc-400 rounded-sm px-2 py-1 cursor-pointer z-20 sm:hidden ${isSidebarOpen ? 'hidden' : 'block'}`}
            ></i>
            <motion.div 
                initial={{ x: '-100%' }} 
                animate={{ x: isSidebarOpen ? '0%' : '-100%' }} 
                transition={{ type: 'tween', ease: 'easeInOut', duration: 0.5 }} 
                className="sm:relative absolute z-10 bg-zinc-800 w-[60%] sm:w-[20%] h-full border-zinc-400 p-10 border-r-2 sm:translate-x-0"
            >
                <i 
                    onClick={toggleSidebar} 
                    className="ri-close-line absolute top-3 bg-red-400 rounded-sm px-2 py-1 left-5 cursor-pointer sm:hidden"
                ></i>
                <h1 className='text-2xl font-bold flex items-center'>
                    <img className='h-10 ml-5 w-10 object-cover' src={"/icons8-movie-64.png"} alt="Logo" />
                    <span className='p-1'>Show</span>
                    <span className='p-1 bg-[#EF921C] rounded-lg text-black'>hub</span>
                </h1>
                <nav className='text-xl font-semibold text-zinc-300 flex flex-col gap-5'>
                    <h1 className='mt-10'>New Feeds</h1>
                    <Link to="/trending" className='text-xl text-zinc-300 hover:bg-[#6556CD] p-4 rounded-lg duration-300 flex items-center'>
                        <i className="ri-fire-fill text-zinc-400 mr-2"></i> Trending
                    </Link>
                    <Link to="/popular" className='hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-4 flex items-center'>
                        <i className="mr-2 text-zinc-400 ri-bard-fill"></i> Popular
                    </Link>
                    <Link to="/movie" className='hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-4 flex items-center'>
                        <i className="mr-2 text-zinc-400 ri-movie-2-fill"></i> Movies
                    </Link>
                    <Link to="/tv" className='hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-4 flex items-center'>
                        <i className="mr-2 text-zinc-400 ri-tv-2-fill"></i> TV Shows
                    </Link>
                    <Link to="/person" className='hover:bg-[#6556CD] text-zinc-400 hover:text-white duration-300 rounded-lg p-4 flex items-center'>
                        <i className="mr-2 text-zinc-400 ri-team-fill"></i> People
                    </Link>
                </nav>
                <hr className='bg-zinc-600 mt-6' />
                <nav className='flex text-xl font-semibold flex-col text-zinc-300 mt-6'>
                    <h1 className='text-2xl mt-5 mb-5 font-semibold'>Website Information</h1>
                    <Link to="/about" className='hover:bg-[#6556CD] p-2 flex items-center duration-200 rounded-lg'>
                        <i className="mr-2 text-zinc-300 ri-information-fill"></i> About
                    </Link>
                    <Link to="/contact" className='hover:bg-[#6556CD] duration-200 p-2 flex items-center rounded-lg'>
                        <i className="mr-2 text-zinc-300 ri-phone-fill"></i> Contact Us
                    </Link>
                </nav>
            </motion.div>
        </>
    );
}

export default Sidenav;
