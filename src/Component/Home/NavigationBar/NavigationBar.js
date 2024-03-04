import React, { useEffect, useState } from "react";
// import { useEffect, useState } from "react";
import logo from "../../../pics/logo3.jpg";
// import logo from "../../../pics/logo2.png";
import { Image, Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navcomponent from "./Navcomponent";
import NavsocialIcon from "./NavsocialIcon";
// import { useNavigate } from 'react-router';
import { useNavigate } from "react-router";
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Grid from "@mui/material/Grid";
import Badge from "@mui/material/Badge";
import "../../../style/Nav.css";

function NavigationBar() {
  let reg = localStorage.getItem("login-user-info");
  let element = JSON.parse(reg);
  let emailuser = element[0].element.Email;
  let passworduser = element[0].element.Password;
  let FNameuser = element[0].element.FName;
  let LNameuser = element[0].element.LName;
  // console.log("FNameuser", FNameuser);

  let login = localStorage.getItem("login-info");
  let logindata = JSON.parse(login);
  let emaillogin = logindata[0].logindata.email;
  let passwordlogin = logindata[0].logindata.password;

  let isloggedin;
  if (emailuser === emaillogin && passworduser === passwordlogin) {
    isloggedin = true;
  } else {
    isloggedin = false;
  }
  // console.log( "isloggedin",isloggedin);
  // console.log( "emailuser",emailuser);
  // console.log( "passworduser",passworduser);
  // console.log( "emaillogin",emaillogin);
  // console.log( "passwordlogin",passwordlogin);

  const navigate = useNavigate();

  const logout = () => {
    let logindata = {
      email: "$@.com",
      password: "********",
    };
    const element = {
      City: " ",
      Email: " ",
      FName: "visitor",
      Gender: " ",
      LName: " ",
      Mobile: 0,
      Password: "123",
      State: " ",
      Status: " ",
      UID: 0,
      likes: " ",
    };

    localStorage.setItem("login-info", JSON.stringify([{ logindata }]));
    localStorage.setItem("login-user-info", JSON.stringify([{ element }]));
    navigate("/home");
  };

  const [users, setUsers] = useState([]);

  const fetchData = () => {
    fetch("http://localhost:4500/list")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUsers(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ backgroundColor: "white" }}>
      <div
        className=" jumbotron   "
        style={{
          fontFamily: "serif",
        }}
      >
        {/* <Container > */}
        <Row>
          <Navbar expand="lg" className=" d-flex justify-content-center">
            <Col xs={2} md={1}>
              <Navbar.Brand style={{}}>
                <Image
                  src={logo}
                  roundedCircle
                  thumbnail
                  style={{ width: "4rem" }}
                />
                {/* <img
                  src={logo}
                  className="card-img-top image1"
                  alt="..."
                  as={Link}
                  to="/home"
                  style={{ width: "80px"}}
                /> */}
              </Navbar.Brand>
            </Col>
            <Col xs={6} md={7} className="w-auto">
              <Navbar.Toggle
                style={{ height: "30px" }}
                aria-controls="basic-navbar-nav "
              />
              <Navbar.Collapse
                id="basic-navbar-nav "
                style={{
                  fontFamily: "serif",
                }}
              >
                <Nav className="me-auto   fs-5 ">
                  <Navcomponent />
                </Nav>
              </Navbar.Collapse>
            </Col>
            <Col xs={3} md={3}>
              <Navbar style={{ justifyContent: "end" }}>
                <div className="  ">
                  <div className="col">
                    {!isloggedin ? (
                      <div>
                        <div className="col">
                          <Link
                            type="button"
                            className="btn btn-outline-primary me-2 fs-7"
                            as={Link}
                            to="/SignIn"
                          >
                            SignIn
                          </Link>
                          <Link
                            type="button"
                            className="btn btn-outline-primary fs-7"
                            as={Link}
                            to="/SignUp"
                          >
                            SignUp
                          </Link>
                        </div>
                        <div>{/* <NavsocialIcon /> */}</div>
                      </div>
                    ) : (
                      <div>
                        <div className="col">
                          <Grid container spacing={0}>
                            <Grid item xs={10}>
                              <div>
                                <h4>
                                  <Badge className="rounded-2 px-2">
                                    <AccountCircleIcon />
                                    {FNameuser} {LNameuser}{" "}
                                  </Badge>
                                </h4>
                              </div>
                            </Grid>
                            <Grid item xs={2}>
                              <div style={{}}>
                                <button
                                  className="btn btn-outline-primary fs-50"
                                  onClick={logout}
                                >
                                  logout
                                </button>
                              </div>
                            </Grid>
                          </Grid>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Navbar>
            </Col>
          </Navbar>
        </Row>
        {/* </Container> */}
      </div>
    </div>
  );
}

export default NavigationBar;
