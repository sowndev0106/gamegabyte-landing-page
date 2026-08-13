const SHEET = '/assets/img/portfolio/pixel-character-sprites.webp'
const COLUMNS = 4
const ROWS = 4

/**
 * Crops one character out of the 4×4 pixel-art sheet. Cheaper than shipping
 * sixteen separate files, and `pixelated` keeps the art crisp when scaled.
 */
export function PixelSprite({ index, className = '' }: { index: number; className?: string }) {
  const column = index % COLUMNS
  const row = Math.floor(index / COLUMNS)

  return (
    <span
      aria-hidden="true"
      className={`block shrink-0 bg-no-repeat ${className}`}
      style={{
        backgroundImage: `url(${SHEET})`,
        backgroundSize: `${COLUMNS * 100}% ${ROWS * 100}%`,
        backgroundPosition: `${(column / (COLUMNS - 1)) * 100}% ${(row / (ROWS - 1)) * 100}%`,
        imageRendering: 'pixelated',
      }}
    />
  )
}
