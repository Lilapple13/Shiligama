"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ShieldCheck, Lock } from "lucide-react"
import { PaymentOrderSummary } from "@/components/checkout/payment/payment-order-summary"
import { PaymentMethods } from "@/components/checkout/payment/payment-methods"

export interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}

const cartItems: CartItem[] = [
  { id: 1, name: "Arroz Extra Costeño 5kg", price: 24.90, quantity: 2 },
  { id: 3, name: "Inca Kola 1.5L", price: 6.50, quantity: 3 },
  { id: 4, name: "Leche Gloria Entera 1L", price: 5.20, quantity: 6 },
  { id: 9, name: "Pechuga de Pollo 1kg", price: 16.90, quantity: 1 },
]

export default function PaymentPage() {
  const [isProcessing, setIsProcessing] = useState(false)

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryFee = 5.00
  const total = subtotal + deliveryFee

  const handlePayment = () => {
    setIsProcessing(true)
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      alert("Pago procesado exitosamente!")
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center gap-4">
            <Link
              href="/checkout"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Volver al carrito</span>
            </Link>
            <div className="flex-1" />
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-primary" />
              <h1 className="text-lg font-semibold text-foreground">Pago Seguro</h1>
            </div>
            <div className="flex-1" />
            <div className="w-[100px] hidden sm:block" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 lg:py-10">
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Left: Order Summary */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <PaymentOrderSummary
              items={cartItems}
              subtotal={subtotal}
              deliveryFee={deliveryFee}
              total={total}
            />
          </div>

          {/* Right: Payment Methods */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <PaymentMethods
              total={total}
              onPayment={handlePayment}
              isProcessing={isProcessing}
            />
          </div>
        </div>

        {/* Security Footer */}
        <div className="mt-12 border-t pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-center">
            <div className="flex items-center gap-2 text-muted-foreground">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <span className="text-sm">Compra 100% Segura</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Lock className="h-5 w-5 text-primary" />
              <span className="text-sm">Conexión SSL Encriptada</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 px-3 py-1.5 bg-primary/10 rounded-full">
                <span className="text-xs font-medium text-primary">PCI DSS Compliant</span>
              </div>
            </div>
          </div>
          <p className="text-center text-xs text-muted-foreground mt-4">
            Tus datos de pago están protegidos con encriptación de grado bancario.
            Nunca almacenamos tu información de tarjeta.
          </p>
        </div>
      </main>
    </div>
  )
}
