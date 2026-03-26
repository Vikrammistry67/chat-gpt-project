import React from 'react'
import AppRoute from '../AppRoutes/AppRoute'
import Navbar from './NavComponent/Navbar'
import Footer from './footerComponent/Footer'

const Layout = () => {
    return (
        <div>
            <Navbar />
            <AppRoute />
        </div>
    )
}

export default Layout