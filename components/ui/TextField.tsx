import type { InputHTMLAttributes, ReactNode } from 'react'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  /** 입력창 앞의 아이콘 (검색 등) */
  leading?: ReactNode
  wrapClassName?: string
}

/**
 * 머터리얼 filled 텍스트필드 — 채워진 표면 + 포커스 시 가운데서 펼쳐지는 노랑 밑줄.
 * Todos 입력창과 동일한 시각 언어를 공유한다.
 */
export default function TextField({
  leading,
  className = '',
  wrapClassName = '',
  ...rest
}: TextFieldProps) {
  return (
    <div className={`relative w-full ${wrapClassName}`}>
      {leading && (
        <span className="text-ink-3 pointer-events-none absolute inset-y-0 left-4 grid place-items-center">
          {leading}
        </span>
      )}
      <input
        {...rest}
        className={`peer bg-md-field text-ink placeholder:text-ink-4 h-14 w-full rounded-t-xl text-[15px] outline-none ${leading ? 'pr-4 pl-11' : 'px-4'} ${className}`}
      />
      <span className="bg-md-outline pointer-events-none absolute inset-x-0 bottom-0 h-[1.5px]" />
      <span className="bg-kb-yellow pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-center scale-x-0 transition-transform duration-200 peer-focus:scale-x-100" />
    </div>
  )
}
