import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch,} from 'react-router-dom';
import Home from './views/Home';
import Details from './views/Details';
import UserContext from './context/UserContext';
import NavBar from './components/NavBar';
import Login from './views/Login';
import Logout from './views/Logout'
import MyFave from './views/MyFave';
import Register from './views/Register';


const getUserFromLocalStorage = JSON.parse(localStorage.getItem('user') || {})

const App = () => {
  const [user, setUser] = useState(getUserFromLocalStorage);
  
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  },[user])

  return (
    <div>      
      <Router>
      <UserContext.Provider value={{user, setUser}}>
        <NavBar />
      </UserContext.Provider>
        <Switch>
          <Route exact path='/register'><Register /></Route>
          <Route exact path="/"><Home /></Route>

        <UserContext.Provider value={{user, setUser}}>
          <Route exact path='/login'><Login /></Route>
          <Route exact path="/details/:id"><Details /></Route>
          <Route exact path='/myfave'><MyFave /></Route>
          <Route exact path='/logout'><Logout/></Route>
        </UserContext.Provider>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
