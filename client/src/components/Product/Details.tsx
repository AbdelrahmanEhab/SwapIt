import { FaAngleDoubleLeft, FaTelegramPlane  } from "react-icons/fa";
import { useEffect, useState } from "react";
import { RiStarFill } from "react-icons/ri";
import { useParams } from "react-router-dom";


async function fetchProduct(id: string | null) {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`)
    return response.json()
}

function Details() {

    const {id} = useParams();
    const [currentImg, setCurrentImg] = useState<number>(0)
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [price, setPrice] = useState<number>(0)
    const [images, setImages] = useState<string[]>([])
    const [username, setUsername] = useState<string>('username')
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        async function getProduct() {
            setLoading(true)
            const product = await fetchProduct(id)
            setTitle(product.title)
            setDescription(product.description)
            setPrice(product.price)
            setImages([product.image, product.image, product.image, product.image])
            setLoading(false)
        }
        getProduct()
    }, [id])



    const prevImage = () : void => setCurrentImg((currentImg - 1 + images.length) % images.length)
    const nextImage = () : void => setCurrentImg((currentImg+1) % images.length)


    return (
        <>
            {loading ? (
                <div className="grow flex justify-center items-center w-full h-full px-5 py-10">
                    <div className="w-full max-w-[1240px] h-full flex items-center justify-center">
                        <div>loading</div>
                    </div>
                </div>
            ) : (
                <div className="grow flex justify-center items-center w-full h-full px-5 py-10">
                <div className="w-full max-w-[1240px] h-full flex items-center justify-center">
                    <div className="grid 2xl:grid-cols-2 justify-center items-start gap-8">
                        <div className='relative px-15'>
                            <button className='absolute text-black font-light top-[50%] translate-y-[-50%] left-0 px-5 h-full cursor-pointer hover:scale-115 duration-200 z-10'
                            onClick={prevImage}>
                                <FaAngleDoubleLeft size={30}/>
                            </button>
                            <button className='absolute text-black font-light top-[50%] translate-y-[-50%] right-0 px-5 h-full cursor-pointer rotate-180 hover:scale-115 duration-200 z-10'
                            onClick={nextImage}>
                                <FaAngleDoubleLeft size={30}/>
                            </button>
                            <div className="w-full sm:h-[500px] h-[340px] overflow-hidden">
                                <div
                                  className="flex transition-transform duration-500"
                                  style={{ transform: `translateX(-${currentImg * 100}%)` }}
                                >                            
                                  {images.map((image, index) => (
                                    <a href={image} key={index} className="w-full sm:h-[500px] h-[340px] flex-shrink-0">
                                        <img
                                        src={image}
                                        alt={`Slide ${index + 1}`}
                                        className="w-full h-full object-contain"
                                    />
                                    </a>
                                  ))}
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col items-start font-light gap-5 mt-20'>
                            <h1 className='font-medium text-3xl break-all'>{title}</h1>
                            <p>{description}</p>
                            <h3 className="text-3xl font-medium">{price + ' €'}</h3>
                            <div className="flex justify-between items-center w-full">
                                <div className="text-center">
                                    <p>Posted By</p>
                                    <div>{username}</div>
                                </div>
                                <div className="text-center">
                                    <p>Rating</p> 
                                    <div className="flex">
                                        <RiStarFill />
                                        <RiStarFill />
                                        <RiStarFill />
                                        <RiStarFill />
                                        <RiStarFill />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col w-full gap-2">
                                <a href="" target="_blank"  className="2xl:w-fit w-full">
                                    <div className="flex items-center justify-center gap-2 font-medium px-4 py-2 text-white bg-blue-800 hover:outline-1     hover:outline-blue-800 hover:text-blue-800 hover:bg-white hover:scale-105 duration-300">
                                        <p>Contact</p>
                                        <FaTelegramPlane/>
                                    </div>
                                </a>
                                <button className="flex items-center justify-center gap-2 font-medium px-4 py-2 text-white bg-blue-800 hover:outline-1  hover:outline-blue-800 hover:text-blue-800 hover:bg-white hover:scale-105 duration-300 2xl:w-fit w-full cursor-pointer">
                                    Add to Favourites
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )}
        </>
    )
}

export default Details