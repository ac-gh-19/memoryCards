export default function SelectionButton({children, onClick, difficulty}) {
    return (
        <button className="border rounded p-3" onClick={() => onClick(difficulty)}>{children}</button>
    )
}