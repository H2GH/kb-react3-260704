export function delay(ms = 1000) {
  return new Promise((resolve, reject) => {
    if (ms >= 10000) {
      return reject(new Error('10초 미만으로 설정 해주세요.'))
    }
    setTimeout(() => {
      resolve(true)
    }, ms)
  })
}

export function loadImage(src: string) {
  return new Promise((resolve, reject) => {
    const imgEl = document.createElement('img')
    imgEl.addEventListener('load', () => {
      resolve(true)
    })
    imgEl.addEventListener('error', () => {
      reject(new Error('이미지 로딩에 실패했습니다.'))
    })
    imgEl.src = src
  })
}
