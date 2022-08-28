import { useState, useEffect } from 'react'

export const useValueAfter = (arr= [], delay = 1000, startIndex = 0) => {
  const [index, setIndex] = useState(startIndex)

  useEffect(() => {
    const timerId = setTimeout(() => {
      setIndex((index + 1) % arr.length)
    }, delay)
    return () => clearInterval(timerId)
  }, [index])

  return arr[index]
}