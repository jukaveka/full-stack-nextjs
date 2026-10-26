"use client"

import { createBlog } from "@/app/actions/blogs";
import { useNotification } from "@/app/components/NotificationProvider";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

const NewBlog = () => {
  const [state, formAction] = useActionState(createBlog, {
    errors: { title: "", author: "", url: "" },
    values: { title: "", author: "", url: "" },
    success: false
  })
  const { showNotification } = useNotification()
  const router = useRouter()

  useEffect(() => {
    if (state.success) {
      showNotification("Blog created successfully")
      router.push("/blogs")
    }
  }, [state, showNotification, router])

  return (
    <div className=" shadow m-auto w-2xl px-10 py-10 mt-10" >
      <h3 className="text-3xl font-bold pl-35 py-5"> Enter new blog </h3>

        <form action={formAction} className="px-35">

          <div className="block py-3">
            <label className="font-bold block mb-1">
              Title
              <input
                type="text"
                name="title"
                defaultValue={state.values?.title}
                className="shadow border px-1 py-1 text-gray-800 focus:outline-none focus:shadow-outline mr-2 w-75"
              />
             </label>
            {state.errors.title && <p className="text-red-500"> {state.errors.title} </p>}
          </div>

          <div className="block py-3">
            <label className="font-bold block mb-1">
              Author
              <input
                type="text"
                name="author"
                defaultValue={state.values?.author}
                className="shadow border px-1 py-1 text-gray-800 focus:outline-none focus:shadow-outline mr-2 w-75"
              />
            </label>
            {state.errors.author && <p style={{ color: "red" }}> {state.errors.author} </p>}
          </div>

          <div className="block py-3">
            <label className="font-bold block mb-1">
              URL
              <input
                type="text"
                name="url"
                defaultValue={state.values?.url}
                className="shadow border px-1 py-1 text-gray-800 focus:outline-none focus:shadow-outline mr-2 w-75"
              />
            </label>
            {state.errors.url && <p style={{ color: "red" }}> {state.errors.url} </p>}
          </div>

          <div className="block py-3">
            <button
              type="submit"
              data-testid="create-blog-button"
              className="bg-slate-700 px-5 py-3 text-white rounded font-bold"
            >
              Create blog
            </button>
          </div>

        </form>
    </div>
  )
}

export default NewBlog
