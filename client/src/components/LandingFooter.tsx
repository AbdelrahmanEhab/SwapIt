import dayjs from "dayjs"
import { Link } from "react-router-dom"


function Footer() {
    return (
        <>
            <div className="w-full h-full flex justify-center items-center bg-blue-800 p-10">
                <div className="w-full max-w-[1600px] h-full flex flex-col items-center justify-center text-white gap-10">
                    <div className="flex items-center justify-center">
                        <Link to="/signup">
                            <div className="bg-white text-blue-800 px-10 py-3 hover:scale-110 hover:bg-blue-800 hover:text-white hover:outline-1 hover:outline-white duration-200 lg:text-2xl sm:text-xl text-[1.1rem] mt-2 font-bold">
                                <p className="text-center">Join The Community</p>
                            </div>
                        </Link>
                    </div>
                    <div className="border-t-1 border-white w-full flex md:flex-row flex-col md:justify-between justify-center items-center py-10 gap-5">
                        <div className="text-4xl flex justify-center items-center select-none w-40">
                            <Link to="/">
                                <span>SwapTO</span>
                            </Link>
                        </div>
                        <div className="font-[400] select-none">
                            &copy; {dayjs().format('YYYY')} SwapTO. All rights reserved.
                        </div>
                        <div className="flex flex-col md:items-end items-center  justify-center w-40 md:gap-1 text-[0.8rem]">
                            <Link to="/">
                                <div className="underline">
                                    Terms of Use
                                </div>
                            </Link>
                            <Link to="/">
                                <div className="underline">
                                    Privacy Policy
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer