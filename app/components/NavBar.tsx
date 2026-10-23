"use client"

import { signOut, useSession } from "next-auth/react"
import NavLink from "./NavLink"

const NavBar = () => {
  const { data: session } = useSession()

  return (
    <div>
      <nav className="bg-slate-700 text-white px-5 py-5 flex items-center gap-10">
        <NavLink href="/"> home </NavLink>
        <NavLink href="/blogs"> blogs </NavLink>
        <NavLink href="/users"> users </NavLink>
        { session ? (
          <>
            <NavLink href="/blogs/new"> new blog </NavLink>
            <em className="text-slate-300">{ session.user?.name } logged in</em>
            <button onClick={() => signOut()} className="bg-slate-600 px-5 py-3 rounded text-sm hover:bg-slate-500">logout</button>
          </>
        ) : (
          <>
            <NavLink href="/login">login</NavLink>
            <NavLink href="/register">register</NavLink>
          </>
        )}
      </nav>
    </div>
  )
}

export default NavBar
