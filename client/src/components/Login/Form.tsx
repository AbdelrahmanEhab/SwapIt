import { Link, NavigateFunction, useNavigate } from "react-router-dom"
import { useState } from "react"
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";


function LoginForm() {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [showPass, setshowPass] = useState<boolean>(false)
    const nav : NavigateFunction = useNavigate()

    return (
        <>
            <div className="flex justify-center items-center grow select-none">
                <div className="flex flex-col justify-center items-center gap-5 px-20 py-10 max-w-[1000px] w-full h-full font-light">
                    <h1 className="text-4xl font-bold">Login</h1>
                    <div className="flex flex-col items-start gap-2 w-full">
                        <label htmlFor="email" className=" text-xl">University Email</label>
                        <input type="email" name="email" placeholder="s123456@studenti.polito.it" className="border-1 border-gray-500 px-4 py-2 w-full" autoComplete="off" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="flex flex-col items-start w-full relative">
                        <label htmlFor="password" className="text-xl">Password</label>
                        <input type={!showPass ? "password" : 'text'} name='password' placeholder="********" className="border-1 border-gray-500 px-4 py-2 w-full" autoComplete="off" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        {!showPass ? <IoEyeOutline size={20} className="absolute right-4 top-10 text-gray-500" onClick={() => setshowPass(!showPass)}/> : <FaRegEyeSlash size={20} className="absolute right-4 top-10 text-gray-500" onClick={() => setshowPass(!showPass)}/>}
                        <Link to={''} className="mt-3 underline text-blue-800">Forgot Password?</Link>
                    </div>
                    <button className="bg-blue-800 text-white px-10 py-2 hover:scale-110 hover:bg-white hover:text-blue-800 hover:outline-1 hover:outline-blue-800 duration-200 text-xl font-bold cursor-pointer" onClick={() => nav('/home')}>
                       Log In
                    </button>
                    <div className="flex flex-col justify-between items-center gap-5">
                        <div className="flex sm:flex-row flex-col items-center justify-center gap-1">
                            <p>Don't have an account?</p>
                            <Link to='/signup' className="underline text-blue-800">Sign Up</Link>
                        </div>
                        <div className="flex flex-col justify-center items-center underline text-gray-500">
                            <Link to=''>Terms of Use</Link>
                            <Link to=''>Privacy Policy</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginForm