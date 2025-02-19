import { Link } from "react-router-dom"
import userImg from '../../assets/imgs/user.jpg'

interface HeaderProps {
    setSearch: React.Dispatch<React.SetStateAction<string>>
    setCategory: React.Dispatch<React.SetStateAction<string>>
}

function Header(props: HeaderProps) {

    return (
        <>
            <div className="sm:h-[70px] h-[60px] w-[100%] bg-blue-800 flex justify-center sticky top-0 z-50 shadow-2xl">
                <div className="w-full max-w-[1240px] h-full flex justify-between items-center text-white font-bold sm:px-10 px-5">
                    <div>
                        <Link to="/home/all" onClick={() => {props.setCategory('all'); props.setSearch('')}}>
                            <div className="sm:text-4xl text-2xl select-none">SwapIt</div>
                        </Link>
                    </div>
                    <div className="flex justify-end items-center gap-5">
                        <Link to=''>
                            <img src={userImg} className="md:w-12 w-10 rounded-4xl outline-2"/>
                        </Link>
                    </div>
                </div>
            </div>
            {/* <div className="w-[100%] flex justify-center sticky top-0 z-50 shadow-2xl">
                <div className="w-full h-full max-w-[1240px] md:flex hidden justify-evenly items-center font-light px-10 py-4 text-blue-800">
                    <div className="flex justify-between items-center w-full text-xl">
                        <Link to='/home/electronics' className="underline underline-offset-3 hover:underline-offset-6 duration-200">
                            Electronics
                        </Link>
                        <Link to='/home/home-and-appliances' className="underline underline-offset-3 hover:underline-offset-6 duration-200">
                            Home & Appliances
                        </Link>
                        <Link to='/home/transportation' className="underline underline-offset-3 hover:underline-offset-6 duration-200">
                            Transportation
                        </Link>
                        <Link to='/home/books' className="underline underline-offset-3 hover:underline-offset-6 duration-200">
                            Books
                        </Link>
                        <Link to='/home/clothes-and-fashion' className="underline underline-offset-3 hover:underline-offset-6 duration-200">
                            Clothes & Fashion
                        </Link>
                        <Link to='/home/others' className="underline underline-offset-3 hover:underline-offset-6 duration-200">
                            Others
                        </Link>
                    </div>
                </div>
            </div> */}
        </>
    )
}

export default Header