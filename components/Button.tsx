import type { ButtonHTMLAttributes, ReactNode, RefObject } from 'react'
import Loader from '@/components/Loader'
// import Ripple from '@/components/Ripple'

type Variant = 'filled' | 'tonal' | 'outlined' | 'text'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  ref?:
    | RefObject<HTMLButtonElement>
    | ((element: Element | null | undefined) => (() => void) | undefined)
    | undefined
  loading?: boolean
  children?: ReactNode
  onClick?: () => void
  variant?: Variant
  fullWidth?: boolean
}

const VARIANTS: Record<Variant, string> = {
  filled: 'bg-kb-yellow text-kb-black hover:bg-kb-yellow-strong md-elev-1',
  tonal: 'bg-kb-yellow-soft text-kb-black hover:brightness-[0.97]',
  outlined: 'border border-md-outline text-ink hover:bg-black/[0.03]',
  text: 'text-ink hover:bg-black/[0.04]'
}

/** 머터리얼 버튼 — 알약형, 리플 포함. 노랑 위 텍스트는 검정(KB 규칙). */
export default function Button({
  loading,
  children,
  variant = 'filled',
  fullWidth = false,
  className = '',
  ...restProps
}: Props) {
  const dark = variant === 'filled' || variant === 'tonal'
  return (
    <button
      {...restProps}
      className={`focus-visible:outline-kb-yellow relative inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-full px-6 text-[15px] font-semibold transition outline-none focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 ${VARIANTS[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}>
      {loading ? (
        <Loader
          size={20}
          weight={2.5}
          color={dark ? 'var(--color-kb-black)' : 'var(--color-ink)'}
        />
      ) : (
        children
      )}
      {/* <Ripple /> */}
    </button>
  )
}
