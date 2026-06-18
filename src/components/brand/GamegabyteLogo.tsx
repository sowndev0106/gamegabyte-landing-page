type GamegabyteLogoProps = {
  className?: string
}

export function GamegabyteLogo({ className = '' }: GamegabyteLogoProps) {
  return (
    <span className={`block text-white ${className}`} aria-label="Gamegabyte">
      <span className="block font-display text-[30px] font-black uppercase leading-[0.78] tracking-[-0.06em] sm:text-[42px]">
        GAME
      </span>
      <span className="mt-1 block font-display text-[12px] font-black uppercase leading-none tracking-[0.48em] sm:text-[16px]">
        GABYTE
      </span>
    </span>
  )
}
