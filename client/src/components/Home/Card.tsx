import { Link } from 'react-router-dom'

interface CardProps {
    img: string;
    id: number;
    title: string;
    price: number;
}

function Card(props: CardProps) {

    const {img, title, price, id} = props

    return (
        <>
            <Link to={`/product/${id}`} className='block duration-200 hover:shadow-xl shadow-md h-[410px] outline-[0.1px] outline-gray-200'>
                <div className='flex flex-col items-center justify-center font-medium gap-5 px-2 py-4 h-full'>
                    <img src={img} className='object-contain h-[250px] w-full p-5 hover:scale-105 duration-200'/>
                    <div className='w-full line-clamp-2 text-lg text-center grow'>{title}</div>
                    <div className='text-2xl'>{price + ' €'}</div>
                </div>
            </Link>
        </>
    )
}

export default Card