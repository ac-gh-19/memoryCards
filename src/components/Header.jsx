import githubIcon from "../assets/githubIcon.svg"

export default function Header({ title, currentScore = 0, bestScore = 0 }) {
  return (
    <header className="flex sticky top-0 bg-yellow-500 justify-center flex-col items-center border-b p-3 text-white"
    style={{textShadow: "1px 1px 12px black"}}>
      <h1 className="text-4xl">{title}</h1>
      <div className="text-xl p-1">
        Current Score {currentScore} | Best Score {bestScore}
      </div>
      <a href="https://github.com/ac-gh-19/memoryCards">
        <img src={githubIcon} className="w-15 absolute top-5 right-5 headerIcon">
        </img>
      </a>
    </header> 
  );
}
