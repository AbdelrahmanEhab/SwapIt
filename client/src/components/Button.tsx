
interface buttonProps {
    width?: string;
    height?: string;
    text: string;
    invert?: boolean;
    px: number;
    py: number;
}

const button : React.FC<buttonProps> = ({width, height, text, invert, px, py}) => {
    
    return (
        <>
            <div
                className={
                    `hover:scale-105 hover:outline-1 duration-200 font-bold cursor-pointer` +
                    `${width ? `w-[${width}] ` : ""}` +
                    `${height ? `h-[${height}]` : ""}`+
                    `${invert ? ` bg-white text-blue-800 hover:bg-blue-800 hover:text-white hover:outline-white` : ` bg-blue-800 text-white hover:bg-white hover:text-blue-800 hover:outline-blue-800`}` +
                    ` px-${px} py-${py}`
                
                }
            >
                <p className="text-center">{text}</p>
            </div>
        </>)
} 

export default button