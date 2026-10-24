import { notFound } from "next/navigation"
import { getCurrentUser } from "../actions/session"
import { generateToken } from "../actions/users"

const ProfilePage = async () => {
  const user = await getCurrentUser()

  if (!user) {
    return notFound()
  }

  return (
    <div className="px-10 py-10 w-3xl shadow m-auto mt-10">

      <p className="py-5 font-bold text-3xl"> My profile </p>

      <p> <a className="font-bold">Name:</a> {user.name}</p>

      <p> <a className="font-bold">Username</a> {user.username}</p>

      <p className="font-bold text-2xl py-5"> API Token </p>
      
      <div className="bg-slate-100 px-5 py-5">
        <p className="py-2">Current token: </p>

        <p className="bg-slate-200 px-5 py-5">
          {user.token ? (
            <>{user.token}</>
          ) : (
            <>Token has not been generated yet</>
          )}
        </p>

      </div>

      <p></p>

      <form action={generateToken}>
        <div className="py-5">
          <input type="hidden" name="userId" value={user.id} />
          <button
            type="submit"
            className="bg-blue-500 px-5 py-3 text-white rounded font-bold"
          >
            GENERATE TOKEN
          </button>
        </div>
      </form>

    </div>
  )
}

export default ProfilePage
