import { MdOutlineFilterList } from "react-icons/md";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Card from './Card'

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

function Products() {

    const [searchParams] = useSearchParams()
    const category = searchParams.get("category") || "";
    const search = searchParams.get("search") || "";
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        async function getProducts() {
            const productsData = await fetchProducts();
            setProducts([...productsData, ...productsData]);
            setLoading(false)
        }
        getProducts();
    }, [])

    return (
        <>
            {
                loading ? (
                    <div className="grow flex justify-center items-center">
                        <div className="w-full max-w-[1240px] h-full px-5 py-5 flex items-center justify-center">
                            <div>loading</div>
                        </div>
                    </div>
                ) 
                :
                (
                    <div className="flex justify-center items-center">
                    <div className="w-full max-w-[1240px] px-5 py-5">
                        <div className="flex md:flex-row flex-col-reverse md:gap-0 gap-5 justify-between items-center">
                            <h2 className="md:text-3xl text-2xl font-medium">Products</h2>
                            <div className="flex gap-2 font-light md:w-fit w-full">
                                <Link to='/post' className="md:grow-0 grow">
                                    <div className="h-10 bg-blue-800 text-white px-4 py-1 hover:bg-white hover:text-blue-800 hover:outline-1 hover:outline-blue-800 duration-200 flex justify-center    items-center">
                                        <span className="md:text-2xl text-xl me-1">+</span> 
                                        Post Item
                                    </div>
                                </Link>
                                <button className="h-10 md:grow-0 grow bg-blue-800 text-white px-4 py-2 hover:bg-white hover:text-blue-800 hover:outline-1 hover:outline-blue-800 duration-200  cursor-pointer">
                                    <MdOutlineFilterList size={20} className="inline me-1"/>
                                    Filters
                                </button>
                            </div>
                        </div>
                        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5 justify-center items-center mt-5 w-full relative">
                        {
                        products.map(p => (
                                <Card key={p.id} id={p.id} img={p.image} title={p.title} price={p.price}/>
                        ))
                            }
                        </div>
                    </div>
                </div>
                )
            }
            
        </>
    )
}

export default Products