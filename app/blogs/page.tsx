import { getBlogs } from "../services/blogs"

const Blogs = async ({ searchParams }: { searchParams: Promise<{ filter: string }>}) => {
  const { filter } = await searchParams
  const blogs = await getBlogs(filter)

  return (
    <div className=" shadow m-auto w-3xl px-10 py-10 mt-10">

      <p className="text-3xl px-10 py-5"> Blogs </p>

      <form action={`/blogs`} className="px-10 pb-5">
        <input
          type="text"
          name="filter"
          data-testid="filter-input"
          className="shadow border rounded text-gray-800 focus:outline-none focus:shadow-outline mr-2"
        />
        <button
          type="submit"
          data-testid="search-button"
          className="bg-slate-600 px-5 py-1 text-white rounded text-bold"
        >
          Filter
        </button>
      </form>

      <ul data-testid="blogs-list" className="px-10" >
        {blogs.map((blog) => (
          <div key={blog.id}>
           <a href={`/blogs/${blog.id}`}>
              <li className=" bg-slate-100 hover:bg-slate-200 py-3 px-3 mb-5 block">
                <p className="block">{blog.author}</p>
                <p className="font-bold text-xl py-2"> {blog.title} </p>
                <p>{blog.likes} likes</p>
              </li>
            </a>
          </div>
        ))}
      </ul>

    </div>
  )
}

export default Blogs
