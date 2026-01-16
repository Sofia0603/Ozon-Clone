import { useOutsideClick } from '@/hooks/useOutsideClick'
import { useEffect } from 'react'

export function useHeaderModals({isLoggenIn} : {isLoggenIn? : boolean}) {

  const { isOpen, ref, setIsOpen } = useOutsideClick<HTMLDivElement>(false);

  const {
    isOpen: isProfileMenuOpen,
    ref: profileMenuRef,
    setIsOpen: setProfileMenuOpen,
  } = useOutsideClick<HTMLDivElement>(false);

  useEffect(() => {
    if (isLoggenIn) {
      setIsOpen(false);
    }
  }, [isLoggenIn, setIsOpen]);

	return {
		isOpen,
		ref,
		setIsOpen,
		isProfileMenuOpen,
		profileMenuRef,
		setProfileMenuOpen
	}
}
