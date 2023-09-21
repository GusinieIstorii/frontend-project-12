import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PageOne from './Components/Pages';
import { Page404 } from './Pages/Page404';
import { LoginPage } from './Pages/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Page404 />} />
        <Route path="one" element={<PageOne />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
