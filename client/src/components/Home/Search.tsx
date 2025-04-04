import { useNavigate, NavigateFunction } from "react-router-dom"

interface searchProps {
    setCategory: React.Dispatch<React.SetStateAction<string>>;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    category: string;
    search: string;
}

function Search(props: searchProps) {
    
    const {setCategory, setSearch, category, search} = props
    const nav: NavigateFunction = useNavigate()

    return (
        <>
            <div className="flex justify-center items-center w-full">
                <div className="w-full max-w-[1240px] h-full flex flex-col justify-center items-center md:py-15 pt-15 px-5">
                    <div className="w-full flex flex-col justify-center items-center gap-10">
                        <h1 className="text-center lg:text-3xl text-2xl select-none font-bold">What are you looking for?</h1>
                        <div className="flex md:flex-row flex-col md:gap-0 gap-5 items-center justify-center w-full">
                            <div className="h-10 md:w-fit w-full">

                                <select 
                                value={category}
                                name="search" 
                                onChange={(e) => {setCategory(e.target.value); setSearch(''); nav(`/home?category=${e.target.value}`)}} 
                                className="h-full w-full text-white bg-blue-800 px-4 py-2 focus:outline-1 focus:outline-blue-800 outline-1 outline-blue-800 cursor-pointer font-light">
                                    <option value="all">All Categories</option>
                                    <option value="electronics">Electronics</option>
                                    <option value="home-and-appliances">Home & Appliances</option>
                                    <option value="transportation">Transportation</option>
                                    <option value="books">Books</option>
                                    <option value="clothes-and-fashion">Clothes & Fashion</option>
                                    <option value="others">Others</option>
                                </select>
                            </div>
                            <div className="flex justify-center items-center relative outline-1 outline-blue-800 grow h-10 md:w-fit w-full">
                                    <input type="text" name="search" placeholder='Search...' 
                                    className="bg-white text-black w-full h-full px-4 py-2 font-medium focus:outline-0" 
                                    value={search} onChange={(e) => setSearch(e.target.value)}
                                    autoComplete="off"/>
                            </div>
                        </div>                                
                    </div>
                </div>
            </div>
        </>
    )
}

export default Search