import Header from '../components/Home/Header'
import Form from '../components/Post/Form'

function PostPage() {

    return (
        <>
        <div className='flex flex-col justify-center items-center min-h-screen h-full w-full'>
        <Header/>
        <Form/>
        </div>
        </>
    )
}

export default PostPage