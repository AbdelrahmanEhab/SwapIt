import { useState } from "react"
import { TfiMenu } from "react-icons/tfi";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";


function LandingHeader() {
    const [nav, setNav] = useState<boolean>(false)

    return (
        <>
            <div className="sm:h-[70px] h-[60px] w-[100%] bg-blue-800 flex justify-center sticky top-0 z-50">
                <div className="w-full max-w-[1600px] h-full flex justify-between items-center text-white font-bold sm:px-10 px-5">
                    <Link to="/">
                        <div className="sm:text-4xl text-2xl select-none">SwapTO</div>
                    </Link>
                    <div className="sm:flex hidden justify-between items-center gap-5 text-xl">
                        <Link to="/signup">
                            <div className="bg-white text-blue-800 px-3 py-1 hover:scale-110 hover:bg-blue-800 hover:text-white hover:outline hover:outline-white duration-200">
                                Sign Up
                            </div>
                        </Link>
                        <Link to="/login">
                            <div className="bg-white text-blue-800 px-3 py-1 hover:scale-110 hover:bg-blue-800 hover:text-white hover:outline hover:outline-white duration-200">
                                Log In
                            </div>
                        </Link>
                    </div>
                    <div className="sm:hidden flex justify-center items-center" onClick={() => setNav(!nav)}>
                        <div className="bg-white text-blue-800 px-3 py-2">
                            <TfiMenu size={20}/>
                        </div>
                    </div>
                </div>
                <div className={nav ? "fixed top-0 right-0 w-[50%] h-[100vh] bg-white z-51 duration-150" : "fixed top-0 right-0 w-[50%] h-[100vh]  bg-white z-50 translate-x-full duration-150"}>
                   <div className="mx-4 my-5 w- h-full flex flex-col justify-start items-start gap-2">
                       <IoMdClose size={25} className="self-end mx-2" onClick={() => setNav(!nav)}/>
                       <Link to="/signup">
                           <div className="bg-white text-blue-800 text-xl">
                               Sign Up
                           </div>
                       </Link>
                       <Link to="/login">
                           <div className="bg-white text-blue-800 text-xl">
                               Log In
                           </div>
                       </Link>
                       <Link to="/">
                           <div className="bg-white text-blue-800  text-[0.6rem] underline">
                               Privacy Policy
                           </div>
                       </Link>
                       <Link to="/">
                           <div className="bg-white text-blue-800 text-[0.6rem] underline">
                               Terms of Service
                           </div>
                       </Link>
                   </div>
                </div>
            </div>
        </>
    )
}

export default LandingHeader