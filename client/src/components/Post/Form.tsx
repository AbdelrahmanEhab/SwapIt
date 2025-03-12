import { Link } from "react-router-dom"

function PostForm() {

    return (
        <>
            <div className="flex justify-center items-center grow select-none w-full">
                <div className="flex flex-col justify-center items-center gap-5 md:px-20 px-5 py-10 max-w-[1000px] w-full h-full font-light">
                    
                    <h1 className="text-4xl font-bold">Add Posting</h1>

                    <div className="flex flex-col items-start gap-2 w-full">
                        <label htmlFor="title" className=" text-xl">Title</label>
                        <input type="text" id="title" placeholder="Product Title" className="border-1 border-gray-500 px-4 py-2 w-full" autoComplete="off"/>
                    </div>

                    <div className="flex flex-col items-start gap-2 w-full">
                        <label htmlFor="description" className=" text-xl">Description</label>
                        <textarea id="description" placeholder="Product Description..." className="border-1 border-gray-500 px-4 py-2 w-full h-30" autoComplete="off"/>
                    </div>

                    <div className="flex flex-col items-start gap-2 w-full">
                        <label htmlFor="price" className=" text-xl">Price</label>
                        <input type="number" id="price" placeholder="100 €" className="border-1 border-gray-500 px-4 py-2 w-full appearance-none" autoComplete="off" min={0}/>
                    </div>

                    <div className="flex flex-col items-start gap-2 w-full">
                        <label htmlFor="images" className="text-xl">Images</label>
                        <input type="file" id="images" className="border-1 border-gray-500 px-4 py-2 w-full appearance-none" autoComplete="off" multiple/>
                    </div>

                    <Link to='/home' className="bg-blue-800 text-white px-10 py-2 hover:bg-white hover:scale-105 duration-200 hover:text-blue-800 hover:outline-1 hover:outline-blue-800 text-xl font-bold cursor-pointer w-50 text-center my-5" >
                       Post Item
                    </Link>
                </div>
            </div>
        </>
    )
}

export default PostForm