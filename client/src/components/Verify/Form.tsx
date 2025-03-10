import { Link, NavigateFunction, useNavigate } from "react-router-dom"
import { useState } from "react"


function VerifyForm() {

    const [code, setCode] = useState<string>('')
    const nav : NavigateFunction = useNavigate()

    return (
        <>
            <div className="flex justify-center items-center grow select-none">
                <div className="flex flex-col justify-center items-center gap-5 md:px-20 px-5 py-10 max-w-[1000px] w-full h-full font-light">
                    <h1 className="text-4xl font-bold">Verify Your Email</h1>
                    
                    <div className="flex flex-col items-start w-full relative">
                        <label htmlFor="code" className="text-xl">Verification Code</label>
                        <input type='text' id='code' placeholder='Enter verification code' className="border-1 border-gray-500 px-4 py-2 w-full" autoComplete="off" value={code} onChange={(e) => setCode(e.target.value)}/>
                    </div>

                    <button className="bg-blue-800 text-white px-10 py-2 hover:bg-white hover:text-blue-800 hover:outline-1 hover:outline-blue-800 duration-200 font-bold cursor-pointer w-full" onClick={() => nav('/home?category=all')}>
                       Verify
                    </button>

                    <button className="px-10 py-2 bg-white text-blue-800 outline-1 outline-blue-800 font-bold cursor-pointer w-full">
                       Resend Code
                    </button>
                    
                    <div className="flex flex-col justify-center items-center underline text-gray-500">
                        <Link to=''>Terms of Use</Link>
                        <Link to=''>Privacy Policy</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default VerifyForm