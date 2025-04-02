import Link from "next/link"
import { ArrowLeft, Heart, Clock, Star, Plus, Minus, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function RestaurantPage({ params }: { params: { id: string } }) {
  // In a real app, we would fetch the restaurant data based on the ID
  const restaurant = {
    id: Number.parseInt(params.id),
    name: "Golden Dragon",
    cuisine: "Chinese",
    rating: 4.8,
    deliveryTime: 25,
    deliveryFee: 2.99,
    promotion: "20% OFF",
    image: "/placeholder.svg?height=300&width=500",
    description:
      "Authentic Chinese cuisine with a modern twist. Our chefs prepare each dish with fresh ingredients and traditional recipes.",
    categories: ["Popular", "Appetizers", "Main Dishes", "Noodles", "Rice", "Drinks"],
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 bg-white border-b">
        <div className="container flex items-center justify-between p-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-bold">{restaurant.name}</h1>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Heart className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <main className="flex-1">
        <div className="relative h-48">
          <img
            src={restaurant.image || "/placeholder.svg"}
            alt={restaurant.name}
            className="object-cover w-full h-full"
          />
          {restaurant.promotion && (
            <div className="absolute top-4 left-4 bg-red-500 text-white text-xs px-2 py-1 rounded">
              {restaurant.promotion}
            </div>
          )}
        </div>

        <div className="container p-4">
          <div className="mb-4">
            <h2 className="text-xl font-bold">{restaurant.name}</h2>
            <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
              <span>{restaurant.cuisine}</span>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span>{restaurant.rating}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{restaurant.deliveryTime} min</span>
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-600">{restaurant.description}</p>
          </div>

          <Tabs defaultValue="popular" className="mb-6">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="popular">Popular</TabsTrigger>
              <TabsTrigger value="appetizers">Appetizers</TabsTrigger>
              <TabsTrigger value="main">Main Dishes</TabsTrigger>
            </TabsList>

            <TabsContent value="popular" className="mt-0">
              <div className="grid gap-4">
                {popularItems.map((item) => (
                  <div key={item.id} className="flex gap-3 p-3 bg-white rounded-lg shadow">
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-bold">${item.price.toFixed(2)}</span>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="icon" className="w-7 h-7 rounded-full">
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="text-sm">0</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="w-7 h-7 rounded-full bg-red-500 text-white border-red-500 hover:bg-red-600 hover:text-white"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="w-24 h-24 overflow-hidden rounded-lg">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="appetizers" className="mt-0">
              <div className="grid gap-4">
                {appetizerItems.map((item) => (
                  <div key={item.id} className="flex gap-3 p-3 bg-white rounded-lg shadow">
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-bold">${item.price.toFixed(2)}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="w-7 h-7 rounded-full bg-red-500 text-white border-red-500 hover:bg-red-600 hover:text-white"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="w-24 h-24 overflow-hidden rounded-lg">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="main" className="mt-0">
              <div className="grid gap-4">
                {mainItems.map((item) => (
                  <div key={item.id} className="flex gap-3 p-3 bg-white rounded-lg shadow">
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-bold">${item.price.toFixed(2)}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="w-7 h-7 rounded-full bg-red-500 text-white border-red-500 hover:bg-red-600 hover:text-white"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="w-24 h-24 overflow-hidden rounded-lg">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <div className="sticky bottom-0 z-10 bg-white border-t p-4">
        <Button className="w-full gap-2 bg-red-500 hover:bg-red-600">
          <ShoppingBag className="w-5 h-5" />
          View Cart • $0.00
        </Button>
      </div>
    </div>
  )
}

const popularItems = [
  {
    id: 1,
    name: "Kung Pao Chicken",
    description: "Spicy stir-fried chicken with peanuts, vegetables, and chili peppers",
    price: 15.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    name: "Beef Chow Mein",
    description: "Stir-fried noodles with tender beef and mixed vegetables",
    price: 14.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    name: "Vegetable Spring Rolls",
    description: "Crispy rolls filled with cabbage, carrots, and mushrooms",
    price: 6.99,
    image: "/placeholder.svg?height=200&width=200",
  },
]

const appetizerItems = [
  {
    id: 101,
    name: "Vegetable Spring Rolls",
    description: "Crispy rolls filled with cabbage, carrots, and mushrooms",
    price: 6.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 102,
    name: "Pork Dumplings",
    description: "Steamed dumplings filled with seasoned pork and vegetables",
    price: 8.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 103,
    name: "Crab Rangoon",
    description: "Crispy wontons filled with cream cheese and crab meat",
    price: 7.99,
    image: "/placeholder.svg?height=200&width=200",
  },
]

const mainItems = [
  {
    id: 201,
    name: "Kung Pao Chicken",
    description: "Spicy stir-fried chicken with peanuts, vegetables, and chili peppers",
    price: 15.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 202,
    name: "Beef with Broccoli",
    description: "Tender beef and broccoli in a savory brown sauce",
    price: 16.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 203,
    name: "Mapo Tofu",
    description: "Soft tofu in a spicy sauce with minced pork",
    price: 13.99,
    image: "/placeholder.svg?height=200&width=200",
  },
]

