import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Navbar from './Navbar';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import ProductDetailsPage from './ProductDetailsPage';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/login" component={LoginPage} />
          <PrivateRoute path="/" exact component={HomePage} />
          <PrivateRoute path="/product/:id" component={ProductDetailsPage} />
          <Redirect to="/login" />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
};

const PrivateRoute = ({ component: Component,...rest }) => {
  const { authState } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        authState.isAuthenticated? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default App;