import Link from "next/link"

const NavLink = ({ href, children}: { href: string, children: React.ReactNode }) => {
  return (
    <Link href={href} className="hover:text-slate-200">
      {children}
    </Link>
  )
}

export default NavLink
