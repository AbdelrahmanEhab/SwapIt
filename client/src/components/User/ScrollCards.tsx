import Card from './Card'
import { FaAngleDoubleLeft} from "react-icons/fa";
import { useState, useEffect } from 'react'

interface Props {
    title: string;
}

type Product = {
    category: string;
    description: string;
    id: number;
    image: string;
    price: number;
    title: string;
}

async function fetchProducts() {
    const response = await fetch('https://fakestoreapi.com/products')
    return response.json()
}

function ScrollCards(props: Props) {

    const {title} = props;
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true)
    const [currentCard, setCurrentCard] = useState<number>(0)

    
    useEffect(() => {
        async function getProducts() {
            const productsData = await fetchProducts();
            setProducts([...productsData, ...productsData]);
            setLoading(false)
        }
        getProducts();
    }, [])

    const prevImage = () : void => setCurrentCard((currentCard - 1 + 5) % 5)
    const nextImage = () : void => setCurrentCard((currentCard+1) % 5)

    return (
        <>
            {loading ? (
                <div className="flex items-center justify-center">
                    <div className="w-full max-w-[1240px] px-15 py-5 relative">
                        <div className='w-full flex items-center justify-center text-xl'>Loading</div>
                    </div>
                </div>
            ) : 
            (
            <div className="flex items-center justify-center">
                <div className="w-full max-w-[1240px] lg:px-15 px-5 py-5 relative">
                    <button className='xl:block hidden absolute text-black font-light top-[50%] translate-y-[-50%] left-0 px-2 h-full cursor-pointer hover:scale-115 duration-200 z-10'
                        onClick={prevImage}>
                        <FaAngleDoubleLeft size={30}/>
                    </button>
                    <button className='xl:block hidden absolute text-black font-light top-[50%] translate-y-[-50%] right-0 px-2 h-full cursor-pointer rotate-180 hover:scale-115 duration-200 z-10'
                        onClick={nextImage}>
                        <FaAngleDoubleLeft size={30}/>
                    </button>
                    <h2 className='font-medium text-3xl'>{title}</h2>
                    <div className='xl:overflow-x-hidden overflow-x-scroll'>
                        <div className='flex gap-4 py-5 transition-transform duration-500'
                        style={{ transform: `translateX(calc(-${currentCard * 100}% - ${currentCard * 16}px))` }}
                        >
                            {
                            products.map(p => (
                                    <Card key={p.id} img={p.image} title={p.title} price={p.price} state={title}/>
                            ))
                        }
                        </div>
                    </div>
                </div>
            </div>
            )
            }
        </>
    )
}

export default ScrollCards