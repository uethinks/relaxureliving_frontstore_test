export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      className="w-full relative flex justify-center"
      data-testid="checkout-container"
    >
      {children}
    </div>
  )
}
