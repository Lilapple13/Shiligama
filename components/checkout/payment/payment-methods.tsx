"use client"

import { useState } from "react"
import { CreditCard, Smartphone, Banknote, ShieldCheck, Loader2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CardPaymentForm } from "./card-payment-form"
import { YapePaymentForm } from "./yape-payment-form"
import { CashPaymentForm } from "./cash-payment-form"

interface PaymentMethodsProps {
  total: number
  onPayment: () => void
  isProcessing: boolean
}

export function PaymentMethods({ total, onPayment, isProcessing }: PaymentMethodsProps) {
  const [selectedTab, setSelectedTab] = useState("tarjeta")

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground mb-1">
          Selecciona tu método de pago
        </h2>
        <p className="text-sm text-muted-foreground">
          Elige cómo deseas pagar tu pedido de forma segura
        </p>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-auto p-1 bg-secondary/50">
          <TabsTrigger
            value="tarjeta"
            className="flex flex-col sm:flex-row items-center gap-1.5 py-3 data-[state=active]:bg-card data-[state=active]:shadow-sm"
          >
            <CreditCard className="h-4 w-4" />
            <span className="text-xs sm:text-sm">Tarjeta</span>
          </TabsTrigger>
          <TabsTrigger
            value="yape"
            className="flex flex-col sm:flex-row items-center gap-1.5 py-3 data-[state=active]:bg-card data-[state=active]:shadow-sm"
          >
            <Smartphone className="h-4 w-4" />
            <span className="text-xs sm:text-sm">Yape</span>
          </TabsTrigger>
          <TabsTrigger
            value="efectivo"
            className="flex flex-col sm:flex-row items-center gap-1.5 py-3 data-[state=active]:bg-card data-[state=active]:shadow-sm"
          >
            <Banknote className="h-4 w-4" />
            <span className="text-xs sm:text-sm">Efectivo</span>
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="tarjeta" className="mt-0">
            <Card className="border-2 border-primary/20">
              <CardContent className="pt-6">
                <CardPaymentForm />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="yape" className="mt-0">
            <Card className="border-2 border-purple-500/20">
              <CardContent className="pt-6">
                <YapePaymentForm total={total} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="efectivo" className="mt-0">
            <Card className="border-2 border-green-500/20">
              <CardContent className="pt-6">
                <CashPaymentForm total={total} />
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>

      {/* Pay Button */}
      <Button
        onClick={onPayment}
        disabled={isProcessing}
        className="w-full h-14 text-lg font-semibold gap-2 shadow-lg"
        size="lg"
      >
        {isProcessing ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Procesando pago...
          </>
        ) : (
          <>
            <ShieldCheck className="h-5 w-5" />
            Pagar S/. {total.toFixed(2)}
          </>
        )}
      </Button>
    </div>
  )
}
