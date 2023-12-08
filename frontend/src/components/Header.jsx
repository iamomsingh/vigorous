import {Navbar, Nav, Container, NavbarBrand, NavbarToggle, NavbarCollapse,Badge, NavDropdown, NavLink} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import { FaUser} from 'react-icons/fa';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import {logout} from '../slices/authSlice';

const Header = () => {
    const {userInfo} = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async() => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/login');
        } catch (err) {
            console.error(err)
        }
    }

  return (
    <header>
        <Navbar bg='dark' variant='dark' expand = 'md' collapseOnSelect>
            <Container>
                <LinkContainer to= '/'>
                    <NavbarBrand>
                        <img src= {logo} alt='Vigorous-Healthcare' height={35} width={35} className='mx-1'/>
                        Vigorous
                    </NavbarBrand>
                </LinkContainer>

                <NavbarToggle aria-controls='basic-navbar-nav'></NavbarToggle>

                <NavbarCollapse id='basic-navbar-nav'>
                    <Nav className='ms-auto'>
                        {userInfo ? (
                            <NavDropdown title={userInfo.name} id ='username'>
                                <NavDropdown.Item onClick={logoutHandler}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <LinkContainer to='/login'>
                            <Nav.Link>
                                <FaUser />
                                Sign In
                            </Nav.Link>
                            </LinkContainer>
                            
                        )}
                        
                        <LinkContainer to='/register'>
                        <Nav.Link>
                            <FaUser />
                            Register
                        </Nav.Link>
                        </LinkContainer>
                        
                    </Nav>
                </NavbarCollapse>
            </Container>

        </Navbar>
    </header>
  )
};

export default Header;