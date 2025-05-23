import { Link } from "react-router-dom"
import { useState } from "react"
import { ClipLoader } from "react-spinners";


function VerifyForm() {

    const [code, setCode] = useState<string>('')
    const [validationMessage, setValidationMessage] = useState<string>('')
    const [verifyLoading, setVerifyLoading] = useState<boolean>(false)
    const [resendLoading, setResendLoading] = useState<boolean>(false)

    const handleVerification = async () => {
            setVerifyLoading(true);
            await new Promise(resolve => {
                setTimeout(async () => {
                    try {
                        const res = await fetch("https://swapit/api/v1/verify", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                          });
                    }
                    catch (e) {
                        setValidationMessage('Incorrect Verification Code!')
                        setVerifyLoading(false)
                        resolve(null)
                    }
                }, 2000)
            })
    }

    const handleResend = async () => {
            setResendLoading(true);
            await new Promise(resolve => {
                setTimeout(async () => {
                    try {
                        const res = await fetch("https://swapit/api/v1/resend", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                          });
                    }
                    catch (e) {
                        setValidationMessage('Verification Code Sent Successfully')
                        setResendLoading(false)
                        resolve(null)
                    }
                    
                }, 3000)
            })
    }

    return (
        <>
            <div className="flex justify-center items-center grow select-none">
                <div className="flex flex-col justify-center items-center gap-5 md:px-20 px-5 py-10 max-w-[1000px] w-full h-full font-light">
                    <h1 className="text-4xl font-bold">Verify Your Email</h1>
                    
                    <div className="flex flex-col items-start w-full relative">
                        <label htmlFor="code" className="text-xl">Verification Code</label>
                        <input type='text' id='code' placeholder='Enter verification code' className="border-1 border-gray-500 px-4 py-2 w-full" autoComplete="off" value={code} onChange={(e) => setCode(e.target.value)}/>
                    </div>

                    {
                        validationMessage !== '' && (
                            <>
                                <p className={`${validationMessage === 'Verification Code Sent Successfully' ? 'text-green-600' : 'text-red-600'} text-lg`}>{validationMessage}</p>
                            </>
                        )
                    }

                    <button className="bg-blue-800 text-white px-10 py-2 hover:bg-white hover:text-blue-800 hover:outline-1 hover:outline-blue-800 duration-200 font-bold cursor-pointer w-full" onClick={handleVerification}>
                    { verifyLoading ? (
                            <ClipLoader
                                color={"white"}
                                loading={verifyLoading}
                                size={15}
                            />) : "Verify"}
                    </button>

                    <button className="px-10 py-2 bg-white text-blue-800 outline-1 outline-blue-800 font-bold cursor-pointer w-full" onClick={handleResend}>
                    { resendLoading ? (
                            <ClipLoader
                                color={"##1D4ED8"}
                                loading={resendLoading}
                                size={15}
                            />) : "Resend Code"}
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