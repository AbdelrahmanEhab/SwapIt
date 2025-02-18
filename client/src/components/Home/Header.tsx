import { Link } from "react-router-dom"
import userImg from '../../assets/imgs/user.jpg'

interface HeaderProps {
    setSearch: React.Dispatch<React.SetStateAction<string>>
    setCategory: React.Dispatch<React.SetStateAction<string>>
}

function Header(props: HeaderProps) {

    return (
        <>
            <div className="sm:h-[70px] h-[60px] w-[100%] bg-blue-800 flex justify-center sticky top-0 z-50">
                <div className="w-full max-w-[1240px] h-full flex justify-between items-center text-white font-bold sm:px-10 px-5">
                    <div>
                        <Link to="/home/all" onClick={() => {props.setCategory('all'); props.setSearch('')}}>
                            <div className="sm:text-4xl text-2xl select-none">SwapIt</div>
                        </Link>
                    </div>
                    <div className="flex justify-end items-center gap-5">
                        {/* <Link to=''>
                            <div className="bg-white text-blue-800 px-3 py-1 hover:scale-110 hover:bg-blue-800 hover:text-white hover:outline hover:outline-white duration-200 flex justify-center items-center">
                                Add Item
                                <span className="md:text-2xl text-xl ms-1">+</span> 
                            </div>
                        </Link> */}
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