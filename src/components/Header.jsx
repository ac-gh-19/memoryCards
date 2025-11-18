export default function Header({title, currentScore = 0, bestScore = 0}) {
    return ( 
        <header className="flex sticky top-0 bg-stone-900 justify-center flex-col items-center border-b p-3">
            <h1 className="text-2xl">
                {title}
            </h1>
            <div className="p-1">
                Current Score {currentScore} | Best Score {bestScore}
            </div>
        </header>
    )
}