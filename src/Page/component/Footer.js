import { Link } from "react-router-dom";

function Footer(){
    return (
        <div className="Footer-Wrap">
            <center>
            <h1>© 2024 WiTiAx - All Rights Reserved.</h1>
            <Link to="/about"><p>About Us</p></Link>
            </center>
        </div>
    );
}

export default Footer