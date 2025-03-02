import Link from "next/link";
import HeaderLink from "./Header_Link";
import UserSVG from "../_assets/UserSVG";

export default function Header() {
  
  const NavLinks = [
    { href: "/about", text: "about" },
    { href: "/contact", text: "contact" },
    { href: "/posts", text: "posts" },
  ];

  const user = true
  const logout = async() => {
    "use server"
    console.log('logout')
  }
  return (
    <header className="flex justify-between items-center gap-20 bg-orange-700 p-4 px-8">
      
      <Link href={"/"} className="btn btn-ghost text-xl">k@to</Link>

        {user && (
          <div className="flex-1 flex justify-between items-center">

            <nav className="flex gap-8">
              {
                NavLinks.map((link, i) => (
                  <HeaderLink key={i} href={link.href} text={link.text} />
                ))
              }
            </nav>

            <form action={logout}>
              <button className='btn btn-primary cursor-pointer'><UserSVG /></button>
            </form>

          </div>
        )}

    </header>
  )
}
