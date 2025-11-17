import { useState } from "react";
import Header from "./components/Header";

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0)

  return (
    <>
      <Header title="Memory Card Pokemon" currentScore={currentScore} bestScore={bestScore}></Header>
    </>
  )
}

export default App;
