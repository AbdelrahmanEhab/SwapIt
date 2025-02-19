import Header from '../components/Login/Header'
import Form from '../components/Login/Form'

function LoginPage() {

    return (
        <>
        <div className='flex flex-col min-h-screen'>
        <Header/>
        <Form/>
        </div>
        </>
    )
}

export default LoginPage