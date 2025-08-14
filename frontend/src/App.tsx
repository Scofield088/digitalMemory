import Dashboard from "./Pages.tsx/dashboard"
import { Signin } from "./Pages.tsx/Signin"
import { Signup } from "./Pages.tsx/Signup"
import { BrowserRouter,Routes,Route } from "react-router-dom"
function App() {
    return <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/signin" element={<Signin/>}></Route>
      <Route path="/dashboard" element={<Dashboard/>}></Route>
    </Routes>
    </BrowserRouter>
}

export default App
