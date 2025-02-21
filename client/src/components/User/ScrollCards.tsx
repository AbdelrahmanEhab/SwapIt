import Card from './Card'
import img from '../../assets/imgs/product1.jpg'
import img2 from '../../assets/imgs/product2.jpg'
import img3 from '../../assets/imgs/product3.jpg'
import img4 from '../../assets/imgs/product4.jpg'

interface Props {
    title: string;
}

function ScrollCards(props: Props) {

    const {title} = props;

    return (
        <>
            <div className="flex items-center justify-center">
                <div className="w-full max-w-[1240px] px-5 py-10">
                    <h2 className='font-medium text-3xl'>{title}</h2>
                    <div className='flex overflow-x-scroll overflow-y-hidden gap-5 py-5'>
                        <Card title='Mountaion Bike S-29' price="399.99" img={img} key={1} state={title}/>
                        <Card title='Sony WH-CH720N' price="139.99" img={img2} key={2} state={title}/>
                        <Card title='Sony Camera like new' price="110.00" img={img3} key={3} state={title}/>
                        <Card title='Sony WH-CH720N' price="139.99" img={img4} key={4} state={title}/>
                        <Card title='Mountaion Bike S-29' price="399.99" img={img} key={5} state={title}/>
                        <Card title='Sony WH-CH720N' price="139.99" img={img2} key={6} state={title}/>
                        <Card title='Sony Camera like new' price="110.00" img={img3} key={7} state={title}/>
                        <Card title='Sony WH-CH720N' price="139.99" img={img4} key={8} state={title}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ScrollCards