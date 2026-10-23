"use client"

import { createBlog } from "@/app/actions/blogs";
import { useActionState } from "react";

const NewBlog = () => {
  const [state, formAction] = useActionState(createBlog, {
    errors: { title: "", author: "", url: "" },
    values: { title: "", author: "", url: "" }
  })

  return (
    <div>
      <h3> Add new blog </h3>

        <form action={formAction}>

          <label>
            Title <br/>
            <input type="text" name="title" id="title" defaultValue={state.values?.title} />
            {state.errors.title && <p style={{ color: "red" }}> {state.errors.title} </p>}
          </label>

          <br/><br/>

          <label>
            Author <br/>
            <input type="text" name="author" id="author" defaultValue={state.values?.author} />
            {state.errors.author && <p style={{ color: "red" }}> {state.errors.author} </p>}
          </label>

          <br/><br/>

          <label>
            URL <br/>
            <input type="text" name="url" id="url" defaultValue={state.values?.url} />
            {state.errors.url && <p style={{ color: "red" }}> {state.errors.url} </p>}
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
