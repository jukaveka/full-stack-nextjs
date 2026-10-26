"use client"

import { useActionState } from "react"
import { registerUser } from "../actions/users"

const RegisterPage = () => {
  const [state, formAction] = useActionState(registerUser, {
    errors: { username: "", name: "", password: "", passwordConfirm: "" } ,
    values: { username: "", name: "", password: "", passwordConfirm: "" }
  })

  return (
    <div className="px-10 py-10 w-2xl shadow m-auto mt-10">
      <h3 className="text-3xl py-10 px-35"> Registration </h3>

      <form action={formAction} className="px-35">

        <div className="py-2">
          <label>
            Username
            <input
              type="text"
              name="username"
              defaultValue={state.values.username}
              className="shadow block border px-1 py-1 border-slate-400 text-gray-800 focus:outline-none focus:shadow-outline mr-2 w-75"
            />
          </label>
          {state.errors.username && <p data-testid="username-error" style={{ color: "red" }}>{state.errors.username}</p>}
        </div>

        <div className="py-2">
          <label>
            Name
            <input
              type="text"
              name="name"
              defaultValue={state.values.name}
              className="shadow block border px-1 py-1 border-slate-400 text-gray-800 focus:outline-none focus:shadow-outline mr-2 w-75"
            />
          </label>
          {state.errors.name && <p data-testid="name-error" style={{ color: "red" }}>{state.errors.name}</p>}
        </div>

        <div className="py-2">
          <label>
            Password
            <input
              type="password"
              name="password"
              defaultValue={state.values.password}
              className="shadow block border px-1 py-1 border-slate-400 text-gray-800 focus:outline-none focus:shadow-outline mr-2 w-75"
            />
             </label>
          {state.errors.password && <p data-testid="password-error" style={{ color: "red" }}>{state.errors.password}</p>}
        </div>

        <div className="py-2">
          <label>
            Confirm Password
            <input
              type="password"
              name="passwordConfirm"
              defaultValue={state.values.passwordConfirm}
              className="shadow block border px-1 py-1 border-slate-400 text-gray-800 focus:outline-none focus:shadow-outline mr-2 w-75"
            />
          </label>
          {state.errors.passwordConfirm && <p data-testid="passwordConfirm-error" style={{ color: "red" }}>{state.errors.passwordConfirm}</p>}
        </div>

        <div className="py-5">
          <button
            type="submit"
            data-testid="register-button"
            className="bg-slate-700 px-5 py-3 text-white rounded font-bold"
          >
            REGISTER
          </button>
        </div>

      </form>
    </div>
  )
}

export default RegisterPage
