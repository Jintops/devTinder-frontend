import { BrowserRouter, Routes,Route } from "react-router-dom"
import Login from "./Login"
import Body from "./Body"
import Profile from "./Profile"

function App() {
 

  return (
    <>
    <BrowserRouter basename="/">
    <Routes>
      <Route path="/" element={<Body/>}>
      <Route path="/profile" element={<Profile/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      </Route>
      
    </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App
