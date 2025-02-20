import { FaAngleDoubleLeft, FaTelegramPlane  } from "react-icons/fa";
import { useState } from "react";
import { RiStarFill } from "react-icons/ri";
import img from '../../assets/imgs/product1.jpg'
import img2 from '../../assets/imgs/product2.jpg'
import img3 from '../../assets/imgs/product3.jpg'
import img4 from '../../assets/imgs/product4.jpg'


const imgs = [img, img2, img3, img4]

function Details() {

    const [currentImg, setCurrentImg] = useState<number>(0)
    const [title, setTitle] = useState<string>('Title')
    const [description, setDescription] = useState<string>('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum exercitationem quaerat et deserunt eos, cum autem perferendis expedita nulla repellendus illo repudiandae laborum dolorum rem sed eum qui voluptatum error!')
    const [price, setPrice] = useState<number>(199.99)
    const [images, setImages] = useState<string[]>(imgs)
    const [username, setUsername] = useState<string>('username')


    const prevImage = () : void => setCurrentImg((currentImg - 1 + images.length) % images.length)
    const nextImage = () : void => setCurrentImg((currentImg+1) % images.length)


    return (
        <>
            <div className="grow flex justify-center items-center w-full h-full px-5 py-10">
                <div className="w-full max-w-[1240px] h-full flex items-center justify-center">
                    <div className="grid 2xl:grid-cols-2 justify-center items-start gap-8 w-full">
                        <div className='relative'>
                            <button className='absolute text-white font-light top-[50%] translate-y-[-50%] left-0 px-5 h-full cursor-pointer hover:scale-115 duration-200 z-10'
                            onClick={prevImage}>
                                <FaAngleDoubleLeft size={30}/>
                            </button>
                            <button className='absolute text-white font-light top-[50%] translate-y-[-50%] right-0 px-5 h-full cursor-pointer rotate-180 hover:scale-115 duration-200 z-10'
                            onClick={nextImage}>
                                <FaAngleDoubleLeft size={30}/>
                            </button>
                            <div className="w-full sm:h-[500px] h-[340px] overflow-hidden">
                                <div
                                  className="flex transition-transform duration-500"
                                  style={{ transform: `translateX(-${currentImg * 100}%)` }}
                                >                            
                                  {images.map((image, index) => (
                                    <a href={image} className="w-full sm:h-[500px] h-[340px] flex-shrink-0">
                                        <img
                                        key={index}
                                        src={image}
                                        alt={`Slide ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                    </a>
                                  ))}
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col items-start font-light gap-5 my-auto'>
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
                            <a href="" target="_blank"  className="2xl:w-fit w-full">
                                <div className="flex items-center justify-center gap-2 font-medium px-4 py-2 text-white bg-blue-800 hover:outline-1 hover:outline-blue-800 hover:text-blue-800 hover:bg-white hover:scale-105 duration-300">
                                    <p>Contact</p>
                                    <FaTelegramPlane/>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Details