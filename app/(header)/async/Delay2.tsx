import { delay } from '@/utils'

export default async function () {
  await delay(2000)
  return (
    <>
      <h1>Delay 2 (2초)!!</h1>
    </>
  )
}
