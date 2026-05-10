"use client"

import { 
  Clock, 
  MapPin,
  Truck, 
  Store,
  CreditCard,
  Smartphone,
  Banknote,
  Package,
  CheckCircle2,
  ChefHat,
  PackageCheck,
  XCircle,
  Circle
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import type { CustomerOrder, CustomerOrderStatus } from "@/app/mis-pedidos/page"

interface OrderHistoryDetailDialogProps {
  order: CustomerOrder | null
  open: boolean
  onOpenChange: (open: boolean) => void
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

interface TimelineStep {
  id: string
  label: string
  icon: React.ElementType
  time?: Date
  isCompleted: boolean
  isCurrent: boolean
  isCancelled?: boolean
}

function getTimelineSteps(order: CustomerOrder): TimelineStep[] {
  const { timeline, status, deliveryMethod } = order
  
  const steps: TimelineStep[] = [
    {
      id: "pedido_recibido",
      label: "Pedido recibido",
      icon: Package,
      time: timeline.pedidoRecibido,
      isCompleted: true,
      isCurrent: status === "pendiente",
    },
    {
      id: "en_preparacion",
      label: "En preparación",
      icon: ChefHat,
      time: timeline.enPreparacion,
      isCompleted: !!timeline.enPreparacion,
      isCurrent: status === "preparacion",
    },
    {
      id: "listo",
      label: deliveryMethod === "delivery" ? "Listo para envío" : "Listo para recojo",
      icon: PackageCheck,
      time: timeline.listo,
      isCompleted: !!timeline.listo,
      isCurrent: false,
    },
  ]

  if (deliveryMethod === "delivery") {
    steps.push({
      id: "en_camino",
      label: "En camino",
      icon: Truck,
      time: timeline.enCamino,
      isCompleted: !!timeline.enCamino,
      isCurrent: status === "en_camino",
    })
  }

  steps.push({
    id: "entregado",
    label: deliveryMethod === "delivery" ? "Entregado" : "Recogido",
    icon: CheckCircle2,
    time: timeline.entregado,
    isCompleted: !!timeline.entregado,
    isCurrent: status === "entregado",
  })

  if (status === "cancelado") {
    return [
      steps[0],
      {
        id: "cancelado",
        label: "Cancelado",
        icon: XCircle,
        time: timeline.cancelado,
        isCompleted: true,
        isCurrent: true,
        isCancelled: true,
      }
    ]
  }

  return steps
}

function formatTime(date: Date) {
  return date.toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" })
}

function formatDate(date: Date) {
  return date.toLocaleDateString("es-PE", { day: "numeric", month: "short" })
}

export function OrderHistoryDetailDialog({ 
  order, 
  open, 
  onOpenChange 
}: OrderHistoryDetailDialogProps) {
  if (!order) return null

  const status = statusConfig[order.status]
  const paymentMethod = paymentMethodConfig[order.paymentMethod]
  const PaymentIcon = paymentMethod.icon
  const timelineSteps = getTimelineSteps(order)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">
              {order.orderNumber}
            </DialogTitle>
            <Badge className={cn("text-xs", status.bgColor, status.color)}>
              {status.label}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Date */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>
              {order.date.toLocaleDateString("es-PE", { 
                weekday: "long",
                day: "numeric", 
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
              })}
            </span>
          </div>

          {/* Tracking Timeline */}
          <div className="p-4 bg-muted/50 rounded-xl">
            <h4 className="font-semibold text-sm mb-4">Seguimiento del pedido</h4>
            <div className="relative">
              {timelineSteps.map((step, index) => {
                const StepIcon = step.icon
                const isLast = index === timelineSteps.length - 1
                
                return (
                  <div key={step.id} className="flex gap-3 relative">
                    {/* Connector Line */}
                    {!isLast && (
                      <div 
                        className={cn(
                          "absolute left-[15px] top-[30px] w-0.5 h-[calc(100%-10px)]",
                          step.isCompleted ? "bg-primary" : "bg-border"
                        )}
                      />
                    )}
                    
                    {/* Icon */}
                    <div 
                      className={cn(
                        "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2",
                        step.isCancelled 
                          ? "bg-red-100 border-red-300 text-red-600"
                          : step.isCompleted
                            ? "bg-primary border-primary text-primary-foreground"
                            : step.isCurrent
                              ? "bg-primary/10 border-primary text-primary"
                              : "bg-muted border-border text-muted-foreground"
                      )}
                    >
                      {step.isCompleted || step.isCurrent ? (
                        <StepIcon className="h-4 w-4" />
                      ) : (
                        <Circle className="h-3 w-3" />
                      )}
                    </div>
                    
                    {/* Content */}
                    <div className={cn("pb-6", isLast && "pb-0")}>
                      <p className={cn(
                        "font-medium text-sm",
                        step.isCancelled 
                          ? "text-red-600"
                          : step.isCompleted || step.isCurrent 
                            ? "text-foreground" 
                            : "text-muted-foreground"
                      )}>
                        {step.label}
                      </p>
                      {step.time && (
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {formatDate(step.time)} - {formatTime(step.time)}
                        </p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Delivery Method */}
          <div className="flex items-center gap-3 p-3 border rounded-lg">
            <div className={cn(
              "h-10 w-10 rounded-full flex items-center justify-center",
              order.deliveryMethod === "delivery" ? "bg-blue-100" : "bg-primary/10"
            )}>
              {order.deliveryMethod === "delivery" ? (
                <Truck className="h-5 w-5 text-blue-600" />
              ) : (
                <Store className="h-5 w-5 text-primary" />
              )}
            </div>
            <div>
              <p className="font-medium">
                {order.deliveryMethod === "delivery" ? "Delivery a domicilio" : "Recojo en tienda"}
              </p>
              {order.address && (
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {order.address}
                </p>
              )}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
              <Package className="h-4 w-4 text-primary" />
              Productos ({order.items.length})
            </h4>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-muted rounded-lg flex items-center justify-center">
                      <Package className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        S/. {item.price.toFixed(2)} x {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="font-medium">
                    S/. {(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Order Summary */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>S/. {order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Envío</span>
              <span>{order.deliveryFee > 0 ? `S/. ${order.deliveryFee.toFixed(2)}` : "Gratis"}</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t">
              <span>Total</span>
              <span className="text-primary">S/. {order.total.toFixed(2)}</span>
            </div>
          </div>

          {/* Payment Info */}
          <div className="flex items-center gap-3 p-3 border rounded-lg">
            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
              <PaymentIcon className={cn("h-5 w-5", paymentMethod.color)} />
            </div>
            <div>
              <p className={cn("font-medium", paymentMethod.color)}>
                {paymentMethod.label}
              </p>
              <p className="text-sm text-muted-foreground">Método de pago</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
