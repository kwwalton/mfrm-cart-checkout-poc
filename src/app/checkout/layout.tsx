interface ICheckoutLayoutProps {
  children: React.ReactNode
}
export default function CheckoutLayout({ children }: ICheckoutLayoutProps) {
  return (
    <div>
      <div className="container mx-auto">{children}</div>
    </div>
  )
}
