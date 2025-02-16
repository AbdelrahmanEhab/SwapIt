
import { Link } from "react-router-dom"

function SignUpForm() {

    return (
        <>
            <div className="flex justify-center items-center grow">
                <div className="flex flex-col justify-center items-center gap-10 px-20 py-10 max-w-[1000px] w-full font-light">
                    <h1 className="text-4xl font-bold">Sign Up</h1>
                    <div className="flex md:flex-row flex-col md:gap-5 gap-10 w-full">
                        <div className="flex flex-col items-start gap-2 w-full">
                            <label htmlFor="firstname" className=" text-xl">First Name</label>
                            <input type="text" name="firstname" placeholder="John" className="border-1 border-gray-500 px-4 py-2 w-full" autoComplete="off"/>
                        </div>
                        <div className="flex flex-col items-start gap-2 w-full">
                            <label htmlFor="lastname" className=" text-xl">Last Name</label>
                            <input type="text" name="lastname" placeholder="Doe" className="border-1 border-gray-500 px-4 py-2 w-full" autoComplete="off"/>
                        </div>
                    </div>
                    <div className="flex flex-col items-start gap-2 w-full">
                        <label htmlFor="email" className=" text-xl">University Email</label>
                        <input type="email" name="email" placeholder="sXXXXXX@studenti.polito.it" className="border-1 border-gray-500 px-4 py-2 w-full" autoComplete="off"/>
                    </div>
                    <div className="flex flex-col items-start w-full">
                        <label htmlFor="" className="text-xl">Password</label>
                        <input type="password" placeholder="********" className="border-1 border-gray-500 px-4 py-2 w-full" autoComplete="off"/>
                    </div>
                    <button className="bg-blue-800 text-white px-10 py-2 hover:scale-110 hover:bg-white hover:text-blue-800 hover:outline-1 hover:outline-blue-800 duration-200 text-xl mt-2 font-bold cursor-pointer">Sign Up</button>
                    <div className="flex flex-col justify-between items-center gap-5">
                        <div className="flex sm:flex-row flex-col items-center justify-center gap-1">
                            <p>Already have an account?</p>
                            <Link to='/login' className="underline text-blue-800">Log In</Link>
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

export default SignUpForm