import { Link } from 'react-router-dom'
import { useState } from 'react';
import { FaTrash } from "react-icons/fa6";


interface CardProps {
    img: string;
    title: string;
    price: number;
    state: string
}

function Card(props: CardProps) {

    const {img, title, price, state} : CardProps = props
    const [sold, setSold] = useState<boolean>(false)
    const [deleted, setDeleted] = useState<boolean>(false)

    return (
        <>
            <div className='duration-200 hover:shadow-lg shadow-md h-[470px] outline-[0.1px] outline-gray-200'>
                <div className='flex flex-col items-center justify-center font-medium gap-5 px-2 py-4 h-full'>
                    <Link to='/product/1'>
                        <img src={img} className='object-contain h-[250px] w-full p-5 hover:scale-105 duration-200'/>
                    </Link>

                    <div className='grow flex flex-col items-center justify-center gap-5'>
                    <div className='grow w-full line-clamp-2 font-medium text-xl text-center'>{title + "asd asda sd as d as das das;ldm alskdm"}</div>
                    <div className='font-medium text-2xl'>{price + ' €'}</div>
                    </div>
                    
                    { state === 'Posted Items' && (!sold && !deleted ? ( 
                    <div className='flex gap-2 mx-4 my-2'>
                        <button className='text-white bg-blue-800 px-4 py-2 hover:outline-1 hover:outline-blue-800 hover:text-blue-800 hover:bg-white cursor-pointer hover:scale-105 duration-200 w-43' onClick={() => setSold(!sold)}>
                            Sold
                        </button>
                        <button className='text-white bg-blue-800 flex items-center justify-center hover:outline-1 hover:outline-blue-800 hover:text-blue-800 hover:bg-white cursor-pointer hover:scale-105 duration-200 w-10' onClick={() => setDeleted(!deleted)}>
                            <FaTrash size={18}/>
                        </button>
                    </div> 
                    ) : (
                        sold ? 
                        <button className='text-white bg-gray-600 px-4 py-2 w-55 hover:scale-105 duration-200 mx-4' disabled>
                            Sold
                        </button> 
                        :
                        <button className='text-white bg-gray-600 px-4 py-2 w-55 hover:scale-105 duration-200 mx-4' disabled>
                            Deleted
                        </button>
                        )
                    )}
                    { state === 'Favourites' && (!sold ? <button 
                    className='text-white bg-blue-800 px-4 py-2 hover:outline-1 hover:outline-blue-800 hover:text-blue-800 hover:bg-white cursor-pointer hover:scale-105 duration-200 w-55 mx-4'
                    onClick={() => setSold(!sold)}>
                        Remove
                    </button> : <button className='text-white bg-gray-600 px-4 py-2 w-55 hover:scale-105 duration-200 mx-4' disabled>
                        Removed
                    </button>)}
                </div>
            </div>
        </>
    )
}

export default Card