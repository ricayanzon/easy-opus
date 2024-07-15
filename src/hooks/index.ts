import { RefObject, useEffect } from 'react'

export const useClickOutside = (
  ref: RefObject<HTMLElement | undefined>,
  callback: () => void
) => {
  const handleClick = (event: MouseEvent) => {
    if (ref.current === event.target) {
      callback()
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  })
}