import Link from "next/link"
import { ArrowLeft, Check, ChevronRight, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function CheckoutPage() {
  const subtotal = 29.97
  const deliveryFee = 2.99
  const serviceFee = 1.99
  const total = subtotal + deliveryFee + serviceFee

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 bg-white border-b">
        <div className="container flex items-center justify-between p-4">
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-bold">Checkout</h1>
          <div className="w-10"></div> {/* Spacer for alignment */}
        </div>
      </header>

      <main className="flex-1 container p-4">
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-medium">Delivery Address</h2>
              <Link href="/addresses">
                <Button variant="ghost" size="sm" className="h-8 text-red-500">
                  Change
                  <ChevronRight className="ml-1 w-4 h-4" />
                </Button>
              </Link>
            </div>
            <div className="text-sm">
              <p className="font-medium">Home</p>
              <p className="text-gray-500">123 Main St, Apt 4B</p>
              <p className="text-gray-500">New York, NY 10001</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-medium">Payment Method</h2>
              <Link href="/payment-methods">
                <Button variant="ghost" size="sm" className="h-8 text-red-500">
                  Change
                  <ChevronRight className="ml-1 w-4 h-4" />
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-sm">
                <p className="font-medium">Visa •••• 4242</p>
                <p className="text-gray-500">Expires 12/25</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="font-medium mb-3">Delivery Options</h2>
            <RadioGroup defaultValue="standard" className="space-y-3">
              <div className="flex items-center space-x-2 border rounded-lg p-3">
                <RadioGroupItem value="standard" id="standard" />
                <Label htmlFor="standard" className="flex-1">
                  <div className="font-medium">Standard Delivery</div>
                  <div className="text-sm text-gray-500">25-35 min • $2.99</div>
                </Label>
                <Check className="w-4 h-4 text-green-500" />
              </div>
              <div className="flex items-center space-x-2 border rounded-lg p-3">
                <RadioGroupItem value="express" id="express" />
                <Label htmlFor="express" className="flex-1">
                  <div className="font-medium">Express Delivery</div>
                  <div className="text-sm text-gray-500">15-25 min • $4.99</div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="font-medium mb-3">Add Note</h2>
            <Textarea placeholder="Special instructions for delivery or food preparation..." className="resize-none" />
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="font-medium mb-3">Order Summary</h2>
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

          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="font-medium mb-3">Promo Code</h2>
            <div className="flex gap-2">
              <Input placeholder="Enter promo code" className="flex-1" />
              <Button variant="outline">Apply</Button>
            </div>
          </div>
        </div>
      </main>

      <div className="sticky bottom-0 z-10 bg-white border-t p-4">
        <Button className="w-full bg-red-500 hover:bg-red-600">Place Order • ${total.toFixed(2)}</Button>
      </div>
    </div>
  )
}

