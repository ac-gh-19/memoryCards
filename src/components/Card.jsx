export default function Card({pokemon, onClick}) {
    const { name, image } = pokemon;
    return (
        <div className="border flex flex-col  items-center justify-center rounded-2xl p-10"
        onClick={() => onClick(pokemon.id)}>
            <img src={image} className="w-44"/>
            <div className="text-xl">{name[0].toUpperCase() + name.slice(1)}</div>
        </div>
    )
}