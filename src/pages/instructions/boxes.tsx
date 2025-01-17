import { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import LoadingSpinner from '~/components/loadingspinner'
import { useUserStore } from '~/stores/userStore'
import type { Font, User } from '~/utils/types'
import { type SingletonRouter, useRouter } from "next/router";
import { FontProvider } from "~/cva/fontProvider";
import Sidebar from '~/components/sidebar'
import { navigate } from '~/utils/helpers'

const INSTRUCTION_DELAY = 5_000

function Paragraph1({ user }: { user: User | undefined }) {
  if (!user) return <LoadingSpinner />
  if (user.language === 'english') return (
    <div className='gap-2 bg-white text-2xl p-12 rounded-lg shadow-md md:h-3/5 h-96 md:w-2/5 w-4/5 items-center md:overflow-y-auto overflow-y-auto'>
      <p>
        As each box appears on the screen move your eyes to the center of the
        box. Do not actively attempt to read the words at the corners of the
        box. This exercise is meant to help improve your parifpheral vision. In
        order to get the most out of this exercise, try to stay relaxed and
        focused. The exercise will only be counted as completed if you do not
        navigate away from the page. The page will automatically navigate away
        and be counted as complete after one minute.
      </p>
    </div>
  )
  // all of the following are grabbed from google translate and may not be accurate
  // if you speak any of these languages and can correct them, please do so.
  // TODO get proper translations
  if (user.language === 'spanish') return (
    <div className='gap-2 bg-white text-2xl p-12 rounded-lg shadow-md md:h-3/5 h-96 md:w-2/5 w-4/5 items-center md:overflow-y-auto overflow-y-auto'>
      <p>
        A medida que aparece cada cuadro en la pantalla, mueva los ojos hacia el centro del cuadro.
        caja. No intente activamente leer las palabras en las esquinas del
        caja. Este ejercicio está destinado a ayudar a mejorar su visión periférica. En
        Para aprovechar al máximo este ejercicio, trate de mantenerse relajado y
        enfocado. El ejercicio sólo se contará como completado si no
        navegar fuera de la página. La página se alejará automáticamente
        y se considerará completo después de un minuto.
      </p>
    </div>
  )
  if (user.language === 'italian') return (
    <div className='gap-2 bg-white text-2xl p-12 rounded-lg shadow-md md:h-3/5 h-96 md:w-2/5 w-4/5 items-center md:overflow-y-auto overflow-y-auto'>
      <p>
        Quando ogni riquadro appare sullo schermo, sposta gli occhi al centro del riquadro
        scatola. Non tentare attivamente di leggere le parole agli angoli del
        scatola. Questo esercizio ha lo scopo di aiutarti a migliorare la tua visione periferica. In
        Per ottenere il massimo da questo esercizio, cerca di rimanere rilassato e
        focalizzata. L&apos;esercizio verrà conteggiato come completato solo se non lo fai
        allontanarsi dalla pagina. La pagina verrà automaticamente allontanata
        e verrà conteggiato come completato dopo un minuto.
      </p>
    </div>
  )
  if (user.language === 'german') return (
    <div className='gap-2 bg-white text-2xl p-12 rounded-lg shadow-md md:h-3/5 h-96 md:w-2/5 w-4/5 items-center md:overflow-y-auto overflow-y-auto'>
      <p>
        Wenn jedes Kästchen auf dem Bildschirm erscheint, bewegen Sie Ihren Blick in die Mitte des Kästchens
        Kasten. Versuchen Sie nicht aktiv, die Wörter an den Ecken des zu lesen
        Kasten. Diese Übung soll dazu beitragen, Ihr peripheres Sehvermögen zu verbessern. In
        Um das Beste aus dieser Übung herauszuholen, versuchen Sie, entspannt zu bleiben
        konzentriert. Nur wenn Sie dies nicht tun, gilt die Übung als abgeschlossen
        Navigieren Sie von der Seite weg. Die Seite navigiert automatisch weg
        und gelten nach einer Minute als abgeschlossen.
      </p>
    </div>
  )
}

type BlockType = 'two' | 'three'

function typeToUrl(type: BlockType) {
  switch (type) {
    case 'two': return '/exercises/boxes?type=2'
    case 'three': return '/exercises/boxes?type=3'
    default: return '/exercises/boxes?type=2'
  }

}

function StartButton() {
  const [time, setTime] = useState(false)
  const router = useRouter()
  const params = router.query
  const type = params.type

  useEffect(() => {
    setTimeout(() => setTime(true), INSTRUCTION_DELAY)
  }, [])

  return time ? (
    <button
      className='text-white md:text-5xl text-4xl bg-white/10 flex items-center justify-center rounded-full md:w-40 w-60 p-4 h-16 hover:bg-white/20'
      onClick={() => navigate(router as SingletonRouter, typeToUrl(type as BlockType))}
    >
      Start
    </button>
  ) : (
    <LoadingSpinner />
  )
}

const Page: NextPage = () => {
  const userStore = useUserStore()
  const [font, setFont] = useState<Font>('sans')
  useEffect(() => {
    if (!userStore.user) return
    setFont(userStore.user.font)
  })

  return (
    <>
      <Head>Even Number Exercise Instructions</Head>
      <Sidebar />
      <FontProvider font={font}>
        <div className='flex flex-col items-center justify-center min-h-screen py-10 gap-4'>
          <Paragraph1 user={userStore.user} />
          <StartButton />
        </div>
      </FontProvider>
    </>
  )
}

export default Page
