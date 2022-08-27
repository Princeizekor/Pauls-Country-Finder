import {useState} from 'react'
import { BrowserRouter as Router, Route, } from 'react-router-dom';
import Country from './components/Country';
import "./components/Country.css"
import Modal from './components/Modal';
import Navbar from './components/Navbar';

function App() {
  const [dark, setDark] = useState(false)
  
  return (
    <Router>
     <div className="App">
       <Navbar dark={dark} setDark={setDark}/>
     <Route exact path="/" >
       <Country dark={dark} setDark={setDark}/>
       </Route>
     <Route exact path="/country/:country">
       <Modal dark={dark} setDark={setDark}/>
       </Route>
      </div>
    </Router>
  );
}

export default App;
