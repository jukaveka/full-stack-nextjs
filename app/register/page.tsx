import { registerUser } from "../actions/users"

const RegisterPage = () => {
  return (
    <div>
      <h3> Registration </h3>
      <form action={registerUser}>
        <div>
          <label>
            Username <br/>
            <input type="text" name="username" required />
          </label>
        </div>

        <br/>

        <div>
          <label>
            Name <br/>
            <input type="text" name="name" required />
          </label>
        </div>
        
        <br/>
        
        <div>
          <label>
            Password <br/>
            <input type="password" name="password" required />
          </label>
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