"use client"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useNotification } from "../components/NotificationProvider"

const LoginPage = () => {
  const router = useRouter()
  const [error, setError] = useState("")
  const { showNotification } = useNotification()

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const result = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    })

    if (result?.error) {
      setError("Invalid login credentials")
    } else {
      showNotification("Login successful")
      router.push("/")
      router.refresh()
    }
  }

  return (
    <div className="px-10 py-10 w-2xl shadow m-auto mt-10">
      <h3 className="text-3xl py-10 px-35"> Login </h3>

      {error && <p
        style={{ color: "red" }}
        data-testid="error-message"
        className="px-35"
      >
        {error}
      </p>
      }

      <form onSubmit={handleSubmit} className="px-35">
        <div className="py-2">
          <label>
            Username
            <input
              type="text"
              name="username"
              required
              className="shadow block border px-1 py-1 border-slate-400 text-gray-800 focus:outline-none focus:shadow-outline mr-2 w-75"
            />
          </label>
        </div>

        <div className="py-2">
          <label>
            Password
            <input
              type="password"
              name="password"
              required
              className="shadow block border px-1 py-1 border-slate-400 text-gray-800 focus:outline-none focus:shadow-outline mr-2 w-75"
            />
          </label>
        </div>

        <div className="py-5">
          <button
            type="submit"
            data-testid="login-button"
            className="bg-slate-700 px-5 py-3 text-white rounded font-bold"
          >
            LOGIN
          </button>
        </div>
      </form>
    </div>
  )
}

export default LoginPage
