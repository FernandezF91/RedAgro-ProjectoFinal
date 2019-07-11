import React, { Component } from "react";
import {MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBModalFooter} from 'mdbreact';
import './login.css';


class FormPage extends Component {

render(){

  return (
    <MDBContainer>
      <MDBRow className= "justify-content-center">
        <MDBCol className="col-md-5">
          <MDBCard>
            <MDBCardBody className="mx-4">
              <div className="text-center">
                <h3 className="dark-grey-text mb-5">
                  <strong>Sign in</strong>
                </h3>
              </div>
              <MDBInput
                label="Your email"
                group
                type="email"
                validate
                error="wrong"
                success="right"
              />
              <MDBInput
                label="Your password"
                group
                type="password"
                validate
                containerClass="mb-0"
              />
              <p className="font-small blue-text d-flex justify-content-center pb-3 text-center">
                Forgot Password?
              </p>
              <div className="text-center mb-3">
                <MDBBtn
                  type="button"
                  gradient="dusty-grass"
                  rounded
                  className="btn-block z-depth-1a"
                >
                  Sign in
                </MDBBtn>
              </div>
            </MDBCardBody>
            <MDBModalFooter className="mx-5 pt-3 mb-1 justify-content-center">
              <p className="font-small blue-text d-flex">
                Not a member? Sign Up
              </p>
            </MDBModalFooter>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};
}

export default FormPage;