"use client"

import { useState } from "react"
import Link from "next/link"
import { ShoppingCart, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CartList } from "@/components/checkout/cart-list"
import { OrderSummary } from "@/components/checkout/order-summary"

export interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
  stock: number
}

const initialCart: CartItem[] = [
  {
    id: 1,
    name: "Arroz Extra Costeño 5kg",
    price: 24.90,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=300&fit=crop",
    quantity: 2,
    stock: 45,
  },
  {
    id: 3,
    name: "Inca Kola 1.5L",
    price: 6.50,
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=300&h=300&fit=crop",
    quantity: 3,
    stock: 5,
  },
  {
    id: 4,
    name: "Leche Gloria Entera 1L",
    price: 5.20,
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&h=300&fit=crop",
    quantity: 6,
    stock: 120,
  },
  {
    id: 9,
    name: "Pechuga de Pollo 1kg",
    price: 16.90,
    image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=300&h=300&fit=crop",
    quantity: 1,
    stock: 3,
  },
]

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>(initialCart)
  const [deliveryMethod, setDeliveryMethod] = useState<"delivery" | "pickup">("delivery")
  const [paymentMethod, setPaymentMethod] = useState<string>("yape")

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.min(newQuantity, item.stock) }
          : item
      )
    )
  }

  const removeItem = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryFee = deliveryMethod === "delivery" ? 5.00 : 0
  const total = subtotal + deliveryFee

  const hasLowStockItems = cart.some((item) => item.stock <= 5)

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="rounded-full bg-secondary p-6 mb-6">
              <ShoppingCart className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Tu carrito está vacío
            </h1>
            <p className="text-muted-foreground mb-6">
              Agrega productos desde nuestro catálogo para continuar
            </p>
            <Button asChild>
              <Link href="/catalogo">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Ir al catálogo
              </Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center gap-4">
            <Link
              href="/catalogo"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Volver al catálogo</span>
            </Link>
            <div className="flex-1" />
            <h1 className="text-lg font-semibold text-foreground">Checkout</h1>
            <div className="flex-1" />
            <div className="w-[100px] hidden sm:block" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 lg:py-10">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left: Cart List */}
          <div className="lg:col-span-2">
            <CartList
              items={cart}
              onUpdateQuantity={updateQuantity}
              onRemoveItem={removeItem}
            />
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary
              subtotal={subtotal}
              deliveryFee={deliveryFee}
              total={total}
              deliveryMethod={deliveryMethod}
              onDeliveryMethodChange={setDeliveryMethod}
              paymentMethod={paymentMethod}
              onPaymentMethodChange={setPaymentMethod}
              hasLowStockItems={hasLowStockItems}
              itemCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
