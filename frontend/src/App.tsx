import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import NoAuthRoute from "./components/NoAuthRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import RouteLayout from "./components/RouteLayout";
import AuthProvider from "./contexts/AuthContext";
import Chat from "./pages/Chat/Chat";
import NotFound from "./pages/NotFound";
import Sign from "./pages/Sign/Sign";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<RouteLayout />}>
            <Route path="/" element={<Navigate to="/chat" />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/chat/*" element={<Chat />} />
            </Route>
            <Route element={<NoAuthRoute />}>
              <Route path="/login" element={<Sign />} />
            </Route>
            <Route path="/*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
