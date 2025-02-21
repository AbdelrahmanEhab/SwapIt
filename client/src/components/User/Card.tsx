import { Link } from 'react-router-dom'
import { useState } from 'react';

interface CardProps {
    img: string;
    title: string;
    price: string;
    state: string
}

function Card(props: CardProps) {

    const {img, title, price, state} = props
    const [sold, setSold] = useState<boolean>(false)

    return (
        <>
            <div className='hover:scale-101 duration-200 hover:shadow-lg shadow-md flex-none h-[450px]'>
                <div className='flex flex-col items-center justify-center font-light gap-5 px-2 py-4'>
                    <Link to='/product/1'>
                        <img src={img} className='object-cover h-[250px] w-[250px]'/>
                    </Link>
                    <div className='w-full line-clamp-2 font-medium text-xl text-center'>{title}</div>
                    <div className='font-medium text-2xl'>{price + ' €'}</div>
                    
                    { state === 'History' && (!sold ? <button 
                    className='text-white bg-blue-800 px-4 py-2 hover:outline-1 hover:outline-blue-800 hover:text-blue-800 hover:bg-white cursor-pointer hover:scale-105 duration-200 w-55'
                    onClick={() => setSold(!sold)}>
                        Mark As Sold
                    </button> : <button className='text-white bg-gray-600 px-4 py-2 w-55 hover:scale-105 duration-200' disabled>
                        Sold
                    </button>)}

                    { state === 'Favourites' && (!sold ? <button 
                    className='text-white bg-blue-800 px-4 py-2 hover:outline-1 hover:outline-blue-800 hover:text-blue-800 hover:bg-white cursor-pointer hover:scale-105 duration-200 w-55'
                    onClick={() => setSold(!sold)}>
                        Remove From Favourites
                    </button> : <button className='text-white bg-gray-600 px-4 py-2 w-55 hover:scale-105 duration-200' disabled>
                        Removed
                    </button>)}
                </div>
            </div>
        </>
    )
}

export default Card