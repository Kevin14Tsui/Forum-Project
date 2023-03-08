import "./Nav.css";
import React, { useContext, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
// import { Navigate } from 'react-router-dom';
import { Outlet } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function NavHeader() {
  //nav bar scrolling}
  const [scrolling, setScrolling] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", changeNav);
    return () => {
      window.removeEventListener("scroll", changeNav);
    };
  });

  function changeNav() {
    if (window.scrollY >= 50) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  }
  //nav bar scrolling

  ////////////////////////////////////////

  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:4000/proflie", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []); //collect the username from the server

  ////////////////////////////////////////

  function logout() {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <>
      <Navbar
        expanded={expanded}
        bg="black"
        expand="lg"
        style={{
          borderBottom: scrolling ? "#04b616 solid 2px" : "#000 solid 2px",
          transition: "all 0.5s ease-in-out",
        }}
        sticky="top"
        className="p-2"
      >
        <Container fluid className="px-3 px-md-5">
          {username && (
            <>
              <Link
                to="/"
                className="text-decoration-none"
                onClick={() => setExpanded(false)}
              >
                <Navbar.Brand id="logo" className="fs-4 ">
                  {"<FEWD/>"}
                  <span style={{ fontSize: "16px" }} className="ps-1">
                    {username}
                  </span>
                </Navbar.Brand>
              </Link>
            </>
          )}
          {!username && (
            <Link
              to="/"
              className="text-decoration-none"
              onClick={() => setExpanded(false)}
            >
              <Navbar.Brand id="logo" className="fs-4 ">
                {"<FEWD/>"}
              </Navbar.Brand>
            </Link>
          )}

          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => setExpanded(expanded ? false : "expanded")}
          >
            <MenuIcon style={{ color: "#04b616" }} />
          </Navbar.Toggle>
          <Navbar.Collapse className="text-center">
            <Nav className="m-auto my-2 my-lg-0 text-center">
              <Nav.Link
                as={Link}
                to="/"
                className="text-light mx-4 my-2 my-md-0 text-decoration-none navlink"
                onClick={() => setExpanded(false)}
              >
                Home
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/post"
                className="text-light mx-4 my-2 my-md-0 text-decoration-none navlink"
                onClick={() => setExpanded(false)}
              >
                Posts
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="./games"
                className="text-light mx-4 my-2 my-md-0 text-decoration-none navlink"
                onClick={() => setExpanded(false)}
              >
                Games
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="./about"
                className="text-light mx-4 my-2 my-md-0 text-decoration-none navlink"
                onClick={() => setExpanded(false)}
              >
                About
              </Nav.Link>
            </Nav>

            {/*chang log in to Logout*/}

            {username && (
              <>
                <Nav.Link
                  onClick={logout}
                  className="text-light mx-5 my-2 my-md-0 text-decoration-none"
                >
                  <Button
                    id="login"
                    className="my-3
                  my-lg-0 fw-bolder"
                  >
                    LogOut
                  </Button>
                </Nav.Link>
              </>
            )}
            {!username && (
              <>
                <Nav.Link
                  as={Link}
                  to="./login"
                  className="text-light mx-5 my-2 my-md-0 text-decoration-none"
                  onClick={() => setExpanded(false)}
                >
                  <Button id="login" className="my-3 my-lg-0 fw-bolder">
                    LogIn
                  </Button>
                </Nav.Link>
              </>
            )}

            {/* */}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Outlet />
    </>
  );
}
