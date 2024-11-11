import Link from 'next/link'
import { useSelector } from 'react-redux'
import { RootState } from '@/utils/Redux/Store/Store'
import { links } from '@/utils/LinkArray'
import { User2 } from 'lucide-react'
import { usePathname } from 'next/navigation'

const SideBarLinks = ({ closeSidebar }: { closeSidebar: () => void }) => {
  const User = useSelector((state: RootState) => state.user) // Get the user from the state
  const pathname = usePathname()
  // Function to determine if a link is active
  const isActive = (path: string) => pathname === path
  return (
    <>
      {links.map((link, index) =>
        User.Email === 'octtoppus1@gmail.com' ? (
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
            <h5>{link.label}</h5>
          </Link>
        ) : null
      )}

      {/* Profile link, always visible */}
      <Link
        href="/Profile"
        className="text-white gap-3 flex w-full items-center hover:bg-white hover:text-[#5925da] hover:rounded-lg hover:px-2"
      >
        <User2 size={18} />
        <h5>Profile</h5>
      </Link>
    </>
  )
}
export default SideBarLinks
