import { useParams } from 'react-router-dom'
import { useState } from 'react'
import Header from '../components/Home/Header'
import Search from '../components/Home/Search'
import Products from '../components/Home/Products'

function HomePage() {

    const {category, query} = useParams<Record<string, string | undefined>>();
    const [search, setSearch] = useState<string>(query ?? '')

    return (
        <>
        <Header/>
        <Search category={category} search={search} setSearch={setSearch}/>
        <Products/>
        </>
    )
}

export default HomePage