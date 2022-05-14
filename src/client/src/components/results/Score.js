import React from "react";

function Score(props) {
    return <tr>
        <td>{props.score.name}</td>
        <td>{props.score.score}</td>
        <td>
            <details>
                <summary>Details</summary>
                { props.score.rightAnswers.map((element, index) => <p key={index} className={element.status}>{element.message}</p>)}
            </details>
        </td>
    </tr>;
}

export default Score;