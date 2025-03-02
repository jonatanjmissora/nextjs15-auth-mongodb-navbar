import Link from "next/link";
import HeaderLink from "./Header_Link";
import UserSVG from "../_assets/UserSVG";
import getUserFromCookie from "../_lib/utils/getUserFromCookies";
import { logout } from "../_actions/user.action";

export default async function Header() {
  
  const NavLinks = [
    { href: "/link_1", text: "link1" },
    { href: "/lin_2", text: "link2" },
    { href: "/link_3", text: "link3" },
  ];

  const user = await getUserFromCookie()
  
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
              <button className='cursor-pointer'><UserSVG /></button>
            </form>

            <span>{user?.username}</span>

          </div>
        )}

    </header>
  )
}
