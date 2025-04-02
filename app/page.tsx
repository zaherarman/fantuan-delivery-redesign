"use client"

import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import type React from "react"

import Link from "next/link"
import { Search, MapPin, Filter, Star, Clock, ShoppingBag, ChevronDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect, useMemo } from "react"

// Define types for our data
type DietaryOption = "Vegetarian" | "Vegan" | "Gluten-Free" | "Dairy-Free" | "Nut-Free" | "Halal" | "Kosher"
type Cuisine =
  | "Chinese"
  | "Japanese"
  | "Korean"
  | "Thai"
  | "Vietnamese"
  | "Italian"
  | "Mexican"
  | "Indian"
  | "American"
  | "French"
  | "Greek"
  | "Spanish"
  | "Turkish"
  | "Lebanese"
  | "Ethiopian"
type MealType = "Breakfast" | "Lunch" | "Dinner" | "Dessert" | "Snacks" | "Brunch"
type FoodType =
  | "Noodles"
  | "Rice"
  | "Soup"
  | "BBQ"
  | "Seafood"
  | "Salad"
  | "Sandwich"
  | "Pizza"
  | "Pasta"
  | "Curry"
  | "Stir Fry"
  | "Bread"
type PriceRange = "$" | "$$" | "$$$" | "$$$$"

interface Restaurant {
  id: number
  name: string
  cuisine: Cuisine
  rating: number
  deliveryTime: number
  deliveryFee: number
  promotion: string | null
  priceRange: PriceRange
  priceRangeText: string
  dietaryOptions: DietaryOption[]
  image: string
}

interface Meal {
  id: number
  name: string
  restaurant: string
  cuisine: Cuisine
  mealType: MealType[]
  foodType: FoodType[]
  rating: number
  price: number
  priceRange: PriceRange
  dietaryOptions: DietaryOption[]
  image: string
  popular: boolean
}

const permanentMeal: Meal = {
  id: 999,
  name: "Shanghai Beef Noodle Soup",
  restaurant: "Golden Dragon",
  cuisine: "Chinese",
  mealType: ["Lunch"],
  foodType: ["Noodles", "Soup"],
  rating: 4.7,
  price: 14.99,
  priceRange: "$$",
  dietaryOptions: ["Dairy-Free"],
  image: "/images/noodle-soup.png",
  popular: true,
}

