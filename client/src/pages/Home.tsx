import Header from '../components/Home/Header'
import Search from '../components/Home/Search'
import Products from '../components/Home/Products'

function HomePage() {

    return (
        <>
        <div className='flex flex-col justify-center items-center min-h-screen'>
        <Header/>
        <Search />
        <Products/>
        </div>
        </>
    )
}

export default HomePage