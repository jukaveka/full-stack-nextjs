"use client"

import { useActionState } from "react"
import { registerUser } from "../actions/users"

const RegisterPage = () => {
  const [state, formAction] = useActionState(registerUser, {
    errors: { username: "", name: "", password: "", passwordAgain: "" } ,
    values: { username: "", name: "", password: "", passwordAgain: "" }
  })

  return (
    <div>
      <h3> Registration </h3>

      <form action={formAction}>

        <div>
          <label>
            Username <br/>
            <input type="text" name="username" defaultValue={state.values.username} />
          </label>
          {state.errors.username && <p style={{ color: "red" }}>{state.errors.username}</p>}
        </div>

        <br/>

        <div>
          <label>
            Name <br/>
            <input type="text" name="name" defaultValue={state.values.name} />
          </label>
          {state.errors.name && <p style={{ color: "red" }}>{state.errors.name}</p>}
        </div>

        <br/>

        <div>
          <label>
            Password <br/>
            <input type="password" name="password" defaultValue={state.values.password} />
          </label>
          {state.errors.password && <p style={{ color: "red" }}>{state.errors.password}</p>}
        </div>

        <br/>

        <div>
          <label>
            Password again<br/>
            <input type="password" name="passwordAgain" defaultValue={state.values.passwordAgain} />
          </label>
          {state.errors.passwordAgain && <p style={{ color: "red" }}>{state.errors.passwordAgain}</p>}
        </div>

        <br/>

        <div>
          <button type="submit"> Register </button>
        </div>

      </form>
    </div>
  )
}

export default RegisterPage
