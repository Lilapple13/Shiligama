"use client"

import { Package, Truck, ShoppingBag } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}

interface PaymentOrderSummaryProps {
  items: CartItem[]
  subtotal: number
  deliveryFee: number
  total: number
}

export function PaymentOrderSummary({
  items,
  subtotal,
  deliveryFee,
  total,
}: PaymentOrderSummaryProps) {
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="sticky top-24 space-y-4">
      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <ShoppingBag className="h-5 w-5 text-primary" />
            Resumen del Pedido
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Product List */}
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-start justify-between gap-3 pb-3 border-b border-border/50 last:border-0 last:pb-0"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                    <Package className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium text-foreground line-clamp-2">
                      {item.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Cantidad: {item.quantity}
                    </p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-semibold text-foreground">
                    S/. {(item.price * item.quantity).toFixed(2)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    S/. {item.price.toFixed(2)} c/u
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Separator />

          {/* Totals */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                Subtotal ({itemCount} {itemCount === 1 ? "producto" : "productos"})
              </span>
              <span className="font-medium text-foreground">
                S/. {subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground flex items-center gap-1.5">
                <Truck className="h-4 w-4" />
                Envío
              </span>
              <span className="font-medium text-foreground">
                S/. {deliveryFee.toFixed(2)}
              </span>
            </div>
          </div>

          <Separator />

          {/* Total */}
          <div className="flex justify-between items-baseline pt-1">
            <span className="text-base font-semibold text-foreground">Total a pagar</span>
            <span className="text-2xl font-bold text-primary">
              S/. {total.toFixed(2)}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Delivery Info */}
      <Card className="shadow-sm">
        <CardContent className="pt-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 shrink-0">
              <Truck className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground text-sm">Entrega a domicilio</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Av. Los Pinos 123, San Isidro
              </p>
              <p className="text-xs text-muted-foreground">
                Tiempo estimado: 30-45 min
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
