import { useEffect, useState } from 'react';
import axios from '../utils/axios';
import Sidenav from './partials/Sidenav';
import Topnav from './partials/Topnav';
import Header from './partials/Header';
import Horizontal from './partials/HorizontalCards';
import Dropdown from './partials/Dropdown';
import Loading from './Loading';
import { motion } from 'framer-motion';

const Home = () => {
    document.title = 'Showhub | All Your Shows, All in One Hub';

    const [wallpaper, setwallpaper] = useState(null);
    const [trending, settrending] = useState(null);
    const [category, setcategory] = useState('all');

    const setwallpaperHeader = async () => {
        try {
            const { data } = await axios.get(`/trending/all/day`);
            const randomData = data.results[(Math.random() * data.results.length).toFixed()];
            setwallpaper(randomData);
        } catch (error) {
            console.log('error:', error);
        }
    };

    const GetTrending = async () => {
        try {
            const { data } = await axios.get(`/trending/${category}/day`);
            settrending(data.results);
        } catch (error) {
            console.log('Error: ', error.response.data);
        }
    };

    useEffect(() => {
        GetTrending();
        !wallpaper && setwallpaperHeader();
    }, [category]);

    const fadeIn = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5 } }
    };

    const slideIn = {
        hidden: { x: '-100vw' },
        visible: { x: 0, transition: { type: 'spring', stiffness: 100 } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const staggerItem = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
    };

    return wallpaper && trending ? (
        <>
            <Sidenav />
            <motion.div 
                className='w-full sm:w-[80%] h-full' 
                initial="hidden" 
                animate="visible" 
                variants={fadeIn}
            >
                <Topnav />
                <motion.div variants={slideIn}>
                    <Header data={wallpaper} />
                </motion.div>
                <motion.div 
                    className='mt-2 mb-2 pl-5 pr-5 flex items-center justify-between' 
                    initial="hidden" 
                    animate="visible" 
                    variants={staggerContainer}
                >
                    <motion.h1 className='text-zinc-300 text-3xl font-semibold' variants={staggerItem}>
                        Trending
                    </motion.h1>
                    <motion.div variants={staggerItem}>
                        <Dropdown title='Filter' options={['all', 'tv', 'movie']} func={(e) => setcategory(e.target.value)} />
                    </motion.div>
                </motion.div>
                <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
                    <Horizontal data={trending} />
                </motion.div>
            </motion.div>
        </>
    ) : <Loading />;
}

export default Home;
