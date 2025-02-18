import { useParams } from 'react-router-dom'
import { useState } from 'react'
import Header from '../components/Home/Header'
import Search from '../components/Home/Search'
import Products from '../components/Home/Products'

function HomePage() {

    const {queryCategory, querySearch} = useParams<Record<string, string | undefined>>();
    const [search, setSearch] = useState<string>(querySearch ?? '')
    const [category, setCategory] = useState<string>(queryCategory ?? 'all')

    return (
        <>
        <Header setCategory={setCategory} setSearch={setSearch}/>
        <Search category={category} search={search} setSearch={setSearch} setCategory={setCategory}/>
        <Products/>
        </>
    )
}

export default HomePage