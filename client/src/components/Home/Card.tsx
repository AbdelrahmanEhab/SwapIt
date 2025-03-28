import { Link } from 'react-router-dom'

interface CardProps {
    img: string;
    id: number;
    title: string;
    price: number;
    description: string;
}

const Card : React.FC<CardProps> = ({img, title, price, id, description}) => {

    return (
        <>
            <Link to={`/product/${id}`} className='block duration-200 hover:shadow-xl shadow-md h-[470px] outline-[0.1px] outline-gray-200'>
                <div className='flex flex-col items-center justify-center font-medium gap-5 px-2 py-4 h-full'>
                    <img src={img} className='object-contain h-[250px] w-full p-5 hover:scale-105 duration-200'/>
                    <div className='w-full line-clamp-2 text-lg grow'>{title}</div>
                    <div className='font-light w-full line-clamp-2'>{description}</div>
                    <div className='text-2xl w-full px-1 text-blue-800'>{price + ' €'}</div>
                </div>
            </Link>
        </>
    )
}

export default Card