import { Link } from "react-router-dom"
import userImg from '../../assets/imgs/user.jpg'

function Header() {

    return (
        <>
            <div className="sm:h-[70px] h-[60px] w-[100%] bg-blue-800 flex justify-center sticky top-0 z-50 shadow-2xl">
                <div className="w-full max-w-[1240px] h-full flex justify-between items-center text-white font-bold sm:px-10 px-5">
                    <div>
                        <Link to="/home">
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
        </>
    )
}

export default Header