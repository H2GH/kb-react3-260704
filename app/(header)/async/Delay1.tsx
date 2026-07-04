import { delay } from '@/utils'

export default async function () {
  await delay(3000)
  return (
    <>
      <h1>Delay 1 (3초)!!</h1>
    </>
  )
}
