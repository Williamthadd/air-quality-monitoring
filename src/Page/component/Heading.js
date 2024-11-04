import Logo from "../Asset/logo.png"

function Heading(){
    
    return (

        <div className="Header-Wrap">
            <img src= {Logo} className="Logo-Css"></img>

            <div class="animation-text"> 
                <span></span>
            </div>
           
        </div>
    );
}

export default Heading