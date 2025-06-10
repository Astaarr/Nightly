import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./features/authentication/context/AuthContext";
import { NotificationProvider } from "./core/context/NotificationContext";
import AppRoutes from "./core/routes";
import Header from "./core/layouts/Header";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NotificationProvider>
          <Header />
          <AppRoutes />
        </NotificationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
