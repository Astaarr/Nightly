import { BrowserRouter } from 'react-router-dom';
import Header from './layouts/Header';
import AppRoutes from './routes';



function App() {
  return (
    <BrowserRouter>
      <Header />
      <AppRoutes />
    </BrowserRouter>

  );
}

export default App;
