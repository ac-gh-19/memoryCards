export default function PostScreen({children, onClick}) {
    return (
        <div className="flex flex-col justify-center items-center gap-10 mb-20">
            <div className="text-5xl">
                {children}
            </div>
            <button className="p-2.5 border rounded text-2xl" onClick={() => onClick()}>
                Play Again!
            </button>
        </div>
    )
}