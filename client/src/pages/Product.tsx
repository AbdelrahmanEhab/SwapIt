import Header from '../components/Home/Header'
import Details from '../components/Product/Details'

function ProductPage() {

    return (
        <>
        <div className='flex flex-col min-h-screen'>
        <Header/>
        <Details/>
        </div>
        </>
    )
}

export default ProductPage