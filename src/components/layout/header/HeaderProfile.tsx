import { cn } from '@/utils/cn';
import { ProfileMenu } from './ProfileMenu';
import { User as LucideUser } from 'lucide-react';
import { Auth } from './Auth';
import { useSession } from '@/lib/auth-client'
import { useHeaderModals } from './useHeaderModals'

export function HeaderProfile( ) {
  const { data } = useSession();

  const {
    isOpen,
    isProfileMenuOpen,
    profileMenuRef,
    ref,
    setIsOpen,
    setProfileMenuOpen,
  } = useHeaderModals({
    isLoggenIn: !!data?.user,
  });

  return (
    <>
      {data?.user ? (
        <div className="relative" ref={profileMenuRef}>
          <button
            onClick={() => {
              setProfileMenuOpen(!isProfileMenuOpen);
            }}
            className={cn('flex flex-col items-center')}
          >
            <LucideUser size={20} />

            <span className="text-sm font-medium">
              {data.user.name || data.user.email}
            </span>
          </button>

          {isProfileMenuOpen && (
            <ProfileMenu setIsProfileMenuOpen={setProfileMenuOpen} />
          )}
        </div>
      ) : (
        <button
          className={cn('flex flex-col items-center')}
          onClick={() => setIsOpen(true)}
        >
          <LucideUser size={20} />
          <span className="text-sm font-medium">Войти</span>
        </button>
      )}
      {isOpen && <Auth setIsOpen={setIsOpen} ref={ref} />}
    </>
  );
}
