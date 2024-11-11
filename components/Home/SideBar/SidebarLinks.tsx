import Link from 'next/link'
import { useSelector } from 'react-redux'
import { RootState } from '@/utils/Redux/Store/Store'
import { links } from '@/utils/LinkArray'
import { User2 } from 'lucide-react'

const SideBarLinks = () => {
  const User = useSelector((state: RootState) => state.user)

  return (
    <>
      {links.map((link, index) =>
        // Only show links for the admin user
        User.Email === 'octtoppus1@gmail.com' ? (
          <Link
            key={index}
            href={link.href}
            className="text-white gap-3 w-full flex items-center hover:bg-white hover:text-[#5925da] hover:rounded-lg hover:px-2"
          >
            {/* Render icon as a React component */}
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
