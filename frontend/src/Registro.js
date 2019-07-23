import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn } from 'mdbreact';

class RegistroForm extends Component {

	constructor(props) {

		super(props)

		this.state = {
			name: "",
		}
		this.validarDatos = this.validarDatos.bind(this);
	}

	detectarCambios(e) {

		this.setState({ name: e.target.value })

	}

	validarDatos() {

		fetch("http://localhost:3000/redAgro/usuario", {
			method: "POST",
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify({ "name": this.state.name }),
		})
			.then((response) => response.json())
			.then(
				(result) => {
					alert("Registro exitoso");
				}
			);

	}



	render() {

		return (
			<MDBContainer>
				<MDBRow className="justify-content-center">
					<MDBCol className="col-md-5">
						<MDBCard>
							<MDBCardBody className="mx-4">
								<div className="text-center">
									<h3 className="dark-grey-text mb-5">
										<strong>Register</strong>
									</h3>
								</div>
								<MDBInput
									label="Your name"
									group
									type="text"
									validate
									onChange={(e) => this.detectarCambios(e)}
								/>
								<MDBInput
									label="Your password"
									group
									type="password"
									validate
									containerClass="mb-0"
								/>
								<div className="text-center mb-3">
									<MDBBtn
										type="submit"
										gradient="dusty-grass"
										rounded
										className="btn-block z-depth-1a"
										onClick={this.validarDatos}
									>
										Register
                </MDBBtn>
								</div>
							</MDBCardBody>
						</MDBCard>
					</MDBCol>
				</MDBRow>
			</MDBContainer>
		);
	};
}

export default RegistroForm;