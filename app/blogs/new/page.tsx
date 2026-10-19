import { createBlog } from "@/app/actions/blogs";

export default function newBlog() {
  return (
    <div>
      <h3> Add new blog </h3>
        <form action={createBlog}>
          <label>
            Title <br/>
            <input type="text" name="title" id="title" />
          </label>
          <br/><br/>
          <label>
            Author <br/>
            <input type="text" name="author" id="author" />
          </label>
          <br/><br/>
          <label>
            URL <br/>
            <input type="text" name="url" id="url" />
          </label>
          <p>
            <button type="submit"> Create blog </button>
          </p>
        </form>
    </div>
  )
}