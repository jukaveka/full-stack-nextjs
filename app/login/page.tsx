"use client"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

const LoginPage = () => {
  const router = useRouter()
  const [error, setError] = useState("")

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
      router.push("/")
      router.refresh()
    }
  }

  return (
    <div className="px-10">
      <h3 className="text-3xl py-10"> Login </h3>

      {error && <p style={{ color: "red" }}> {error} </p>}

      <form onSubmit={handleSubmit}>
        <div className="py-2">
          <label> Username </label>
          <input
            type="text"
            name="username"
            required
            className="shadow block border px-1 py-1 border-slate-400 text-gray-800 focus:outline-none focus:shadow-outline mr-2 w-75"
          />
        </div>

        <div className="py-2">
          <label> Password</label>
          <input
            type="password"
            name="password"
            required
            className="shadow block border px-1 py-1 border-slate-400 text-gray-800 focus:outline-none focus:shadow-outline mr-2 w-75"
          />
        </div>

        <div className="py-5">
          <button
            type="submit"
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
