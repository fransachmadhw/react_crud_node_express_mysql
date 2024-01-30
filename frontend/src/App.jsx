import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Create from './pages/Create';
import Update from './pages/Update';
import Read from './pages/Read';
import ToasterProvider from './components/ToasterProvider';
import ChangeThemes from './components/ChangeThemes';

function App() {
  return (
    <>
      <ToasterProvider />
      <ChangeThemes />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/create" element={<Create />}></Route>
          <Route path="/update/:id" element={<Update />}></Route>
          <Route path="/users/:id" element={<Read />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
