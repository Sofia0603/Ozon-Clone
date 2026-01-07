'use client';
import { useEffect, useState, useRef } from 'react';

export function useOutsideClick<T extends HTMLElement = HTMLElement>(initialState = false) {
  const ref = useRef<T>(null);
  const [isOpen, setIsOpen] = useState(initialState);

  const handleClick = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick, true);

		return () => {
			document.addEventListener('click', handleClick, true)
		}
  }, []);

  return { ref, isOpen, setIsOpen };
}
