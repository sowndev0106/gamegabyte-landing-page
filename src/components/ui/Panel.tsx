import type { ReactNode } from 'react'

/**
 * The page's one surface recipe: a hairline border on a barely-lifted ground.
 * Twelve sections styled in utilities would otherwise each invent their own
 * near-identical panel and drift apart.
 */
export function Panel({
  children,
  className = '',
  as: Tag = 'div',
  ...rest
}: {
  children: ReactNode
  className?: string
  /** Use a landmark element where the panel is a region in its own right. */
  as?: 'div' | 'aside' | 'article'
  'aria-label'?: string
}) {
  return (
    <Tag className={`border border-white/11 bg-white/1.5 ${className}`} {...rest}>
      {children}
    </Tag>
  )
}
