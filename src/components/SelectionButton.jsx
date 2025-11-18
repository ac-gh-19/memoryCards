export default function SelectionButton({ children, onClick, difficulty }) {
  return (
    <button className="border rounded-xl p-3 text-xl" onClick={() => onClick(difficulty)}>
      {children}
    </button>
  );
}
