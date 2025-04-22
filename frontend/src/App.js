import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Notaccess from "./pages/Notaccess";
import EventDetailPage from "./components/EventDetailPage";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";
import AllEvent from "./pages/AllEvent";
import SearchResults from "./components/SearchResults";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <>
  <UserProvider>
    <Router>
      <Navbar/>
      <ScrollToTop>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/dashboard" element={localStorage.getItem("is_admin") == 1 ?<Dashboard/>:<Notaccess/>}/>
        <Route path="/event/:id" element={<EventDetailPage />} />
        <Route path="/allEvents" element={<AllEvent/>}/>
        <Route path="/search" element={<SearchResults/>}/>
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      </ScrollToTop>
      <Footer/>
    </Router>
  </UserProvider>
    
    
    
    </>
  );
}

export default App;
