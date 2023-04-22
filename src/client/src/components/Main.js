import React, { useEffect, useState } from "react";
import Welcome from "./Welcome";
import Form from "./form/Form";
import Loading from "./Loading";
import backendUrl from "../backend";

function Main() {

    const [queens, setQueens] = useState([]);

    useEffect(() => {
        console.log(backendUrl() + '/api/queens');
        fetch(backendUrl() + '/api/queens').
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
        { queens.length > 0 && <Form queens={queens} bonusScore={Math.pow(2, queens.length - 4)}/> }
    </div>;
}

export default Main;