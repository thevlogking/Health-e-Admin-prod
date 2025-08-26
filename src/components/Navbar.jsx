import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const { dToken, setDToken } = useContext(DoctorContext)
  const { aToken, setAToken } = useContext(AdminContext)

  const navigate = useNavigate()

  const handleLogoClick = () => {
    const role = localStorage.getItem("role")

    if (role === "admin" || aToken) {
      navigate("/admin-dashboard")
    } else if (role === "doctor" || dToken) {
      navigate("/doctor-dashboard")
    } else {
      navigate("/")
    }
  }

  const logout = () => {
    // clear tokens + role
    if (dToken) {
      setDToken("")
      localStorage.removeItem("dToken")
    }
    if (aToken) {
      setAToken("")
      localStorage.removeItem("aToken")
    }
    localStorage.removeItem("role")

    navigate("/") // back to login/home
  }

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
      <div className='flex items-center gap-2 text-xs'>
        {/* Logo → navigates to correct dashboard */}
        <img
          onClick={handleLogoClick}
          className='w-18 sm:w-20 cursor-pointer'
          src={assets.admin_logo}
          alt="App Logo"
        />
        {/* Role Badge */}
        {(aToken || dToken) && (
          <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>
            {aToken ? "Admin" : "Doctor"}
          </p>
        )}
      </div>

      {/* Logout Button */}
      {(aToken || dToken) && (
        <button
          onClick={logout}
          className='bg-gradient-to-r from-pink-400 via-purple-400 to-blue-500 text-white px-8 py-3 rounded-full font-light hidden md:block hover:scale-105 transition-all'
        >
          Logout
        </button>
      )}
    </div>
  )
}

export default Navbar
