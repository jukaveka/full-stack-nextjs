import { redirect } from "next/navigation"
import { getCurrentUser } from "../actions/session"
import { generateToken } from "../actions/users"
import { markAsRead } from "../actions/readingLists"
import { getListsByUserId } from "../services/readingLists"

const ProfilePage = async () => {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  const readingLists = await getListsByUserId(user.id)
  const read = readingLists.filter((list) => list.read).map((list) => list.blogs)
  const unread = readingLists.filter((list) => !list.read).map((list) => {
    return { ...list.blogs, readingListId: list.id }
  })

  return (
    <div data-testid="user-profile" className="px-10 py-10 w-3xl shadow m-auto mt-10">

      <p className="py-5 font-bold text-3xl"> My profile </p>

      <p> 
        <span data-testid="user-name">
          <span className="font-bold"> Name: </span>{user.name}
        </span>
      </p>

      <p> 
        <span data-testid="user-username">
          <span className="font-bold"> Username: </span>{user.username}
        </span>
      </p>

      <hr className="mt-10 mb-10" />

      <div data-testid="reading-list-section">
        <p className="font-bold text-2xl py-5"> Reading list </p>

        {readingLists.length > 0 ? (
          <>
            <div data-testid="unread-section">
              <p className="font-bold text-xl pb-5"> Unread </p>

              {unread.length > 0 ? (
                unread.map((blog) => (
                <div key={blog.id} className="bg-sky-100 px-4 py-4 mb-5 rounded w-full">
                  <form action={markAsRead} className="flex justify-between items-center">
                    {blog.title}
                    <input type="hidden" name="listId" value={blog.readingListId} />
                    <button
                      type="submit"
                      data-testid={`mark-read-${blog.id}`}
                      className="bg-blue-500 hover:bg-blue-700 px-5 py-3 text-white rounded font-bold "
                    >
                      READ
                    </button>
                  </form>
                </div>
              ))
            ) : (
              <div data-testid="no-unread-blogs">
                You currently have no unread blogs. Add your own blogs or browse blogs for more reading
              </div>
            )}
            </div>

            <p className="font-bold text-xl py-5"> Read </p>

            {read.length > 0 ? (
              read.map((blog) => (
                <div key={blog.id} className="bg-green-100 px-4 py-4 mb-5 rounded w-full">
                  {blog.title}
                </div>
              ))
            ) : (
              <div>
                You currently have no read blogs. Mark blogs as read, and they will show here.
              </div>
            )}
          </>
        ) : (
          <div data-testid="empty-reading-list">
            Reading list is empty. Add your own blogs or browse blogs for more reading
          </div>
        )}
      </div>

      <hr className="mt-10 mb-10" />

      <div data-testid="api-token-section">
        <p className="font-bold text-2xl py-5"> API Token </p>

        <div data-testid="token-display" className="bg-slate-100 px-5 py-5">
          <p className="py-2">Current token: </p>
          <p className="bg-slate-200 px-5 py-5">
            {user.token ? (
              <span data-testid="api-token">
                {user.token}
              </span>
            ) : (
              <span data-testid="no-token-message">
                Token has not been generated yet
              </span>
            )}
          </p>
        </div>

        <form action={generateToken}>
          <div className="py-5">
            <input type="hidden" name="userId" value={user.id} />
            <button
              type="submit"
              data-testid="generate-token-button"
              className="bg-blue-500 hover:bg-blue-700 px-5 py-3 text-white rounded font-bold "
            >
              GENERATE TOKEN
            </button>
          </div>
        </form>
      </div>

    </div>
  )
}

export default ProfilePage
