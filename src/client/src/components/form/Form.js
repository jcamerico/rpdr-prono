import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Challenge from "./Challenge";
import Position from "./Position";
import { v4 as uuidv4 } from "uuid";


function Form(props) {

    const initialPlaces = [];
    [...Array(props.queens.length)].forEach((x, i) => initialPlaces[i]='');

    const initialChallenges = {
        'Snatch Game' : '',
        'Talent Show' : '',
        'Reading': '',
        'Ball':  '',
        'Roast':  '',
        'Girl Group':  '',
        'Top All Star': ''
    }

    const [inputs, setInputs] = useState({
        name: "",
        places: initialPlaces,
        challenges: initialChallenges
    });

    const handleChange = (event) => {
        const name = event.target.name;
        let value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handlePositionChange = (event) => {
        const name = event.target.name;
        const index = props.queens.length - parseInt(name.substring('place-'.length));
        const value = event.target.value;
        setInputs(prevValues => {
            const newValue = {
                name: prevValues.name,
                challenges: prevValues.challenges,
                places: prevValues.places
            };
            newValue.places[index] = value;
            return newValue;
        });
    }

    const handleChallengeChange = (event) => {
        const name = event.target.name;
        let value = event.target.value;
        setInputs(prevValues => {
            const newValue = {
                name: prevValues.name,
                challenges: prevValues.challenges,
                places: prevValues.places
            };
            newValue.challenges[name] = value;
            return newValue;
        });
    }

    const navigate = useNavigate();

    function sendForm(event) {        
        event.preventDefault();        

        const duplicatedQueens = props.queens.filter(queen => inputs.places.indexOf(queen) !== inputs.places.lastIndexOf(queen));
        if (duplicatedQueens.length === 0) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(inputs)
            };
            fetch('/forecast', requestOptions)
                .then(
                    () => navigate('/thanks'),
                    error => console.log(error)
                );
        }    
    }

    return <form onSubmit={sendForm} id="main">
        <section className="first-section form-section">
            <div className="container">
                <div className="row">
                    <div className="mb-5">
                        <h4>Prénom</h4>
                        <input type="text" className="form-control" id="name" name="name" placeholder="Ton petit prénom" required onChange={handleChange} value={inputs.name}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <h2>Filler queens <i className="fas fa-star-half-alt"></i></h2>
                        { [...Array(props.queens.length - 4)].map((x, i) => <Position key={uuidv4()} index={i} queens={props.queens} onChange={handlePositionChange} value={inputs.places[i]} /> )}
                    </div>
                    <div className="col-lg-6">                        
                        <h2>Extra points <i className="fas fa-plus"></i></h2>
                        <p className="sub-text">{props.bonusScore + ' points par réponse correcte'}</p>
                        <Challenge id='Snatch Game' name='Snatch Game' queens={props.queens} value={inputs.challenges['Snatch Game']} onChange={handleChallengeChange}/>
                        <Challenge id='Talent Show' name='Talent Show' queens={props.queens} value={inputs.challenges['Talent Show']} onChange={handleChallengeChange}/>
                        <Challenge id='Reading' name='Reading Challenge' queens={props.queens} value={inputs.challenges['Reading']} onChange={handleChallengeChange}/>
                        <Challenge id='Ball' name='Ball Challenge' queens={props.queens} value={inputs.challenges['Ball']} onChange={handleChallengeChange}/>
                        <Challenge id='Roast' name='Roast Challenge' queens={props.queens} value={inputs.challenges['Roast']} onChange={handleChallengeChange}/>
                        <Challenge id='Girl Group' name='Girl Group Challenge' queens={props.queens} value={inputs.challenges['Girl Group']} onChange={handleChallengeChange}/>
                        <Challenge id='Top All Star' name='Top All Star' queens={props.queens} value={inputs.challenges['Top All Star']} onChange={handleChallengeChange}/>
                    </div>
                </div>
            </div>
        </section>
        <section className="second-section form-section">
            <div className="container">
                <div className="row text-center justify-content-center">
                    <h2>Top 4 <i className="fas fa-star"></i></h2>
                    <p className="sub-text">{props.bonusScore + ' points supplémentaires par queen'}</p>
                    { [...Array(3)].map((x, i) => <Position key={uuidv4()} index={props.queens.length - 4 + i} queens={props.queens} onChange={handlePositionChange} value={inputs.places[props.queens.length - 4 + i]}/>) }
                </div>
            </div>
        </section>
        <section className="third-section form-section">
            <div className="container">
                <div className="row text-center justify-content-center">
                    <h2>She's a winner, babe! <i className="fas fa-crown"></i></h2>
                    <Position key={uuidv4()} index={props.queens.length - 1} queens={props.queens} message="And the winner of RuPaul's All Stars 7 is..." onChange={handlePositionChange} value={inputs.places[props.queens.length - 1]}/>
                </div>
            </div>
        </section>
        <section className="submit-section form-section">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <button className="w-100 btn btn-dark btn-lg">Let the best queen win!</button>
                    </div>
                </div>
            </div>
        </section>
    </form>
}



export default Form;
