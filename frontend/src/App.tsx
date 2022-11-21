import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import NoAuthRoute from "./components/NoAuthRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import RouteLayout from "./components/RouteLayout";
import AuthProvider from "./contexts/AuthContext";
import QueryProvider from "./contexts/QueryProvider";
import Chat from "./pages/Chat/Chat";
import NotFound from "./pages/NotFound";
import Sign from "./pages/Sign/Sign";

function App() {
  return (
    <AuthProvider>
      <QueryProvider>
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
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryProvider>
    </AuthProvider>
  );
}

export default App;
