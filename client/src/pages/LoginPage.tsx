import Header from '../components/Login/LoginHeader'
import Form from '../components/Login/LoginForm'

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