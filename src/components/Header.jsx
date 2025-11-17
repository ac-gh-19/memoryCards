export default function Header({title, currentScore = 0, bestScore = 0}) {
    return ( 
        <header className="flex justify-center flex-col items-center">
            <h1 className="text-2xl p-3">
                {title}
            </h1>
            <div>
                Current Score {currentScore} | Best Score {bestScore}
            </div>
        </header>
    )
}