import './App.css';
import Item from './pages/Item';
import Search from './pages/Search';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      {/* <Search /> */}
       <Router>
        <Routes>
          {/* Define your routes here */}
          <Route path="/" element={<Search />} />
          <Route path="/search" element={<Search />} />
          <Route path="/item/:itemId" element={<Item />} />
          {/* <Route path="/bot-found" element={<Item />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
