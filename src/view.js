import React from "react";
import ReactDOM from "react-dom";
import Coin from "./coin.js"

export const reactRenderView = (data, div ) => {
    ReactDOM.render(<ReactView data={data} />, div);
}

const ReactView = (props) => {
    const { data } = props;
    const [coinFace, setCoinFace] = React.useState(1);

    const flipCoin = () => data.set("coin", Math.floor(Math.random()+0.5))

    React.useEffect(() => {
        const syncLocalAndFluidState = () => setCoinFace(data.get("coin") || 0);
        syncLocalAndFluidState();
        data.on("valueChanged", syncLocalAndFluidState);
        return () => {
            data.off("valueChanged", syncLocalAndFluidState);
        };
    });
    
    return (
        <div style={{ textAlign: "center" }}>
            <div>
                <Coin coinFace = {coinFace}/>
            </div>
            <button onClick={flipCoin}>
                Flip
            </button>
        </div>
    );
};
