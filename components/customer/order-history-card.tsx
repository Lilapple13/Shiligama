"use client"

import { 
  Truck, 
  Store, 
  Eye, 
  RotateCcw,
  CreditCard,
  Smartphone,
  Banknote,
  Package
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { CustomerOrder, CustomerOrderStatus } from "@/app/mis-pedidos/page"

interface OrderHistoryCardProps {
  order: CustomerOrder
  onViewDetail: () => void
  onRepeatOrder: () => void
}

const statusConfig: Record<CustomerOrderStatus, { label: string; color: string; bgColor: string }> = {
  pendiente: { label: "Pendiente", color: "text-amber-700", bgColor: "bg-amber-100" },
  preparacion: { label: "En preparación", color: "text-blue-700", bgColor: "bg-blue-100" },
  en_camino: { label: "En camino", color: "text-purple-700", bgColor: "bg-purple-100" },
  entregado: { label: "Entregado", color: "text-emerald-700", bgColor: "bg-emerald-100" },
  cancelado: { label: "Cancelado", color: "text-red-700", bgColor: "bg-red-100" },
}

const paymentMethodConfig: Record<string, { label: string; icon: React.ElementType; color: string }> = {
  yape: { label: "Yape", icon: Smartphone, color: "text-purple-600" },
  plin: { label: "Plin", icon: Smartphone, color: "text-cyan-600" },
  tarjeta: { label: "Tarjeta", icon: CreditCard, color: "text-blue-600" },
  efectivo: { label: "Efectivo", icon: Banknote, color: "text-green-600" },
}

export function OrderHistoryCard({ order, onViewDetail, onRepeatOrder }: OrderHistoryCardProps) {
  const status = statusConfig[order.status]
  const paymentMethod = paymentMethodConfig[order.paymentMethod]
  const PaymentIcon = paymentMethod.icon

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("es-PE", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="flex flex-col lg:flex-row">
          {/* Main Content */}
          <div className="flex-1 p-5">
            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-foreground">{order.orderNumber}</h3>
                  <Badge className={cn("text-xs font-medium", status.bgColor, status.color)}>
                    {status.label}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {formatDate(order.date)}
                </p>
              </div>
              
              {/* Delivery Method Badge */}
              <Badge 
                variant="outline" 
                className={cn(
                  "flex items-center gap-1.5",
                  order.deliveryMethod === "delivery" 
                    ? "border-blue-200 bg-blue-50 text-blue-700" 
                    : "border-primary/20 bg-primary/5 text-primary"
                )}
              >
                {order.deliveryMethod === "delivery" ? (
                  <>
                    <Truck className="h-3.5 w-3.5" />
                    Delivery
                  </>
                ) : (
                  <>
                    <Store className="h-3.5 w-3.5" />
                    Recojo
                  </>
                )}
              </Badge>
            </div>

            {/* Products Summary */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex -space-x-2">
                {order.items.slice(0, 4).map((item, index) => (
                  <div
                    key={item.id}
                    className="h-10 w-10 rounded-lg border-2 border-background bg-muted flex items-center justify-center"
                    style={{ zIndex: 4 - index }}
                  >
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </div>
                ))}
                {order.items.length > 4 && (
                  <div className="h-10 w-10 rounded-lg border-2 border-background bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                    +{order.items.length - 4}
                  </div>
                )}
              </div>
              <div className="text-sm">
                <span className="font-medium">{order.items.length} productos</span>
                <span className="text-muted-foreground"> - </span>
                <span className="text-muted-foreground">
                  {order.items.slice(0, 2).map(i => i.name).join(", ")}
                  {order.items.length > 2 && "..."}
                </span>
              </div>
            </div>

            {/* Payment Method */}
            <div className="flex items-center gap-2 text-sm">
              <PaymentIcon className={cn("h-4 w-4", paymentMethod.color)} />
              <span className={cn("font-medium", paymentMethod.color)}>
                {paymentMethod.label}
              </span>
            </div>
          </div>

          {/* Right Section - Total & Actions */}
          <div className="flex flex-row lg:flex-col items-center justify-between lg:justify-center gap-4 p-5 bg-muted/30 lg:w-56 border-t lg:border-t-0 lg:border-l">
            <div className="text-center lg:mb-2">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Total</p>
              <p className="text-2xl font-bold text-primary">
                S/. {order.total.toFixed(2)}
              </p>
            </div>
            
            <div className="flex flex-row lg:flex-col gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onViewDetail}
                className="flex items-center gap-1.5"
              >
                <Eye className="h-4 w-4" />
                <span className="hidden sm:inline">Ver detalle</span>
              </Button>
              {order.status !== "cancelado" && (
                <Button 
                  size="sm" 
                  onClick={onRepeatOrder}
                  className="flex items-center gap-1.5"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span className="hidden sm:inline">Repetir</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
