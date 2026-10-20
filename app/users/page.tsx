export const instant = false

import { getUsers } from "../services/users"

const UserPage = async () => {
  const users = await getUsers()

  return (
    <div>
      <h3> Users </h3>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserPage
