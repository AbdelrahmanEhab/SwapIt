import dayjs from "dayjs"


function Footer() {
    return (
        <>
            <div className="w-full h-full flex justify-center items-center bg-blue-800 p-10">
                <div className="w-full max-w-[1600px] h-full flex flex-col items-center justify-center text-white gap-10">
                    <div className="flex items-center justify-center">
                        <a href="">
                            <div className="bg-white text-blue-800 px-10 py-3 hover:scale-105 hover:bg-blue-800 hover:text-white hover:outline-1 hover:outline-white duration-200 lg:text-2xl sm:text-xl text-[1.1rem] mt-2 font-bold">
                                <p className="text-center">Join The Community</p>
                            </div>
                        </a>
                    </div>
                    <div className="border-t-1 border-white w-full flex md:flex-row flex-col md:justify-between justify-center items-center py-10 gap-5">
                        <div className="text-4xl select-none">
                            <a href="/">
                                <span>SwapTO</span>
                            </a>
                        </div>
                        <div className="font-[400] select-none">
                            &copy; {dayjs().format('YYYY')} SwapTO. All rights reserved.
                        </div>
                        <div className="flex flex-col items-center justify-center md:gap-1 text-[0.8rem]">
                            <a href="/">
                                <div className="underline">
                                    Privacy Policy
                                </div>
                            </a>
                            <a href="/">
                                <div className="underline">
                                    Terms of Service
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer