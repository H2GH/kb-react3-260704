import { NextResponse } from 'next/server'

// 어느 페이지를 접근하던지 proxy를 거쳐서 가게 됨
// middleware 에서 proxy로 바뀌었음
export default function proxy() {
  console.log('영화 페이지 접근!')
  return NextResponse.next() // 통과
}

// config 변수명은 바꾸면 안됨
export const config = {
  matcher: ['/movies/:path*']
}
