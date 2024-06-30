import notfound from '../../public/404.gif'

const NotFound = () => {
    return (
        <div className='w-screen h-screen bg-black  flex items-center justify-center'>
            <img src={notfound} className='h-[50%] object-cover' alt="" />
        </div>
    )
}

export default NotFound