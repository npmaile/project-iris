//this page literally exists exclusively to give the database enough time to update between excercises LOL
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Butterfly from 'public/flying-butterfly.gif'
import { useEffect, useState } from 'react'
import { document } from 'postcss'
import LoadingSpinner from '~/componants/loadingspinner'

const Page: NextPage = () => {
  const router = useRouter()
  const empty = <LoadingSpinner />
  const [button, setButton] = useState(empty)
  const startButton = (
    <button
      name='start'
      className='text-white md:text-5xl text-4xl bg-white/10 flex items-center justify-center rounded-full md:w-40 w-60 p-4 h-16 hover:bg-white/20'
      onClick={() => {
        router.replace('/loadnext').catch((err) => console.error(err))
      }}
    >
      Start
    </button>
  )
  useEffect(() => {
    setTimeout(() => {
      setButton(startButton)
    }, 1500)
  }, [])
  return (
    <>
      <Head>Next Excercise</Head>
      <main className='flex grid-cols-1 justify-center items-center min-h-screen mt-8'>
        <div className='grid justify-center items-center'>
          <div className='flex justify-center items-center'>
            <Image
              src={Butterfly}
              alt='Butterfly'
              style={{ width: '24rem', height: '16rem' }}
            />
          </div>
          <p className='md:text-5xl text-4xl text-center text-white font-bold'>
            Click for your next exercise!
          </p>
          <div className='flex items-center justify-center p-12'>{button}</div>
        </div>
      </main>
    </>
  )
}
export default Page
