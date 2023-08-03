import { useRef, useEffect, useState } from 'react'
import useInterval from './useInterval'
import { Url } from 'next/dist/shared/lib/router/router'
import { useRouter } from 'next/router'

function useSwitcher<T>(
  initialValue: T,
  endValue: T,
  duration: number,
  cleanup?: () => void,
  cleanupDelay?: number,
  next?: string | Url,
) {
  const [value, setValue] = useState<T>(initialValue)
  const router = useRouter()

  useEffect(() => {
    const timeout = setTimeout(() => {
      setValue(endValue)
      if (cleanup) {
        setTimeout(() => {
          cleanup()
          if (next) {
            router.replace(next).catch((err) => console.log(err))
          }
        }, cleanupDelay ?? 500)
      }
    }, duration)

    return () => clearTimeout(timeout)
  }, [initialValue, endValue, duration])

  return value
}

function useArraySitcher<T>(
  vlaues: T[],
  duration: number,
  continuous: boolean,
) {
  const index = useRef<number>(0)
  const [value, setValue] = useState<T>(vlaues[index.current]!)
  useInterval(() => {
    if (index.current < vlaues.length - 1) {
      index.current++
    } else if (continuous) {
      index.current = 0
    }
    setValue(vlaues[index.current]!)
  }, duration)
  return value
}

function useConditionalSwitcher<T>(
  startValue: T,
  endValue: T,
  condition: unknown[],
) {
  const [value, setValue] = useState<T>(startValue)
  useEffect(() => {
    if (value === startValue) {
      setValue(endValue)
    } else {
      setValue(startValue)
    }
  }, condition)
  return value
}

function useConditionalArraySwitcher<T>(values: T[], condition: unknown[]) {
  const index = useRef<number>(0)
  const [value, setValue] = useState<T>(values[index.current]!)
  const passedValues = useState<T[]>(values)[0]
  useEffect(() => {
    if (index.current < values.length - 1) {
      index.current++
    } else {
      index.current = 0
    }
    setValue(passedValues?.[index.current] as T)
  }, condition)
  return value
}

function useSwitcherFunction<T>(startValue: T, endValue: T) {
  const [value, setValue] = useState<T>(startValue)
  const switcher = () => {
    if (value === startValue) {
      setValue(endValue)
    } else {
      setValue(startValue)
    }
  }
  return { current: value, switch: switcher }
}

export {
  useSwitcher,
  useArraySitcher,
  useConditionalSwitcher,
  useConditionalArraySwitcher,
  useSwitcherFunction,
}
