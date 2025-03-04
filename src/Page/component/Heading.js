import Logo from "../Asset/logo.png"
import { Link } from "react-router-dom";

function Heading(){
    
    return (

        <div className="Header-Wrap">
            <Link to="/"><img src= {Logo} className="Logo-Css"></img></Link>

            <div class="animation-text"> 
                <span></span>
            </div>
           
        </div>
    );
}

export default Heading