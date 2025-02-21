import { useState } from 'react'
import userImg from '../../assets/imgs/user.jpg'
import { FaEdit } from "react-icons/fa";

function UserDetails() {

    const [firstName, setFirstName] = useState<string>('Abdelrahman')
    const [lastName, setLastName] = useState<string>('Ahmed')
    const [telegramUsername, setTelegramUsername] = useState<string>('@abdoahmed')

    return (
        <>
            <div className="flex justify-center items-center w-full h-full">
                <div className="w-full h-full max-w-[1240px] grid lg:grid-cols-6 gap-10 px-5 py-15 font-light">
                    <div className="lg:col-span-2 flex items-center justify-center">
                        <img src={userImg} className='rounded-[50%] select-none max-w-[400px] w-full'/>
                    </div>
                    <div className="lg:col-span-4 flex flex-col items-start justify-center gap-5">

                        <div className="flex md:flex-row flex-col gap-5 w-full">
                                <div className="flex flex-col items-start gap-2 w-full">
                                    <label htmlFor="firstname" className=" text-xl">First Name</label>
                                    <input type="text" id="firstname" placeholder="John" 
                                    className="border-1 border-gray-500 px-4 py-2 w-full" 
                                    autoComplete="off" 
                                    value={firstName} 
                                    onChange={(e) => setFirstName(e.target.value)}/>
                                </div>

                                <div className="flex flex-col items-start gap-2 w-full">
                                    <label htmlFor="lastname" className=" text-xl">Last Name</label>
                                    <input type="text" id="lastname" placeholder="Doe" 
                                    className="border-1 border-gray-500 px-4 py-2 w-full" 
                                    autoComplete="off" 
                                    value={lastName} 
                                    onChange={(e) => setLastName(e.target.value)}/>
                                </div>
                            </div>
                                
                            <div className="flex flex-col items-start gap-2 w-full">
                                <label htmlFor="telegram" className=" text-xl">Telegram Username</label>
                                <input type="text" id="telegram" placeholder="@johndoe123" 
                                className="border-1 border-gray-500 px-4 py-2 w-full" 
                                autoComplete="off" 
                                value={telegramUsername} 
                                onChange={(e) => setTelegramUsername(e.target.value)}/>
                            </div>

                            <div className='flex gap-3 mt-2'>
                                <button className='text-white bg-blue-800 px-4 py-2 hover:outline-1 hover:outline-blue-800 hover:text-blue-800 hover:bg-white  cursor-pointer hover:scale-105 duration-200'>
                                    Update Profile
                                </button>

                                <button className='flex items-center justify-center text-white bg-blue-800 px-4 hover:outline-1 hover:outline-blue-800 hover:text-blue-800 hover:bg-white cursor-pointer hover:scale-105 duration-200'>
                                <FaEdit size={15} className='me-2 mb-1'/>
                                Edit Picture
                                </button>
                            </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserDetails