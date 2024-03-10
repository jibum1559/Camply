import React from "react";
import { Link } from "react-router-dom";
import general from "../../img/general.png";
import manager from "../../img/manager.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from 'react-bootstrap';
import CampNavBar from '../camp/CampNavbar';

const Register = () =>  {
  
  return (
    <section>
      <CampNavBar/>
      <Container fluid className="home-section" id="home">
        <Container className="home-content">
        </Container>
      </Container>

    <div>
        <div style={{marginTop:'100px', marginBottom:'100px', marginLeft:'30%'}} class="container text-center">
          <div class="row row-cols-4">
            <div class="col">
              <Link to="/register/general">
                <img src={general} alt="General Register" width="300px" height="300px" />
              </Link>
            </div>
            <div class="col">
              <Link to="/register/manager">
                <img src={manager} alt="Manager Register" width="300px" height="300px" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
