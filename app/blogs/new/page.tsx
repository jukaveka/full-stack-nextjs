"use client"

import { createBlog } from "@/app/actions/blogs";
import { useActionState } from "react";

const NewBlog = () => {
  const [state, formAction] = useActionState(createBlog, { error: "" })

  return (
    <div>
      <h3> Add new blog </h3>

        {state.error && <p style={{ color: "red" }}> {state.error} </p>}

        <form action={formAction}>

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

          <br/><br/>

          <p>
            <button type="submit"> Create blog </button>
          </p>

        </form>
    </div>
  )
}

export default NewBlog
