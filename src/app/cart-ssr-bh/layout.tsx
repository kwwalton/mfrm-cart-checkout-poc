interface ICartLayoutProps {
  children: React.ReactNode
}

export default function CartLayout({ children }: ICartLayoutProps) {
  return (
    <div>
      <div className="container mx-auto">{children}</div>
    </div>
  )
}
