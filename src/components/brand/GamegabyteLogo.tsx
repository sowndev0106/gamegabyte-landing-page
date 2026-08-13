import logoUrl from '../../assets/logo.svg'

type GamegabyteLogoProps = {
  className?: string
}

export function GamegabyteLogo({ className = '' }: GamegabyteLogoProps) {
  return (
    <img
      src={logoUrl}
      className={`h-8 w-auto ${className}`}
      alt="Gamegabyte Logo"
    />
  )
}
