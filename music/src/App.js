import logo from './logo.svg';
import './App.css';
import Search from './components/Search'
import Favorites from './components/Favorites';
import {BrowserRouter, Routes,Route, Link} from 'react-router-dom'
function App() {
  return (
  <BrowserRouter>
    <div>

      <nav >
        <ul className='nav-bar'>
          <li>
            <Link className='nav-item' to="/search">Search</Link>
             </li>
          <li>
            <Link className='nav-item' to="/myfav">
            My Favourites
            </Link></li>
        </ul>
      </nav>
     <Routes>
       <Route path='/search' element={<Search/>} />
       <Route path="/myfav" element={<Favorites/>} />
     </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
