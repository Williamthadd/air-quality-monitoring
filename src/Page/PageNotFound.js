import Heading from "./component/Heading.js";
import Footer from "./component/Footer.js";
function PageNotFound() {
  return (
    <div class="App">
      <Heading />
    
        <center>
            <h1 className="PageNotFound">Page Not Found</h1>
            <p className="GoBack">Go back to <a href="/">main page</a></p>
        </center>

      <Footer />
    </div>
  );
}

export default PageNotFound;
