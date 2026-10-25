"use client"

import { signOut, useSession } from "next-auth/react"
import NavLink from "./NavLink"

const NavBar = () => {
  const { data: session } = useSession()

  return (
    <div>
      <nav className="bg-slate-700 text-white px-5 py-5 flex items-center w-full justify-between">
        <div className="flex justify-start-safe gap-10 w-3xl">
          <NavLink href="/"> home </NavLink>
          <NavLink href="/blogs"> blogs </NavLink>
          <NavLink href="/users"> users </NavLink>
          { session ? (
            <>
              <NavLink href="/blogs/new"> new blog </NavLink>
            </>
           ) : (
            null
          )}
        </div>
        <div className="flex gap-10 justify-end-safe w-3xl items-center">
          { session ? (
            <>
              <NavLink href="/me"> me </NavLink>
              <button onClick={() => signOut()} className="bg-slate-600 px-5 py-3 rounded text-sm hover:bg-slate-500">logout</button>
            </>
          ) : (
            <>
              <NavLink href="/login">login</NavLink>
              <NavLink href="/register">register</NavLink>
            </>
          )}
        </div>
      </nav>
    </div>
  )
}

export default NavBar
