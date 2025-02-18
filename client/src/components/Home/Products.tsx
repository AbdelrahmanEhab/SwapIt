import { MdOutlineFilterList } from "react-icons/md";

function Products() {

    return (
        <>
            <div className="flex justify-center items-center">
                <div className="w-full max-w-[1240px] px-5 py-10">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-medium">Products</h2>
                        <button className="font-light bg-blue-800 text-white px-4 py-2 hover:bg-white hover:text-blue-800 hover:outline-1 hover:outline-blue-800 duration-300 cursor-pointer">
                            <MdOutlineFilterList size={20} className="inline me-1"/>
                            Filters
                        </button>
                    </div>
                    <div className="grid md:grid-cols-3 gap-10 justify-center items-center mt-5">
                    </div>
                </div>
            </div>
        </>
    )
}

export default Products