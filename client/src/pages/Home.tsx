import Header from '../components/Home/Header'
import Search from '../components/Home/Search'
import Products from '../components/Home/Products'
import { useState } from 'react'

function HomePage() {
    const [category, setCategory] = useState<string>('all')
    const [search, setSearch] = useState<string>('')


    return (
        <>
        <div className='flex flex-col  items-center min-h-screen'>
        <Header/>
        <Search setCategory={setCategory} setSearch={setSearch} category={category} search={search}/>
        <Products category={category} search={search}/>
        </div>
        </>
    )
}

export default HomePage