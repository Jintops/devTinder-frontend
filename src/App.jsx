import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import HomePage from "./components/HomePage";
import Footer from "./components/Footer";  // Import Footer
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Body from "./components/Body";  // Ensure Body is a proper layout

function App() {
  
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Body />}>
                <Route index element={<HomePage />} />
                <Route path="feed" element={<Feed />} />
                <Route path="profile" element={<Profile />} />
                <Route path="login" element={ <Login />} />
                <Route path="connections" element={<Connections />} />
                <Route path="requests" element={<Requests />} />
              </Route>
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
