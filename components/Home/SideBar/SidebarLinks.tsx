import Link from 'next/link'
import { useSelector } from 'react-redux'
import { RootState } from '@/utils/Redux/Store/Store'
import { User2 } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { links } from '@/utils/LinkArray'
const SideBarLinks = ({ closeSidebar }: { closeSidebar: () => void }) => {
  const User = useSelector((state: RootState) => state.user) // Get the user from the state
  const pathname = usePathname()
  // Function to determine if a link is active
  const isActive = (path: string) => pathname === path
  return (
    <>
      {links.map(
        (link, index) =>
          // Show link if it's either adminOnly: false or the user's email matches the required email for admin-only links
          (!link.adminOnly || User.Email === link.email) && (
            <Link
              key={index}
              href={link.href}
              onClick={closeSidebar}
              className={`gap-3 w-full flex items-center ${
                isActive(link.href)
                  ? 'bg-white text-[#5925da] rounded-lg px-2'
                  : 'text-white'
              } hover:bg-white hover:text-[#5925da] hover:rounded-lg hover:px-2`}
            >
              <link.icon size={18} />
              <h5 className=" text-[11px]">{link.label}</h5>
            </Link>
          )
      )}
      <Link
        href="/Profile"
        className="text-white gap-3 flex w-full items-center hover:bg-white hover:text-[#5925da] hover:rounded-lg hover:px-2"
      >
        <User2 size={18} />
        <h5 className=" text-[11px]">Profile</h5>
      </Link>
    </>
  )
}
export default SideBarLinks
