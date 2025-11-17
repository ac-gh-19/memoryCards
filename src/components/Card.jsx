export default function Card({pokemon, handleClick}) {
    const { name, image } = pokemon;
    return (
        <div className="border flex flex-col  items-center justify-center">
            <img src={image}/>
            <div>{name}</div>
        </div>
    )
}