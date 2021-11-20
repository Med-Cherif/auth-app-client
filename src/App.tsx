import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute';
import Home from './screens/Home';
import Register from './screens/Register';
import Login from './screens/Login';
import AuthRoute from './routes/AuthRoute';
import ErrorBox from './components/ErrorBox';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import CheckingConfirmaion from './components/CheckingConfirmaion';
import Confirmation from './components/Confirmation';

function App() {
  const { errors, accessToken } = useSelector((state: RootState) => state.auth)
  const { userData } = useSelector((state: RootState) => state.user)

  return (
    <div className="App">
      <Switch>
        <PrivateRoute exact path="/">
          <Home />
        </PrivateRoute>
        <AuthRoute path="/register">
          <Register />
        </AuthRoute>
        <AuthRoute path="/login">
          <Login />
        </AuthRoute>
        {
          accessToken && userData?.isActive === false && (
            <>
              <Route path="/checking/confirmation">
                  <CheckingConfirmaion />
              </Route>
              <Route path="/confirmation/:email/:token">
                <Confirmation />
              </Route>
            </>
          )
        }
        <Route path="*">
          <h1>404 page not found...</h1>
        </Route>
      </Switch>
      { errors && <ErrorBox /> }
    </div>
  );
}

export default App;
