import React from "react";

function Login() {
    return <div className="container form-section" id="main">
        <h2>Login</h2>
        <div className="row">
            <div>
                <div className="form-group">
                    <label htmlFor="username">Email</label>
                    <input type="email" className="form-control" name="username" placeholder="Ton email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" name="password" placeholder="Ton mot de passe" required />
                </div>
                <br />
                <button className="w-100 btn btn-primary btn-lg">Login</button>
            </div>
        </div>
    </div>;
}

export default Login;