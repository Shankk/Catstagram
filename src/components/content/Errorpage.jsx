import { Link } from "react-router-dom";
import { Footer, Header } from "./Home";
import "../style/Errorpage.css";

const ErrorPage = () => {
  return (
    <div id="error" className="page">

      <div id="error-header" className="header">
        <Link to='/' ><img className="header-logo" src="Catstagram-Logo.png" alt="" /></Link>
      </div>

      <div id="error-content" className="content">
          <h1>Oh no, this route does not exist!</h1>
          <p>Click on this Link to go back to the home page. <Link to='/' >Home</Link></p>
      </div>

      <div id="error-footer" className="side-footer">
        <Footer></Footer>
      </div>
    </div>
  );
};

export default ErrorPage;