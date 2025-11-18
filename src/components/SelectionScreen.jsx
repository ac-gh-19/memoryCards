import SelectionButton from "./SelectionButton";

export default function SelectionScreen({ onClick }) {
  return (
    <div className="flex flex-col mt-10 text-center border rounded-xl py-10 px-5 sm:px-20 sm:py-15 md:px-35 md:py-20"
    style={{background: "rgba(42, 117, 200, .8)"}}>
      <h1 className="text-3xl">Choose Difficulty!</h1>
      <ul className="flex flex-col gap-8 pt-10">
        <SelectionButton onClick={onClick} difficulty={0.4}>
          Easy - 15 Pokemon
        </SelectionButton>
        <SelectionButton onClick={onClick} difficulty={0.6}>
          Medium - 20 Pokemon
        </SelectionButton>
        <SelectionButton onClick={onClick} difficulty={0.8}>
          Hard - 30 Pokemon
        </SelectionButton>
      </ul>
    </div>
  );
}
