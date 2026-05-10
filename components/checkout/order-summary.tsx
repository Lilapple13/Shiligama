"use client"

import Link from "next/link"
import { 
  Truck, 
  Store, 
  AlertCircle,
  ArrowRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { cn } from "@/lib/utils"

interface OrderSummaryProps {
  subtotal: number
  deliveryFee: number
  total: number
  deliveryMethod: "delivery" | "pickup"
  onDeliveryMethodChange: (method: "delivery" | "pickup") => void
  hasLowStockItems: boolean
  itemCount: number
}

export function OrderSummary({
  subtotal,
  deliveryFee,
  total,
  deliveryMethod,
  onDeliveryMethodChange,
  hasLowStockItems,
  itemCount,
}: OrderSummaryProps) {
  return (
    <div className="sticky top-24 space-y-6">
      {/* Order Summary Card */}
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <h2 className="text-lg font-bold text-foreground mb-4">
          Resumen del pedido
        </h2>

        {/* Summary Lines */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              Subtotal ({itemCount} {itemCount === 1 ? "producto" : "productos"})
            </span>
            <span className="font-medium text-foreground">
              S/. {subtotal.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Envío</span>
            <span className="font-medium text-foreground">
              {deliveryFee === 0 ? (
                <span className="text-primary">Gratis</span>
              ) : (
                `S/. ${deliveryFee.toFixed(2)}`
              )}
            </span>
          </div>
        </div>

        <Separator className="my-4" />

        {/* Total */}
        <div className="flex justify-between items-baseline">
          <span className="text-base font-medium text-foreground">Total</span>
          <span className="text-2xl font-bold text-primary">
            S/. {total.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Delivery Method */}
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <h3 className="text-base font-semibold text-foreground mb-4">
          Método de entrega
        </h3>
        <RadioGroup
          value={deliveryMethod}
          onValueChange={(value) => onDeliveryMethodChange(value as "delivery" | "pickup")}
          className="grid grid-cols-2 gap-3"
        >
          <Label
            htmlFor="delivery"
            className={cn(
              "flex flex-col items-center gap-2 rounded-lg border-2 p-4 cursor-pointer transition-all",
              deliveryMethod === "delivery"
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50"
            )}
          >
            <RadioGroupItem value="delivery" id="delivery" className="sr-only" />
            <Truck className={cn(
              "h-6 w-6",
              deliveryMethod === "delivery" ? "text-primary" : "text-muted-foreground"
            )} />
            <span className={cn(
              "text-sm font-medium",
              deliveryMethod === "delivery" ? "text-primary" : "text-foreground"
            )}>
              Delivery
            </span>
            <span className="text-xs text-muted-foreground">S/. 5.00</span>
          </Label>

          <Label
            htmlFor="pickup"
            className={cn(
              "flex flex-col items-center gap-2 rounded-lg border-2 p-4 cursor-pointer transition-all",
              deliveryMethod === "pickup"
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50"
            )}
          >
            <RadioGroupItem value="pickup" id="pickup" className="sr-only" />
            <Store className={cn(
              "h-6 w-6",
              deliveryMethod === "pickup" ? "text-primary" : "text-muted-foreground"
            )} />
            <span className={cn(
              "text-sm font-medium",
              deliveryMethod === "pickup" ? "text-primary" : "text-foreground"
            )}>
              Recojo en tienda
            </span>
            <span className="text-xs text-muted-foreground">Gratis</span>
          </Label>
        </RadioGroup>
      </div>

      {/* Low Stock Warning */}
      {hasLowStockItems && (
        <Alert className="border-amber-500/50 bg-amber-50 dark:bg-amber-950/20">
          <AlertCircle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800 dark:text-amber-200 text-sm">
            Algunos productos tienen stock limitado. Confirma tu pedido pronto.
          </AlertDescription>
        </Alert>
      )}

      {/* Confirm Button */}
      <Button asChild className="w-full h-12 text-base font-semibold gap-2" size="lg">
        <Link href="/checkout/pago">
          Continuar al pago
          <ArrowRight className="h-5 w-5" />
        </Link>
      </Button>

      {/* Security Note */}
      <p className="text-center text-xs text-muted-foreground">
        Pago seguro. Tus datos están protegidos.
      </p>
    </div>
  )
}
