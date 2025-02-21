import Header from '../components/User/Header'
import Details from '../components/User/Details'
import ScrollCards from '../components/User/ScrollCards'

function UserPage() {

    return (
        <>
        <Header/>
        <Details/>
        <ScrollCards title='History'/>
        <ScrollCards title='Favourites'/>
        </>
    )
}

export default UserPage