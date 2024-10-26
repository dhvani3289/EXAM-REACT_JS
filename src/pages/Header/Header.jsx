
import './header.css'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useEffect } from 'react';

function Header() {

    let dispatch = useDispatch();
    let userData = useSelector((state) => state.loginRoot.loginDetails);
    console.log(userData);
    
    let logoutUser = () => {
        window.location = "/logIn"
    }

    return (
        <>
            <Navbar expand="lg" className="header">
                <Container>
                    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className='header-list'>
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/form">Form</Nav.Link>
                            {userData.email ?
                                <span>{userData.email}</span>
                                :
                                <Nav.Link href="/signUp">SIGN UP</Nav.Link>
                            }

                            {userData.username ?
                                <button onClick={() => logoutUser()}>Logout</button>
                                :
                                <Nav.Link href="/logIn">LOG IN</Nav.Link>
                            }

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </>
    )
}

export default Header;