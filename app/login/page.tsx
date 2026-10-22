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
    <div>
      <h3> login </h3>
      {error && <p style={{ color: "red" }}> {error} </p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Username <br/>
            <input type="text" name="username" required />
          </label>
        </div>

        <br/>

        <div>
          <label>
            password <br/>
            <input type="password" name="password" required />
          </label>
        </div>

        <br/>

        <div>
          <button type="submit">login</button>
        </div>
      </form>
    </div>
  )
}

export default LoginPage
