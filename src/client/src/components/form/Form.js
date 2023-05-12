import React from "react";
import { useNavigate } from "react-router-dom";
import Challenge from "./Challenge";
import Position from "./Position";
import { v4 as uuidv4 } from "uuid";
import errorHandler from "../../errorHandler";
import backendUrl from "../../backend";
import LipsyncAssassin from "./LipsyncAssassin";
import Name from "./Name";

function Form(props) {

    const initialPlaces = [];
    [...Array(props.queens.length)].forEach((x, i) => initialPlaces[i]='');

    const initialLipsyncAssassins = [];
    [...Array(5)].forEach((x, i) => initialLipsyncAssassins[i]='');

    const initialChallenges = {
        'Snatch Game' : '',
        'Talent Show' : '',
        'Reading': '',
        'Ball':  '',
        'Rumix':  '',
        'Rusical':  '',
        'Acting':  '',
        'Advertising':  '',        
        'Design':  '',
        'Girl Group':  '',
        'Roast':  '',
    }

    const inputs = {
        name: '',
        places: initialPlaces,
        challenges: initialChallenges,
        lipsyncs: initialLipsyncAssassins
    };

    const navigate = useNavigate();

    function sendForm(event) {        
        event.preventDefault();        
        console.log(inputs);
        const duplicatedQueens = props.queens.filter(queen => inputs.places.indexOf(queen) !== inputs.places.lastIndexOf(queen));
        if (duplicatedQueens.length === 0) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(inputs)
            };
            fetch(backendUrl() + '/api/forecast', requestOptions)
                .then(errorHandler)
                .then(() => navigate('/thanks'))
                .catch(() => navigate('/sashay'));
        }    
    }

    return <form onSubmit={sendForm} id="main">
        <section className="first-section form-section">
            <div className="container">
                <div className="row">
                    <Name key={uuidv4()} onUpdate={value => inputs.name = value} />
                </div>
                <div className="row">
                    <div className="col-lg-4">
                        <h2>Filler queens <i className="fas fa-star-half-alt"></i></h2>
                        <p className="sub-text">Nombre de points en fonction du classement</p>
                        { [...Array(props.queens.length - 4)].map((x, i) => <Position key={uuidv4()} index={i} queens={props.queens} onUpdate={value => inputs.places[i] = value} /> )}
                    </div>
                    <div className="col-lg-4">                        
                        <h2>Challenges <i className="fas fa-trophy"></i></h2>
                        <p className="sub-text">{props.bonusScore + ' points par réponse correcte'}</p>
                        <Challenge id='Snatch Game' name='Snatch Game' queens={props.queens} onUpdate={value => inputs.challenges['Snatch Game'] = value}/>
                        <Challenge id='Talent Show' name='Talent Show' queens={props.queens} onUpdate={value => inputs.challenges['Talent Show'] = value}/>
                        <Challenge id='Reading' name='Reading Challenge' queens={props.queens} onUpdate={value => inputs.challenges['Reading'] = value}/>
                        <Challenge id='Ball' name='Ball Challenge' queens={props.queens} onUpdate={value => inputs.challenges['Ball'] = value}/>
                        <Challenge id='Rumix' name='Rumix Challenge' queens={props.queens} onUpdate={value => inputs.challenges['Rumix']= value}/>
                        <Challenge id='Rusical' name='Rusical Challenge' queens={props.queens} onUpdate={value => inputs.challenges['Rusical'] = value}/>
                        <Challenge id='Acting' name='Acting Challenge' queens={props.queens} onUpdate={value => inputs.challenges['Acting'] = value}/>
                        <Challenge id='Advertising' name='Advertising Challenge' queens={props.queens} onUpdate={value => inputs.challenges['Advertising'] = value}/>
                        <Challenge id='Design' name='Design Challenge' queens={props.queens} onUpdate={value => inputs.challenges['Design'] = value}/>
                        <Challenge id='Girl Group' name='Girl Group Challenge' queens={props.queens} onUpdate={value => inputs.challenges['Girl Group'] = value}/>
                        <Challenge id='Roast' name='Roast Challenge' queens={props.queens} onUpdate={value => inputs.challenges['Roast'] = value}/>                     
                    </div>
                    <div className="col-lg-4">
                        <h2>Lipsync Assassins <i className="fas fa-skull-crossbones"></i></h2>
                        <p className="sub-text">{props.bonusScore + ' points par réponse correcte'}</p>
                        { [...Array(5)].map((x, i) => <LipsyncAssassin key={uuidv4()} index={i} onUpdate={value => inputs.lipsyncs[i] = value} /> )}
                    </div>
                </div>
            </div>
        </section>
        <section className="second-section form-section">
            <div className="container">
                <div className="row text-center justify-content-center">
                    <h2>Top 4 <i className="fas fa-star"></i></h2>
                    <p className="sub-text">{props.bonusScore + ' points supplémentaires par queen'}</p>
                    { [...Array(3)].map((x, i) => <Position key={uuidv4()} index={props.queens.length - 4 + i} queens={props.queens} onUpdate={value => inputs.places[props.queens.length - 4 + i] = value}/>) }
                </div>
            </div>
        </section>
        <section className="third-section form-section">
            <div className="container">
                <div className="row text-center justify-content-center">
                    <h2>She's a winner, babe! <i className="fas fa-crown"></i></h2>
                    <Position key={uuidv4()} index={props.queens.length - 1} queens={props.queens} message="And the winner of RuPaul's All Stars 8 is..." onUpdate={value => inputs.places[props.queens.length - 1] = value}/>
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
