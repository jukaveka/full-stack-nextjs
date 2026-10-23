"use client"

import { createBlog } from "@/app/actions/blogs";
import { useActionState } from "react";

const NewBlog = () => {
  const [state, formAction] = useActionState(createBlog, { errors: { title: "", author: "", url: ""} })

  return (
    <div>
      <h3> Add new blog </h3>

        <form action={formAction}>

          <label>
            Title
            {state.errors.title && <p style={{ color: "red" }}> {state.errors.title} </p>}<br/>
            <input type="text" name="title" id="title" />
          </label>

          <br/><br/>

          <label>
            Author
            {state.errors.author && <p style={{ color: "red" }}> {state.errors.author} </p>}<br/>
            <input type="text" name="author" id="author" />
          </label>

          <br/><br/>

          <label>
            URL <br/>
            {state.errors.url && <p style={{ color: "red" }}> {state.errors.url} </p>}
            <input type="text" name="url" id="url" />
          </label>

          <br/>

          <p>
            <button type="submit"> Create blog </button>
          </p>

        </form>
    </div>
  )
}

export default NewBlog
