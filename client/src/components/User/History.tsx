import Card from '../User/Card'
import img from '../../assets/imgs/product1.jpg'
import img2 from '../../assets/imgs/product2.jpg'
import img3 from '../../assets/imgs/product3.jpg'
import img4 from '../../assets/imgs/product4.jpg'

function UserHistory() {

    return (
        <>
            <div className="flex items-center justify-center">
                <div className="w-full max-w-[1240px] px-5 py-15">
                    <h2 className='font-medium text-2xl'>History</h2>
                    <div className='flex overflow-x-scroll overflow-y-hidden gap-5 py-5'>
                        <Card title='Mountaion Bike S-29' price="399.99" img={img} key={1}/>
                        <Card title='Sony WH-CH720N' price="139.99" img={img2} key={2}/>
                        <Card title='Sony Camera like new' price="110.00" img={img3} key={3}/>
                        <Card title='Sony WH-CH720N' price="139.99" img={img4} key={4}/>
                        <Card title='Mountaion Bike S-29' price="399.99" img={img} key={5}/>
                        <Card title='Sony WH-CH720N' price="139.99" img={img2} key={6}/>
                        <Card title='Sony Camera like new' price="110.00" img={img3} key={7}/>
                        <Card title='Sony WH-CH720N' price="139.99" img={img4} key={8}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserHistory