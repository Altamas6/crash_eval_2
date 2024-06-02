import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const Navbar = () => {
  const { authState, logout } = useContext(AuthContext);

  return (
    <nav>
      {authState.isAuthenticated? (
        <>
          <span>{authState.email}</span>
          <Link to="/">Home</Link>
          <button onClick={logout}>LOGOUT</button>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
};

export default Navbar;