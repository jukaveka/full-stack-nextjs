import { getUsers } from "../services/users"

const UserPage = async () => {
  const users = await getUsers()

  return (
    <div>
      <h3 className="text-3xl px-10 py-5"> Users </h3>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="px-10 py-1">
            <a href={`/users/${user.username}`} className="text-blue-500 underline">{user.name}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserPage
