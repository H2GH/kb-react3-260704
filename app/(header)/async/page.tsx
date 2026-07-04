import { delay } from '@/utils'
import Delay1 from './Delay1'
import Delay2 from './Delay2'
import { Suspense } from 'react'

export default async function () {
  await delay(1000)
  return (
    <>
      <h1>Async Page!!</h1>
      <Suspense fallback={<h2>Loading Deley1...</h2>}>
        <Delay1 />
      </Suspense>
      <Suspense fallback={<h2>Loading Deley2...</h2>}>
        <Delay2 />
      </Suspense>
    </>
  )
}
