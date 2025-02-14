import { Outlet } from "react-router-dom";
import "./App.css";
import AuthProvider from "./contexts/AuthenticationProvider";

function App() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}

export default App;
