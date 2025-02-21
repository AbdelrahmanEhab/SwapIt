import { MdOutlineFilterList } from "react-icons/md";
import { Link, useSearchParams } from "react-router-dom";
import Card from './Card'
import img from '../../assets/imgs/product1.jpg'
import img2 from '../../assets/imgs/product2.jpg'
import img3 from '../../assets/imgs/product3.jpg'
import img4 from '../../assets/imgs/product4.jpg'

interface Params {
    category: string;
    search: string;
}

function Products() {

    const [searchParams, setSearchParams] = useSearchParams()
    const {category, search} : Params = searchParams;

    return (
        <>
            <div className="flex justify-center items-center">
                <div className="w-full max-w-[1240px] px-5 py-5">
                    <div className="flex md:flex-row flex-col-reverse md:gap-0 gap-5 justify-between items-center">
                        <h2 className="md:text-3xl text-2xl font-medium">Products</h2>
                        <div className="flex gap-2 font-light md:w-fit w-full">
                            <Link to='' className="md:grow-0 grow">
                                <div className="h-10 bg-blue-800 text-white px-4 py-1 hover:bg-white hover:text-blue-800 hover:outline-1 hover:outline-blue-800 duration-200 flex justify-center  items-center">
                                    <span className="md:text-2xl text-xl me-1">+</span> 
                                    Post Item
                                </div>
                            </Link>
                            <button className="h-10 md:grow-0 grow bg-blue-800 text-white px-4 py-2 hover:bg-white hover:text-blue-800 hover:outline-1 hover:outline-blue-800 duration-200 cursor-pointer">
                                <MdOutlineFilterList size={20} className="inline me-1"/>
                                Filters
                            </button>
                        </div>
                    </div>
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5 justify-center items-center mt-5 w-full relative">
                        <Card title='Mountaion Bike S-29' price="399.99" img={img} key={1}/>
                        <Card title='Sony WH-CH720N' price="139.99" img={img2} key={2}/>
                        <Card title='Sony Camera like new' price="110.00" img={img3} key={3}/>
                        <Card title='Sony WH-CH720N' price="139.99" img={img4} key={4}/>
                        <Card title='Mountaion Bike S-29' price="399.99" img={img} key={5}/>
                        <Card title='Sony WH-CH720N' price="139.99" img={img2} key={6}/>
                        <Card title='Sony Camera like new' price="110.00" img={img3} key={7}/>
                        <Card title='Sony WH-CH720N' price="139.99" img={img4} key={8}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Products