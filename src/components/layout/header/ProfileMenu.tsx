import { signOut } from '@/lib/auth-client'
import Link from 'next/link';


interface Props {
  setIsProfileMenuOpen: (isOpen: boolean) => void
}

export function ProfileMenu({setIsProfileMenuOpen}: Props) {
  const handleLogOut = () => {
   signOut();
   setIsProfileMenuOpen(false)
  };

  return (
    <div className='fadeIn absolute top-full right-0 mt-2 bg-white flex flex-col gap-1 items-start rounded-md shadow-2xl space-y-3 p-4 z-10'
    
    >
      <Link href="/profile" className='transition-colors hover:text-primary'>Профиль</Link>
      <Link href="/admin" className='transition-colors hover:text-primary'>Админка</Link>
      <button className='transition-colors hover:text-primary' onClick={handleLogOut}>Выйти</button>
    </div>
  );
}
