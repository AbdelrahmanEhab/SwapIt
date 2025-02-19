import { Link } from 'react-router-dom'

interface CardProps {
    img: string;
    title: string;
    price: string;
}

function Card(props: CardProps) {

    const {img, title, price} = props

    return (
        <>
            <Link to='' className='hover:scale-101 duration-200 hover:shadow-lg shadow-md h-[400px]'>
                <div className='flex flex-col items-center justify-center font-light gap-5 px-2 py-4 h-full'>
                    <img src={img} className='object-cover h-[250px] w-full'/>
                    <div className='w-full line-clamp-2 font-medium text-xl text-center'>{title}</div>
                    <div className='font-medium text-2xl'>{price + ' €'}</div>
                </div>
            </Link>
        </>
    )
}

export default Card