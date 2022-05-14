import React, { useState, useEffect } from "react";
import backendUrl from "../../backend";
import Score from "./Score";

function Results() {

    const [scores, setScores] = useState([]);

    useEffect(() => {
        fetch(backendUrl() + '/results').
        then(res => res.json()).
        then(
            (data) => {
                setScores(data)
            },
            (error) => {
                console.log(error)
            }
        )
    }, []);

    return <section className="form-section">
        <div className="container">
            <h2 id="main">Resultats</h2>
            <table className="table table-striped table-hover table-dark">
                <thead>
                    <tr>
                        <td>Prénom</td>
                        <td>Points</td>
                        <td>Réponses correctes</td>
                    </tr>
                </thead>
                <tbody>
                    { scores.map((score, index) => <Score key={index} score={score} />) }
                </tbody>
            </table>
        </div>
    </section>;
}

export default Results;