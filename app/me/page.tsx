import { redirect } from "next/navigation"
import { getCurrentUserWithReadingList } from "../actions/session"
import { generateToken } from "../actions/users"
import { markAsRead } from "../actions/readingLists"

const ProfilePage = async () => {
  const user = await getCurrentUserWithReadingList()

  if (!user) {
    redirect("/login")
  }

  const read = user.readingLists.filter((blog) => blog.read).map((blog) => blog.blogs)
  const unread = user.readingLists.filter((blog) => !blog.read).map((blog) => {
    return {...blog.blogs, readingListId: blog.id} 
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

        {user.readingLists.length > 0 ? (
          <>
            <p className="font-bold text-xl pb-5"> Unread </p>
            <div>
              {unread.map((blog) => (
                <div key={blog.id} className="bg-sky-100 px-4 py-4 mb-5 rounded w-full">
                  <form action={markAsRead} className="flex justify-between items-center">
                    {blog.title}
                    <input type="hidden" name="listId" value={blog.readingListId} />
                    <button
                      type="submit"
              
                      className="bg-blue-500 hover:bg-blue-700 px-5 py-3 text-white rounded font-bold "
                    >
                      DONE
                    </button>
                  </form>
                </div>
              ))}
            </div>

            <p className="font-bold text-xl py-5"> Read </p>
            {read.map((blog) => (
              <div key={blog.id} className="bg-green-100 px-4 py-4 mb-5 rounded w-full">
                {blog.title}
              </div>
            ))}
          </>
        ) : (
          <div data-testid="empty-reading-list">
            Reading list is empty. Start by adding blogs or browsing blogs added by others
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
