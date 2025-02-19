import { BiPurchaseTag } from "react-icons/bi";
import img1 from '../../assets/imgs/img1.jpg'
import img2 from '../../assets/imgs/img2.jpg'
import img3 from '../../assets/imgs/img3.jpg'


function LandingDetails() {
    return (
        <>
            <div className="w-full h-full flex justify-center items-center">
                <div className="max-w-[1240px] w-full h-full py-20 md:px-10 px-5 grid gap-10">
                    <h1 className="md:text-4xl text-3xl text-blue-800 ">WHAT'S SwapIt??</h1>
                    <div className="grid md:grid-cols-5 justify-center items-center gap-10">
                        <div  className="md:col-span-2 w-full max-h-[340px] object-cover overflow-hidden">
                            <img src={img1} alt=""/>
                        </div>
                        <div className="md:col-span-3 flex flex-col justify-self-center gap-5 w-full">
                            <h2 className="md:text-2xl text-xl">Buy and sell</h2>
                            <p className="font-light sm:text-[1.1rem] text-[1rem]">
                                SwapIt is Torino's first student-exclusive marketplace. Our platform enables students to buy, sell, and exchange pre-loved goods within a trusted, user-verified community. By giving students a platform to repurpose their goods conveniently, we aim to create more sustainable student communities, fostering a circular economy that reduces student waste.
                            </p>
                            <div className="flex items-self-center sm:text-[1.1rem] text-[1rem]">
                                <BiPurchaseTag size={20}/>
                                <p className="font-light ms-2">
                                    Buy and Sell Goods and Services
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-5 justify-center items-center gap-10">
                        <div className="md:col-span-3 flex flex-col justify-self-center gap-5 w-full">
                            <h2 className="md:text-2xl text-xl">How it works?</h2>
                            <div className="flex flex-col gap-1 sm:text-[1.1rem] text-[1rem]">
                                <p className="font-light"><span className=" font-medium">1. Sign Up:</span> Verify your student email to join your   campus market.</p>
                                <p className="font-light"><span className="font-medium">2. List or Browse:</span> Post items or explore categories  tailored to students.</p>
                                <p className="font-light"><span className="font-medium">3. Connect & Chat:</span>  Message sellers or buyers directly   to ask questions and finalize the deal.</p>
                            </div>
                        </div>
                        <div  className="md:col-span-2 w-full max-h-[340px] object-cover overflow-hidden">
                            <img src={img2} alt=""/>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-5 justify-center items-center gap-10">
                        <div  className="md:col-span-2 w-full max-h-[340px] object-cover overflow-hidden">
                            <img src={img3} alt=""/>
                        </div>
                        <div className="md:col-span-3 flex flex-col justify-self-center gap-5 w-full">
                            <h2 className="md:text-2xl text-xl">Made by students, for students</h2>
                            <div className="flex flex-col gap-1 sm:text-[1.1rem] text-[1rem]">
                                <div>
                                    <p className="font-medium">Find a compatible buyer or seller</p>
                                    <p className="font-light">Students are the ideal buyers and sellers because they understand each other's needs. Find what you're looking for with ease and confidence.</p>
                                </div>
                                <div>
                                    <p className="font-medium">Promote Sustainability</p>
                                    <p className="font-light">Turn your unused items into cash while helping to reduce waste. Before you throw anything away, check if someone in your community could use it.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LandingDetails