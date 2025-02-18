import { ReactTyped } from "react-typed"
import { Link } from "react-router-dom"

function LandingHero() {

    return (
        <>
            <div className="w-full h-fit flex justify-center items-center bg-cover py-25">
                <div className="max-w-[1240px] w-full flex flex-col justify-center items-center text-blue-800 mx-10 gap-5">
                    <h1 className="lg:text-6xl text-5xl text-blue-800 font-bold">
                        <ReactTyped 
                        strings={[
                            'BUY',
                            'SELL',
                            'SWAP'
                        ]}
                        typeSpeed={120}
                        backSpeed={100}
                        loop
                        />
                    </h1>
                    <h1 className="lg:text-5xl sm:text-4xl text-3xl text-center text-black">Torino's First Student Exclusive Marketplace</h1>
                    <p className="lg:text-xl sm:text-[1rem] text-[0.8rem] text-center text-black font-medium">SwapTO connects students to exchange items, free up space, and find great deals—all within your campus community</p>
                    <Link to="/signup">
                        <div className="bg-blue-800 text-white px-10 py-3 hover:scale-110 hover:bg-white hover:text-blue-800 hover:outline-1 hover:outline-blue-800 duration-200 lg:text-2xl sm:text-xl text-[1.1rem] mt-2 font-bold">
                            <p className="text-center">Join The Community</p>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default LandingHero