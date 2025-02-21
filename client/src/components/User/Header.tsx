import { Link } from "react-router-dom"

function Header() {
    
    return (
        <>
            <div className="sm:h-[70px] h-[60px] w-[100%] bg-blue-800 flex justify-center sticky top-0 z-50 shadow-2xl">
                <div className="w-full max-w-[1240px] h-full flex justify-between items-center text-white font-bold sm:px-10 px-5">
                    <div>
                        <Link to="/home?category=all" onClick={() => window.scrollTo({top:0, behavior: 'smooth'})}>
                            <div className="sm:text-4xl text-2xl select-none">SwapIt</div>
                        </Link>
                    </div>
                    <button className="bg-white text-blue-800 px-3 py-1 hover:scale-110 hover:bg-blue-800 hover:text-white hover:outline hover:outline-white duration-200 text-xl cursor-pointer">
                        Log Out
                    </button>
                </div>
            </div>
        </>
    )
}

export default Header