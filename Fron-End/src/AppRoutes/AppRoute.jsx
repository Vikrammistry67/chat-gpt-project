import { Route, Routes } from "react-router-dom"
import Home from "../AllPages/Home"
import Register from "../AllPages/Register"
import Login from "../AllPages/Login"
import GptUI from "../AllPages/GptUI"
import Footer from "../components/footerComponent/Footer"

const AppRoute = () => {
    return (
        <div className="w-full h-full">
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/registerUser' element={<Register />} />
                <Route path='/loginUser' element={<Login />} />
                <Route path='/gpt' element={<GptUI />} />
            </Routes>
            <Footer />
        </div>
    )
}

export default AppRoute