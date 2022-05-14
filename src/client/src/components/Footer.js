import React from "react";

function Footer() {
    return <footer className="footer mt-auto py-3">
        <div className="container">
            <small>© Copyright {new Date().getFullYear()}, João Américo. Code available on <a href="https://github.com/jcamerico/rpdr-prono">Github</a>.</small>
        </div>
    </footer>
}

export default Footer;