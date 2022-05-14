import React, { useEffect, useState } from "react";
import Welcome from "./Welcome";
import Form from "./form/Form";
import Loading from "./Loading";

function Main() {

    const [queens, setQueens] = useState([]);

    useEffect(() => {
        fetch('/queens').
        then(res => res.json()).
        then(
            (data) => {
                setQueens(data)
            },
            (error) => {
                console.log(error)
            }
        )
    }, []);

    return <div>
        <Welcome />
        { queens.length == 0 && <Loading /> }
        { queens.length > 0 && <Form queens={queens} bonusScore={Math.pow(2, queens.length - 3)}/> }
    </div>;
}

export default Main;