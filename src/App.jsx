import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./pages/Header/Header"
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from "./pages/Form/Form";
import Home from "./pages/Home/Home";
import SignUp from "./pages/Auth/SignUp";
import LogIn from "./pages/Auth/Login";
import { Provider } from "react-redux";
import store from "./Redux/store";


function App() {


  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/form" element={<Form />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/logIn" element={<LogIn />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
