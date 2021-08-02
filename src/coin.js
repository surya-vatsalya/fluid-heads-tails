import heads from "./assets/heads.jpg"
import tails from "./assets/tails.jpg"

function Coin({coinFace})
{
    const image = coinFace===0?heads:tails
    return(
        <img src ={image}></img>
    )
    
}

export default Coin