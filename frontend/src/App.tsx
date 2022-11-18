import Chat from "./pages/Chat/Chat";
import Sign from "./pages/Sign/Sign";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RouteLayout from "./pages/RouteLayout";
import ProtectedRoute from "./pages/ProtectedRoute";
import NoAuthRoute from "./pages/NoAuthRoute";
import AuthProvider from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RouteLayout />}>
            <Route element={<ProtectedRoute />}>
              <Route index element={<Chat />} />
            </Route>
            <Route element={<NoAuthRoute />}>
              <Route path="/login" element={<Sign />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
