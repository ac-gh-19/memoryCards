export default function Card({ pokemon, onClick }) {
  const { name, image } = pokemon;
  return (
    <div
      className="border flex flex-col  items-center justify-center rounded-2xl p-10 card"
      style={{background: "rgba(42, 117, 200, .8)",
         boxShadow: "2px 2px 10px 2px rgba(143, 149, 207, 0.8)"}}
      onClick={() => onClick(pokemon.id)}
    >
      <img src={image} className="w-44" />
      <div className="text-xl sm:text-2xl"
      style={{textShadow: "0px 0px 10px black"}}>{name[0].toUpperCase() + name.slice(1)}</div>
    </div>
  );
}
