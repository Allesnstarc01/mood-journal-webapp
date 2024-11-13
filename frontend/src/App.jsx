import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import NavBar from "./components/navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/footer";
import SignUp from "./components/signup";
import PrivateContent from "./components/PrivateComponent";
import Login from "./components/login";
import PostContextAPI from "./store/contextAPI";
import MyJournal from "./components/MyJournal";
import AddJournal from "./components/createJournal";
import UpdateJournal from "./components/upadte";

function App() {
  return (
    <>
      <BrowserRouter>
        <PostContextAPI>
          <NavBar />
          <Routes>
            <Route element={<PrivateContent />}>
              <Route path="/my-journal" element={<MyJournal />} />
              <Route path="/create-journal" element={<AddJournal />} />
              <Route path="/update/:id" element={<UpdateJournal />} />
              <Route path="/logout" element={<h1>Logged Out...</h1>} />
            </Route>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          <Footer />
        </PostContextAPI>
      </BrowserRouter>
    </>
  );
}

export default App;
