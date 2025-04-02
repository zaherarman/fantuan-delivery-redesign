import Link from "next/link"
import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function CartPage() {
  const cartItems = [
    {
      id: 1,
      name: "Kung Pao Chicken",
      price: 15.99,
      quantity: 1,
      restaurant: "Golden Dragon",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      name: "Vegetable Spring Rolls",
      price: 6.99,
      quantity: 2,
      restaurant: "Golden Dragon",
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryFee = 2.99
  const serviceFee = 1.99
  const total = subtotal + deliveryFee + serviceFee

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 bg-white border-b">
        <div className="container flex items-center justify-between p-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-bold">Your Cart</h1>
          <div className="w-10"></div> {/* Spacer for alignment */}
        </div>
      </header>

      <main className="flex-1 container p-4">
        {cartItems.length > 0 ? (
          <>
            <div className="mb-4">
              <h2 className="text-lg font-bold">Golden Dragon</h2>
              <p className="text-sm text-gray-500">Estimated delivery: 25-35 min</p>
            </div>

            <div className="bg-white rounded-lg shadow p-4 mb-4">
              {cartItems.map((item, index) => (
                <div key={item.id}>
                  <div className="flex gap-3 py-3">
                    <div className="w-16 h-16 overflow-hidden rounded-lg">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="icon" className="w-7 h-7 rounded-full">
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="text-sm">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="w-7 h-7 rounded-full bg-red-500 text-white border-red-500 hover:bg-red-600 hover:text-white"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="w-7 h-7 rounded-full text-gray-400 hover:text-red-500"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {index < cartItems.length - 1 && <Separator />}
                </div>
              ))}
            </div>

            <div className="bg-white rounded-lg shadow p-4 mb-4">
              <h3 className="font-medium mb-3">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Service Fee</span>
                  <span>${serviceFee.toFixed(2)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4 mb-4">
              <h3 className="font-medium mb-3">Delivery Details</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-4 h-4 text-red-500"
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Delivery Address</p>
                      <p className="text-xs text-gray-500">123 Main St, Apt 4B</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-red-500 h-8">
                    Change
                  </Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-4 h-4 text-red-500"
                      >
                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Payment Method</p>
                      <p className="text-xs text-gray-500">Visa •••• 4242</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-red-500 h-8">
                    Change
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-12 h-12 text-gray-400"
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>
            <h2 className="text-xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-gray-500 text-center mb-6">Browse restaurants and add items to your cart</p>
            <Link href="/">
              <Button className="bg-red-500 hover:bg-red-600">Browse Restaurants</Button>
            </Link>
          </div>
        )}
      </main>

      {cartItems.length > 0 && (
        <div className="sticky bottom-0 z-10 bg-white border-t p-4">
          <Link href="/checkout">
            <Button className="w-full bg-red-500 hover:bg-red-600">Proceed to Checkout • ${total.toFixed(2)}</Button>
          </Link>
        </div>
      )}
    </div>
  )
}

