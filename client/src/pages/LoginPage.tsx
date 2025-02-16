import Header from '../components/LoginHeader'
import Form from '../components/LoginForm'

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