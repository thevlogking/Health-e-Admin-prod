import axios from 'axios'
import React, { useContext, useState, useEffect } from 'react'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [state, setState] = useState('Admin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const { setDToken } = useContext(DoctorContext)
  const { setAToken } = useContext(AdminContext)

  const navigate = useNavigate()

  // Clear tokens whenever browser is refreshed/opened (force logout)
  useEffect(() => {
    localStorage.removeItem('aToken')
    localStorage.removeItem('dToken')
    setAToken(null)
    setDToken(null)
  }, [setAToken, setDToken])

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      if (state === 'Admin') {
        const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })
        if (data.success) {
          setAToken(data.token)
          localStorage.setItem('aToken', data.token)
          toast.success("Admin login successful")
          navigate('/admin-dashboard') 
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password })
        if (data.success) {
          setDToken(data.token)
          localStorage.setItem('dToken', data.token)
          toast.success("Doctor login successful")
          navigate('/doctor-dashboard')
        } else {
          toast.error(data.message)
        }
      }
    } catch (err) {
      toast.error("Something went wrong, please try again.")
    }
  }

  return (
    <div 
      className="min-h-[100vh] flex items-center justify-center relative" 
      style={{
        backgroundImage: "url('/bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay for reduced opacity */}
      <div className="absolute inset-0 bg-black opacity-80"></div>

      <form 
        onSubmit={onSubmitHandler} 
        className="relative z-10 flex flex-col gap-5 m-auto items-start p-10 min-w-[360px] sm:min-w-[420px] border rounded-2xl text-gray-700 text-sm shadow-xl bg-white font-[Poppins]"
      >
        <p className="text-3xl font-bold m-auto tracking-wide">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-500">{state}</span> Login
        </p>

        {/* Email Input */}
        <div className="w-full">
          <p className="mb-1 font-medium">Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border border-gray-300 rounded-lg w-full p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
            type="email"
            required
          />
        </div>

        {/* Password Input */}
        <div className="w-full">
          <p className="mb-1 font-medium">Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="border border-gray-300 rounded-lg w-full p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
            type="password"
            required
          />
        </div>

        <button className="bg-gradient-to-r from-pink-400 via-rose-400 to-red-400 text-white w-full py-3 rounded-lg text-lg font-semibold shadow-md hover:opacity-90 transition-all">
  Login
</button>



        {/* Switch Login Mode */}
        {state === 'Admin' ? (
          <p className="text-center w-full">
            Doctor Login?{" "}
            <span
              onClick={() => setState('Doctor')}
              className="text-pink-600 underline cursor-pointer font-medium"
            >
              Click here
            </span>
          </p>
        ) : (
          <p className="text-center w-full">
            Admin Login?{" "}
            <span
              onClick={() => setState('Admin')}
              className="text-pink-600 underline cursor-pointer font-medium"
            >
              Click here
            </span>
          </p>
        )}
      </form>
    </div>
  )
}

export default Login