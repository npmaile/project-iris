import { useEffect, useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import useInterval from '@/hooks/useInterval'
import axios from 'axios'

export type ChangerProps = {
  wordsPerCell: number
  wpm: number
}

const MILISECONDS_IN_A_MINUTE = 60000

async function fetchWords(number: number){
  try {
    if (number > 500) {
      //random words api won't return more than 500 words at a time so here's a hacky workaround
      const holder: string[] = []
      for (let i = 0; i < number / 500 + 1; i++) {
        const response = await axios.get(
          `https://random-word-api.vercel.app/api?words=500`,
        )
        holder.push(...(response.data as string[]))
      }
      return holder.slice(0, number)
    } else {
      const response = await axios.get(
        `https://random-word-api.vercel.app/api?words=${number}`,
      )
      return response.data as string[]
    }
  } catch (error) {
    console.log("Here's the error: ", error)
    return ['error']
  }
}

function formatWords(words: string[], wordsPerCell: number){
  const wordJoiner: string[] = []
  for (let i = 0; i < words.length / wordsPerCell; i += wordsPerCell) {
    wordJoiner.push(words.slice(i, i + wordsPerCell).join(' '))
  }
  return wordJoiner
}

async function fetch(props: ChangerProps){
  const words = await fetchWords(props.wordsPerCell * props.wpm)
  const formattedWords = formatWords(words, props.wordsPerCell)
  return formattedWords
}

export default function Changer(props: ChangerProps) {
  const [words, setWords] = useState<string[]>([])
  const [wordIndex, setWordIndex] = useState<number>(0)
  const [fetched, setFetched] = useState<boolean>(false)
  const [current, setCurrent] = useState<string>('')

  useEffect(() => {
    const load = async () => {
      try {
        const words = await fetch(props)
        setWords(words)
        setFetched(true)
      } catch (error) {
        console.log("Here's the error: ", error)
      }
    }
    load().catch((error) => console.log("Here's the error: ", error))
  }, [])

  useInterval(() => {
    if (fetched) {
      setCurrent(words[wordIndex] as string)
      setWordIndex((prev) => prev + 1)
    }
  }, MILISECONDS_IN_A_MINUTE / props.wpm)

  return <>{current}</>
}
