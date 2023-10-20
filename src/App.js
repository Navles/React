import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Outlet from "./Layout/Outlet";
import Home from "./Layout/Home";
// import About from "./Layout/About";
// import Contact from "./Layout/Contact";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import USCreate from "./Components/Pages/Usestate/USCreate";
import USTable from "./Components/Pages/Usestate/USTable";
import Usereducercreate from "./Components/Pages/Usereducer/Usereducercreate";
import Usereducertable from "./Components/Pages/Usereducer/Usereducertable";
import UseContextCreate from "./Components/Pages/Usecontext/UseContextCreate";
import UseContextTable from "./Components/Pages/Usecontext/UseContextTable";
import { GlobalProvider } from "./Components/Pages/Usecontext/GobleState";
import { Provider } from "react-redux";
import store from "./Components/Pages/Redux/Reducer/store";
import ReduxCreate from "./Components/Pages/Redux/ReduxCreate";
import ReduxTable from "./Components/Pages/Redux/ReduxTable";


function App() {
  return (
    <Provider store={store}>
      <GlobalProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Outlet />}>
              <Route exact path="/" element={<Home />} />
              {/* <Route exact path="/About" element={<About />} />
          <Route exact path="/Contact" element={<Contact />} /> */}
              <Route exact path="/USCreate" element={<USCreate />} />
              <Route exact path="/USCreate/:id" element={<USCreate />} />
              <Route exact path="/USTable" element={<USTable />} />
              <Route
                exact
                path="/Usereducercreate"
                element={<Usereducercreate />}
              />
              <Route
                exact
                path="/Usereducercreate/:id"
                element={<Usereducercreate />}
              />
              <Route
                exact
                path="/Usereducertable"
                element={<Usereducertable />}
              />
              <Route
                exact
                path="/UseContextCreate"
                element={<UseContextCreate />}
              />
              <Route
                exact
                path="/UseContextCreate/:id"
                element={<UseContextCreate />}
              />
              <Route
                exact
                path="/UseContextTable"
                element={<UseContextTable />}
              />
              <Route exact path="/reduxcreate" element={<ReduxCreate />} />
              <Route exact path="/reduxcreate/:id" element={<ReduxCreate />} />
              <Route exact path="/reduxtable" element={<ReduxTable/>} />

            </Route>
          </Routes>
          <ToastContainer />
        </BrowserRouter>
      </GlobalProvider>
    </Provider>
  );
}

export default App;
