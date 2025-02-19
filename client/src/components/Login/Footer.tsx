import { Link } from "react-router-dom"
import dayjs from "dayjs"

function LoginFooter() {
    return (
        <>
            <div className="w-full h-full flex justify-center items-center bg-blue-800 p-10">
                <div className="w-full max-w-[1240px] h-full flex flex-col items-center justify-center text-white gap-10">
                    <div className="flex items-center justify-center">
                        <Link to="..">
                            <div className="bg-white text-blue-800 px-10 py-3 hover:scale-110 hover:bg-blue-800 hover:text-white hover:outline-1 hover:outline-white duration-200 lg:text-2xl sm:text-xl text-[1.1rem] mt-2 font-bold">
                                <p className="text-center">What's SwapIt?</p>
                            </div>
                        </Link>
                    </div>
                    <div className="border-t-1 border-white w-full flex md:flex-row flex-col md:justify-between justify-center items-center py-10 gap-5">
                        <div className="text-4xl flex justify-center items-center select-none w-40">
                            <Link to="/">
                                <span>SwapIt</span>
                            </Link>
                        </div>
                        <div className="font-[400] select-none text-center">
                            &copy; {dayjs().format('YYYY')} SwapIt. All rights reserved.
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

export default LoginFooter