import React from "react";

function Register() {
    return <div className="container form-section" id="main">
        <h2>Register</h2>
        <div className="row">
            <form action="/register" method="POST">
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" name="username" placeholder="Ton email pour le login" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" name="password" placeholder="Un mot de passe bien puissant" required />
                </div>
                <br />
                <button type="submit" className="w-100 btn btn-dark btn-lg">Register</button>
            </form>
        </div>
    </div>;
}

export default Register;