export default function Home() {
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [showMeals, setShowMeals] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredMeals, setFilteredMeals] = useState<Meal[]>([])

  // Generate a large variety of meals
  const allMeals = useMemo(() => generateMeals(300), [])

  // Filter meals based on active filters
  useEffect(() => {
    if (activeFilters.length === 0 && !searchTerm) {
      setFilteredMeals([])
      setShowMeals(false)
      return
    }

    // Start with all meals plus our permanent meal
    let filtered = [...allMeals, permanentMeal]

    // Apply search term filter
    if (searchTerm) {
      filtered = filtered.filter(
        (meal) =>
          meal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          meal.restaurant.toLowerCase().includes(searchTerm.toLowerCase()) ||
          meal.cuisine.toLowerCase().includes(searchTerm.toLowerCase()),
      )

      // Always show meals when searching
      setShowMeals(true)
    }

    // Apply active filters
    if (activeFilters.length > 0) {
      filtered = filtered.filter((meal) => {
        return activeFilters.every((filter) => {
          // Check cuisine
          if (Object.values(cuisineOptions).flat().includes(filter) && meal.cuisine === filter) {
            return true
          }

          // Check meal type
          if (Object.values(mealTypeOptions).flat().includes(filter) && meal.mealType.includes(filter as MealType)) {
            return true
          }

          // Check food type
          if (Object.values(foodTypeOptions).flat().includes(filter) && meal.foodType.includes(filter as FoodType)) {
            return true
          }

          // Check price range
          if (filter.includes("Under $10") && meal.priceRange === "$") {
            return true
          }
          if (filter.includes("$10-$20") && meal.priceRange === "$$") {
            return true
          }
          if (filter.includes("$20-$30") && meal.priceRange === "$$$") {
            return true
          }
          if (filter.includes("Over $30") && meal.priceRange === "$$$$") {
            return true
          }

          // Check dietary options
          if (
            Object.values(dietaryOptions).flat().includes(filter) &&
            meal.dietaryOptions.includes(filter as DietaryOption)
          ) {
            return true
          }

          return false
        })
      })
    }

    setFilteredMeals(filtered)
    setShowMeals(true)
  }, [activeFilters, searchTerm, allMeals])

  const applyFilter = (filter: string) => {
    if (!activeFilters.includes(filter)) {
      setActiveFilters([...activeFilters, filter])
    }
  }

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter))
    if (activeFilters.length <= 1 && !searchTerm) {
      setShowMeals(false)
    }
  }

  const clearAllFilters = () => {
    setActiveFilters([])
    if (!searchTerm) {
      setShowMeals(false)
    }
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)

    // Always show meals when there's a search term
    if (value) {
      setShowMeals(true)
    } else if (activeFilters.length === 0) {
      setShowMeals(false)
    }
  }

  // Function to determine which image to use based on food type
  const getMealImage = (foodTypes: FoodType[]): string => {
    if (foodTypes.includes("BBQ") || foodTypes.includes("Sandwich")) {
      return "/images/burger.png"
    } else if (foodTypes.includes("Noodles") || foodTypes.includes("Soup") || foodTypes.includes("Pasta")) {
      return "/images/noodle-soup.png"
    } else if (foodTypes.includes("Rice")) {
      return "/images/rice.png"
    } else if (foodTypes.includes("Bread")) {
      return "/images/bread.png"
    } else if (foodTypes.includes("Seafood")) {
      return "/images/seafood.png"
    } else if (foodTypes.includes("Salad")) {
      return "/images/salad.png"
    } else if (foodTypes.includes("Pizza")) {
      return "/images/pizza.png"
    } else if (foodTypes.includes("Curry") || foodTypes.includes("Stir Fry")) {
      return "/images/curry.png"
    }

    // Default image if no specific food type matches
    return "/images/fast-food.png"
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 bg-white border-b">
        <div className="container flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-cyan-500" />
            <span className="text-sm font-medium text-black">Deliver to: Current Location</span>
          </div>
          <Link href="/profile">
            <Button variant="ghost" size="icon" className="rounded-full">
              <span className="sr-only">Profile</span>
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            </Button>
          </Link>
        </div>
        <div className="container px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for restaurants or dishes"
              className="pl-9 rounded-full bg-gray-100"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
      </header>

      {/* Filter bar at the top */}
      <div className="sticky top-[73px] z-10 bg-white border-b shadow-sm">
        <div className="container px-4 py-3">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="font-bold hover:bg-cyan-50 hover:text-cyan-600 hover:border-cyan-500"
                >
                  Cuisine <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuGroup>
                  {Object.entries(cuisineOptions).map(([category, options]) =>
                    options.map((option) => (
                      <DropdownMenuItem key={option} onClick={() => applyFilter(option)}>
                        {option}
                      </DropdownMenuItem>
                    )),
                  )}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="font-bold hover:bg-cyan-50 hover:text-cyan-600 hover:border-cyan-500"
                >
                  Meal Type <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuGroup>
                  {Object.entries(mealTypeOptions).map(([category, options]) =>
                    options.map((option) => (
                      <DropdownMenuItem key={option} onClick={() => applyFilter(option)}>
                        {option}
                      </DropdownMenuItem>
                    )),
                  )}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="font-bold hover:bg-cyan-50 hover:text-cyan-600 hover:border-cyan-500"
                >
                  Food Type <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuGroup>
                  {Object.entries(foodTypeOptions).map(([category, options]) =>
                    options.map((option) => (
                      <DropdownMenuItem key={option} onClick={() => applyFilter(option)}>
                        {option}
                      </DropdownMenuItem>
                    )),
                  )}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="font-bold hover:bg-cyan-50 hover:text-cyan-600 hover:border-cyan-500"
                >
                  Price <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => applyFilter("$ (Under $10)")}>Under $10</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => applyFilter("$$ ($10-$20)")}>$10-$20</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => applyFilter("$$$ ($20-$30)")}>$20-$30</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => applyFilter("$$$$ (Over $30)")}>Over $30</DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="font-bold hover:bg-cyan-50 hover:text-cyan-600 hover:border-cyan-500"
                >
                  Dietary <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuGroup>
                  {Object.entries(dietaryOptions).map(([category, options]) =>
                    options.map((option) => (
                      <DropdownMenuItem key={option} onClick={() => applyFilter(option)}>
                        {option}
                      </DropdownMenuItem>
                    )),
                  )}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="outline"
              size="sm"
              className="font-bold hover:bg-cyan-50 hover:text-cyan-600 hover:border-cyan-500"
            >
              <Filter className="mr-1 h-4 w-4" />
              More
            </Button>
          </div>

          {/* Active filters display */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {activeFilters.map((filter) => (
                <Badge key={filter} variant="secondary" className="px-2 py-1 flex items-center gap-1">
                  {filter}
                  <Button variant="ghost" size="icon" className="h-4 w-4 p-0 ml-1" onClick={() => removeFilter(filter)}>
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
              <Button variant="ghost" size="sm" className="text-xs h-6 hover:text-cyan-500" onClick={clearAllFilters}>
                Clear all
              </Button>
            </div>
          )}
        </div>
      </div>

      <main className="flex-1">
        <div className="container p-4">
          {showMeals ? (
            <>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Meals</h2>
                <span className="text-sm text-gray-500">{filteredMeals.length} results</span>
              </div>

              {filteredMeals.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredMeals.map((meal) => (
                    <div key={meal.id} className="bg-white rounded-lg shadow overflow-hidden">
                      <div className="relative">
                        <img
                          src={getMealImage(meal.foodType) || "/placeholder.svg"}
                          alt={meal.name}
                          className="w-full aspect-square object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-cyan-500 text-white text-xs px-2 py-1 rounded font-medium">
                          ${meal.price.toFixed(2)}
                        </div>
                        {meal.popular && (
                          <div className="absolute top-2 left-2 bg-cyan-500 text-white text-xs px-2 py-1 rounded">
                            Popular
                          </div>
                        )}
                      </div>
                      <div className="p-3">
                        <h3 className="font-medium text-sm">{meal.name}</h3>
                        <p className="text-xs text-gray-500 mt-1">
                          {meal.restaurant} • {meal.cuisine}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                            <span className="text-xs">{meal.rating}</span>
                          </div>
                          {meal.dietaryOptions && meal.dietaryOptions.length > 0 && (
                            <div className="flex gap-1">
                              {meal.dietaryOptions.map((option, idx) => (
                                <span key={idx} className="text-xs">
                                  {option === "Vegetarian" && "🥗"}
                                  {option === "Vegan" && "🌱"}
                                  {option === "Gluten-Free" && "🌾"}
                                  {option === "Dairy-Free" && "🥛"}
                                  {option === "Nut-Free" && "🥜"}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {meal.foodType.slice(0, 2).map((type, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs px-1 py-0 bg-gray-50">
                              {type}
                            </Badge>
                          ))}
                          {meal.mealType.slice(0, 1).map((type, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs px-1 py-0 bg-gray-50">
                              {type}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No results found</h3>
                  <p className="text-gray-500 text-center max-w-md">
                    We couldn't find any meals matching your search criteria. Try adjusting your filters or search term.
                  </p>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center mb-4">
                <div className="text-xl font-bold pl-0">Popular Restaurants</div>
              </div>

              <div className="grid gap-4">
                {restaurants.map((restaurant) => (
                  <Link href={`/restaurant/${restaurant.id}`} key={restaurant.id}>
                    <div className="overflow-hidden bg-white rounded-lg shadow">
                      <div className="relative h-48">
                        <img
                          src="/images/meal-preview.png"
                          alt={restaurant.name}
                          className="object-cover w-full h-full"
                        />
                        {restaurant.promotion && (
                          <div className="absolute top-2 left-2 bg-cyan-500 text-white text-xs px-2 py-1 rounded">
                            {restaurant.promotion}
                          </div>
                        )}
                        <div className="absolute top-2 right-2 bg-cyan-500 text-white text-xs px-2 py-1 rounded font-medium">
                          {restaurant.priceRangeText.replace("Under ", "").replace(" (", "").replace(")", "")}
                        </div>
                      </div>
                      <div className="p-3">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold">{restaurant.name}</h3>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span className="text-sm font-medium">{restaurant.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                          <span>{restaurant.cuisine}</span>
                          <span>•</span>
                          <span>${restaurant.deliveryFee} delivery</span>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{restaurant.deliveryTime} min</span>
                          </div>
                        </div>
                        {/* Dietary information with icons */}
                        {restaurant.dietaryOptions && (
                          <div className="flex items-center gap-2 mt-2">
                            {restaurant.dietaryOptions.map((option, index) => (
                              <Badge key={index} variant="outline" className="text-xs px-2 py-0.5 bg-gray-50">
                                {option === "Vegetarian" && <span className="mr-1">🥗</span>}
                                {option === "Vegan" && <span className="mr-1">🌱</span>}
                                {option === "Gluten-Free" && <span className="mr-1">🌾</span>}
                                {option}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      <nav className="sticky bottom-0 z-10 bg-white border-t">
        <div className="container">
          <div className="grid grid-cols-4 py-2">
            <Link href="/" className="flex flex-col items-center justify-center text-cyan-500 hover:text-cyan-600">
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
                className="w-5 h-5"
              >
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <span className="text-xs mt-0.5">Home</span>
            </Link>
            <Link
              href="/search"
              className="flex flex-col items-center justify-center text-gray-500 hover:text-cyan-500"
            >
              <Search className="w-5 h-5" />
              <span className="text-xs mt-0.5">Search</span>
            </Link>
            <Link
              href="/orders"
              className="flex flex-col items-center justify-center text-gray-500 hover:text-cyan-500"
            >
              <Clock className="w-5 h-5" />
              <span className="text-xs mt-0.5">Orders</span>
            </Link>
            <Link href="/cart" className="flex flex-col items-center justify-center text-gray-500 hover:text-cyan-500">
              <ShoppingBag className="w-5 h-5" />
              <span className="text-xs mt-0.5">Cart</span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  )
}

// Filter options
const cuisineOptions = {
  asian: ["Chinese", "Japanese", "Korean", "Thai", "Vietnamese"],
  western: ["Italian", "Mexican", "American", "French"],
  other: ["Greek", "Spanish", "Turkish", "Lebanese", "Ethiopian", "Indian"],
}

const mealTypeOptions = {
  main: ["Breakfast", "Lunch", "Dinner"],
  other: ["Dessert", "Snacks", "Brunch"],
}

const foodTypeOptions = {
  staples: ["Noodles", "Rice", "Pasta", "Bread"],
  styles: ["Soup", "BBQ", "Seafood", "Salad", "Sandwich", "Pizza", "Curry", "Stir Fry"],
}

const dietaryOptions = {
  common: ["Vegetarian", "Vegan", "Gluten-Free"],
  allergies: ["Dairy-Free", "Nut-Free"],
  religious: ["Halal", "Kosher"],
}

// Restaurant data
const restaurants: Restaurant[] = [
  {
    id: 1,
    name: "Golden Dragon",
    cuisine: "Chinese",
    rating: 4.8,
    deliveryTime: 25,
    deliveryFee: 2.99,
    promotion: "20% OFF",
    priceRange: "$$",
    priceRangeText: "$10-$20",
    dietaryOptions: ["Vegetarian", "Gluten-Free"],
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: 2,
    name: "Sakura Sushi",
    cuisine: "Japanese",
    rating: 4.6,
    deliveryTime: 30,
    deliveryFee: 3.99,
    promotion: "Free Delivery",
    priceRange: "$$$",
    priceRangeText: "$20-$30",
    dietaryOptions: ["Vegan"],
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: 3,
    name: "Seoul Kitchen",
    cuisine: "Korean",
    rating: 4.7,
    deliveryTime: 35,
    deliveryFee: 2.49,
    promotion: null,
    priceRange: "$$",
    priceRangeText: "$10-$20",
    dietaryOptions: ["Gluten-Free"],
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: 4,
    name: "Spicy House",
    cuisine: "Sichuan",
    rating: 4.5,
    deliveryTime: 40,
    deliveryFee: 1.99,
    promotion: null,
    priceRange: "$",
    priceRangeText: "Under $10",
    dietaryOptions: ["Vegetarian", "Vegan"],
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: 5,
    name: "Pasta Paradise",
    cuisine: "Italian",
    rating: 4.7,
    deliveryTime: 30,
    deliveryFee: 3.49,
    promotion: "New Restaurant",
    priceRange: "$$$",
    priceRangeText: "$20-$30",
    dietaryOptions: ["Vegetarian"],
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: 6,
    name: "Taco Fiesta",
    cuisine: "Mexican",
    rating: 4.4,
    deliveryTime: 25,
    deliveryFee: 2.99,
    promotion: null,
    priceRange: "$$",
    priceRangeText: "$10-$20",
    dietaryOptions: ["Gluten-Free", "Dairy-Free"],
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: 7,
    name: "Curry House",
    cuisine: "Indian",
    rating: 4.6,
    deliveryTime: 35,
    deliveryFee: 2.99,
    promotion: "10% OFF",
    priceRange: "$$",
    priceRangeText: "$10-$20",
    dietaryOptions: ["Vegetarian", "Vegan"],
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: 8,
    name: "Burger Joint",
    cuisine: "American",
    rating: 4.3,
    deliveryTime: 20,
    deliveryFee: 1.99,
    promotion: null,
    priceRange: "$",
    priceRangeText: "Under $10",
    dietaryOptions: ["Gluten-Free"],
    image: "/placeholder.svg?height=300&width=500",
  },
]

// Function to generate a large variety of meals
function generateMeals(count: number): Meal[] {
  const meals: Meal[] = []

  // Base meal data to generate from
  const mealData = [
    // Chinese
    { name: "Kung Pao Chicken", restaurant: "Golden Dragon", cuisine: "Chinese", foodType: ["Stir Fry"], price: 15.99 },
    { name: "Vegetable Spring Rolls", restaurant: "Golden Dragon", cuisine: "Chinese", foodType: ["BBQ"], price: 6.99 },
    {
      name: "Beef Chow Mein",
      restaurant: "Golden Dragon",
      cuisine: "Chinese",
      foodType: ["Noodles", "Stir Fry"],
      price: 14.99,
    },
    {
      name: "Sweet and Sour Pork",
      restaurant: "Golden Dragon",
      cuisine: "Chinese",
      foodType: ["Stir Fry"],
      price: 13.99,
    },
    { name: "Mapo Tofu", restaurant: "Spicy House", cuisine: "Chinese", foodType: ["Stir Fry"], price: 12.99 },
    {
      name: "Dan Dan Noodles",
      restaurant: "Spicy House",
      cuisine: "Chinese",
      foodType: ["Noodles", "Soup"],
      price: 10.99,
    },
    { name: "Peking Duck", restaurant: "Golden Dragon", cuisine: "Chinese", foodType: ["BBQ"], price: 29.99 },
    { name: "Hot Pot", restaurant: "Spicy House", cuisine: "Chinese", foodType: ["Soup"], price: 24.99 },

    // Japanese
    { name: "Salmon Sushi Roll", restaurant: "Sakura Sushi", cuisine: "Japanese", foodType: ["Seafood"], price: 12.99 },
    { name: "Vegetable Tempura", restaurant: "Sakura Sushi", cuisine: "Japanese", foodType: ["BBQ"], price: 9.99 },
    {
      name: "Tonkotsu Ramen",
      restaurant: "Sakura Sushi",
      cuisine: "Japanese",
      foodType: ["Noodles", "Soup"],
      price: 14.99,
    },
    { name: "Chicken Katsu", restaurant: "Sakura Sushi", cuisine: "Japanese", foodType: ["BBQ"], price: 16.99 },
    { name: "Beef Teriyaki", restaurant: "Sakura Sushi", cuisine: "Japanese", foodType: ["BBQ"], price: 18.99 },
    { name: "Miso Soup", restaurant: "Sakura Sushi", cuisine: "Japanese", foodType: ["Soup"], price: 4.99 },
    { name: "Gyoza", restaurant: "Sakura Sushi", cuisine: "Japanese", foodType: ["BBQ"], price: 7.99 },

    // Korean
    { name: "Bibimbap", restaurant: "Seoul Kitchen", cuisine: "Korean", foodType: ["Rice"], price: 14.99 },
    {
      name: "Kimchi Fried Rice",
      restaurant: "Seoul Kitchen",
      cuisine: "Korean",
      foodType: ["Rice", "Stir Fry"],
      price: 11.99,
    },
    { name: "Bulgogi", restaurant: "Seoul Kitchen", cuisine: "Korean", foodType: ["BBQ"], price: 17.99 },
    {
      name: "Japchae",
      restaurant: "Seoul Kitchen",
      cuisine: "Korean",
      foodType: ["Noodles", "Stir Fry"],
      price: 13.99,
    },
    {
      name: "Tteokbokki",
      restaurant: "Seoul Kitchen",
      cuisine: "Korean",
      foodType: ["Rice", "Stir Fry"],
      price: 10.99,
    },
    { name: "Korean Fried Chicken", restaurant: "Seoul Kitchen", cuisine: "Korean", foodType: ["BBQ"], price: 15.99 },

    // Italian
    { name: "Margherita Pizza", restaurant: "Pasta Paradise", cuisine: "Italian", foodType: ["Pizza"], price: 12.99 },
    {
      name: "Spaghetti Carbonara",
      restaurant: "Pasta Paradise",
      cuisine: "Italian",
      foodType: ["Pasta"],
      price: 14.99,
    },
    { name: "Fettuccine Alfredo", restaurant: "Pasta Paradise", cuisine: "Italian", foodType: ["Pasta"], price: 15.99 },
    { name: "Lasagna", restaurant: "Pasta Paradise", cuisine: "Italian", foodType: ["Pasta"], price: 16.99 },
    { name: "Risotto", restaurant: "Pasta Paradise", cuisine: "Italian", foodType: ["Rice"], price: 18.99 },
    { name: "Tiramisu", restaurant: "Pasta Paradise", cuisine: "Italian", foodType: ["Dessert"], price: 8.99 },

    // Mexican
    { name: "Beef Tacos", restaurant: "Taco Fiesta", cuisine: "Mexican", foodType: ["BBQ"], price: 9.99 },
    { name: "Chicken Quesadilla", restaurant: "Taco Fiesta", cuisine: "Mexican", foodType: ["BBQ"], price: 11.99 },
    { name: "Vegetarian Burrito", restaurant: "Taco Fiesta", cuisine: "Mexican", foodType: ["BBQ"], price: 10.99 },
    { name: "Nachos Supreme", restaurant: "Taco Fiesta", cuisine: "Mexican", foodType: ["BBQ"], price: 8.99 },
    { name: "Guacamole & Chips", restaurant: "Taco Fiesta", cuisine: "Mexican", foodType: ["Snacks"], price: 6.99 },

    // Indian
    { name: "Butter Chicken", restaurant: "Curry House", cuisine: "Indian", foodType: ["Curry"], price: 16.99 },
    { name: "Vegetable Biryani", restaurant: "Curry House", cuisine: "Indian", foodType: ["Rice"], price: 14.99 },
    { name: "Palak Paneer", restaurant: "Curry House", cuisine: "Indian", foodType: ["Curry"], price: 13.99 },
    { name: "Chicken Tikka Masala", restaurant: "Curry House", cuisine: "Indian", foodType: ["Curry"], price: 17.99 },
    { name: "Garlic Naan", restaurant: "Curry House", cuisine: "Indian", foodType: ["Bread"], price: 3.99 },
    { name: "Samosas", restaurant: "Curry House", cuisine: "Indian", foodType: ["Snacks"], price: 5.99 },

    // American
    {
      name: "Classic Cheeseburger",
      restaurant: "Burger Joint",
      cuisine: "American",
      foodType: ["BBQ", "Sandwich"],
      price: 8.99,
    },
    { name: "BBQ Ribs", restaurant: "Burger Joint", cuisine: "American", foodType: ["BBQ"], price: 19.99 },
    { name: "Buffalo Wings", restaurant: "Burger Joint", cuisine: "American", foodType: ["BBQ"], price: 12.99 },
    { name: "Caesar Salad", restaurant: "Burger Joint", cuisine: "American", foodType: ["Salad"], price: 7.99 },
    { name: "Mac & Cheese", restaurant: "Burger Joint", cuisine: "American", foodType: ["Pasta"], price: 9.99 },
    { name: "Apple Pie", restaurant: "Burger Joint", cuisine: "American", foodType: ["Dessert"], price: 6.99 },
  ]

  // Generate meals with random properties
  for (let i = 0; i < count; i++) {
    const baseIndex = i % mealData.length
    const baseMeal = mealData[baseIndex]

    // Determine price range
    let priceRange: PriceRange = "$"
    if (baseMeal.price < 10) priceRange = "$"
    else if (baseMeal.price < 20) priceRange = "$$"
    else if (baseMeal.price < 30) priceRange = "$$$"
    else priceRange = "$$$$"

    // Randomly assign meal types
    const mealTypeOptions: MealType[] = ["Breakfast", "Lunch", "Dinner", "Dessert", "Snacks", "Brunch"]
    const mealTypes: MealType[] = []

    // Desserts and snacks get appropriate meal types
    if (baseMeal.foodType.includes("Dessert")) {
      mealTypes.push("Dessert")
    } else if (baseMeal.foodType.includes("Snacks")) {
      mealTypes.push("Snacks")
    } else {
      // Randomly assign 1-2 meal types
      const numTypes = Math.floor(Math.random() * 2) + 1
      const availableTypes = [...mealTypeOptions].filter((t) => t !== "Dessert" && t !== "Snacks")

      for (let j = 0; j < numTypes; j++) {
        if (availableTypes.length > 0) {
          const randomIndex = Math.floor(Math.random() * availableTypes.length)
          mealTypes.push(availableTypes[randomIndex])
          availableTypes.splice(randomIndex, 1)
        }
      }
    }

    // Randomly assign dietary options
    const dietaryOptionsList: DietaryOption[] = [
      "Vegetarian",
      "Vegan",
      "Gluten-Free",
      "Dairy-Free",
      "Nut-Free",
      "Halal",
      "Kosher",
    ]
    const dietaryOptions: DietaryOption[] = []

    // Vegetarian and vegan items
    if (
      baseMeal.name.toLowerCase().includes("vegetable") ||
      baseMeal.name.toLowerCase().includes("vegetarian") ||
      baseMeal.name.toLowerCase().includes("tofu") ||
      baseMeal.name.toLowerCase().includes("salad")
    ) {
      dietaryOptions.push("Vegetarian")

      // Some vegetarian items are also vegan
      if (Math.random() > 0.5) {
        dietaryOptions.push("Vegan")
      }
    }

    // Randomly add other dietary options
    if (Math.random() > 0.7) {
      const randomDietary = dietaryOptionsList[Math.floor(Math.random() * dietaryOptionsList.length)]
      if (!dietaryOptions.includes(randomDietary)) {
        dietaryOptions.push(randomDietary)
      }
    }

    // Create the meal
    meals.push({
      id: 1000 + i,
      name: baseMeal.name,
      restaurant: baseMeal.restaurant,
      cuisine: baseMeal.cuisine as Cuisine,
      mealType: mealTypes,
      foodType: baseMeal.foodType as FoodType[],
      rating: (Math.floor(Math.random() * 10) + 38) / 10, // Random rating between 3.8 and 4.8
      price: baseMeal.price,
      priceRange: priceRange,
      dietaryOptions: dietaryOptions,
      image: "/images/fast-food.png", // Default image, will be replaced by getMealImage function
      popular: Math.random() > 0.8, // 20% chance of being popular
    })
  }

  return meals
}

