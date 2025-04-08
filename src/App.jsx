import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router";
import { useContext} from "react";
import Layout from "./layout/Layout";
import Home from "./pages/HomeApp/Home";
import Game from "./pages/GameApp/Game";
import Genre from "./pages/GenreApp/Genre";
import PlatformDetails from "./pages/PlatformApp/PlatformDetails";
import SearchGame from "./pages/SearchGame/SearchGame";
import SingUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import Account from "./pages/AccountApp/Account";
import SessionContextProvider from "./context/SessionContextProvider";
import SessionContext from "./context/SessionContext";
import FavContextProvider from "./context/FavContextProvider";
import { CircleLoader } from "react-spinners";
import Reviews from "./pages/ReviewApp/reviews";


function ProtectedRoute() {
  const { session, loading } = useContext(SessionContext);

  if (loading) {
    return <CircleLoader />; 
  }

  if (!session) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}

export function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/Game/:id" element={<Game />} />
          <Route path="/Genre/:genre" element={<Genre />} />
          <Route path="/PlatformDetails/:platform" element={<PlatformDetails />} />
          <Route path="/search" element={<SearchGame />} />
          <Route path="/reviews/:id" element={<Reviews />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/Account" element={<Account />} />
          </Route>
        </Route> 
        <Route path="/register" element={<SingUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )

}

function Root() {
  return (
    <>
    <SessionContextProvider>
      <FavContextProvider>
        <App />
      </FavContextProvider>
    </SessionContextProvider>
    </>
  )
}

export default Root;
