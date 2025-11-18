import SelectionButton from "./SelectionButton"

export default function SelectionScreen({onClick}) {
    return (
            <div className="flex flex-col mt-10 text-center border rounded-xl p-15">
                <h1 className="text-2xl">Choose Difficulty!</h1>
                <ul className="flex flex-col gap-5 pt-10">
                    <SelectionButton onClick={onClick} difficulty={.4}>Easy</SelectionButton>
                    <SelectionButton onClick={onClick} difficulty={.6}>Medium</SelectionButton>
                    <SelectionButton onClick={onClick} difficulty={.8}>Hard</SelectionButton>
                </ul>
            </div>
    )
}