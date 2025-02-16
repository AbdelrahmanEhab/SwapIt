import { Link } from "react-router-dom"

function LoginForm() {
    return (
        <>
            <div className="flex justify-center items-center grow">
                <div className="flex flex-col justify-center items-center gap-5 px-20 py-10 max-w-[1000px] w-full h-full font-light">
                    <h1 className="text-4xl font-bold">Login</h1>
                    <div className="flex flex-col items-start gap-2 w-full">
                        <label htmlFor="email" className=" text-xl">University Email</label>
                        <input type="email" name="email" placeholder="sXXXXXX@studenti.polito.it" className="border-1 border-gray-500 px-4 py-2 w-full" autoComplete="off"/>
                    </div>
                    <div className="flex flex-col items-start w-full">
                        <label htmlFor="password" className="text-xl">Password</label>
                        <input type="password" name="password" placeholder="********" className="border-1 border-gray-500 px-4 py-2 w-full" autoComplete="off"/>
                        <Link to={''} className="mt-3 underline text-blue-800">Forgot Password?</Link>
                    </div>
                    <button className="bg-blue-800 text-white px-10 py-2 hover:scale-110 hover:bg-white hover:text-blue-800 hover:outline-1 hover:outline-blue-800 duration-200 text-xl font-bold cursor-pointer">Log In</button>
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