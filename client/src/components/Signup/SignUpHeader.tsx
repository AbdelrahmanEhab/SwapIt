import { Link } from "react-router-dom"

function LoginHeader() {
    return (
        <>
            <div className="sm:h-[70px] h-[60px] w-full bg-blue-800 flex justify-center sticky top-0 z-50">
                <div className="w-full max-w-[1240px] h-full flex justify-between items-center text-white font-bold sm:px-10 px-5">
                    <Link to="/">
                        <div className="sm:text-4xl text-2xl select-none">SwapTO</div>
                    </Link>
                    <Link to="/login">
                        <div className="bg-white text-blue-800 px-3 py-1 hover:scale-110 hover:bg-blue-800 hover:text-white hover:outlinehover:outline-white duration-200 sm:text-xl">
                            Log In
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default LoginHeader