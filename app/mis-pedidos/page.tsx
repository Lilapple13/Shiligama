"use client"

import { useState } from "react"
import { CatalogNavbar } from "@/components/catalog/catalog-navbar"
import { OrderHistoryFilters } from "@/components/customer/order-history-filters"
import { OrderHistoryCard } from "@/components/customer/order-history-card"
import { OrderHistoryDetailDialog } from "@/components/customer/order-history-detail-dialog"
import { Package } from "lucide-react"

export type CustomerOrderStatus = "entregado" | "cancelado" | "en_camino" | "preparacion" | "pendiente"

export interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
}

export interface CustomerOrder {
  id: string
  orderNumber: string
  date: Date
  status: CustomerOrderStatus
  deliveryMethod: "delivery" | "pickup"
  items: OrderItem[]
  subtotal: number
  deliveryFee: number
  total: number
  paymentMethod: "yape" | "plin" | "tarjeta" | "efectivo"
  address?: string
  timeline: {
    pedidoRecibido: Date
    enPreparacion?: Date
    listo?: Date
    enCamino?: Date
    entregado?: Date
    cancelado?: Date
  }
}

// Sample data
const sampleOrders: CustomerOrder[] = [
  {
    id: "1",
    orderNumber: "SHI-2024-0156",
    date: new Date(2024, 11, 15, 14, 30),
    status: "entregado",
    deliveryMethod: "delivery",
    items: [
      { id: "1", name: "Arroz Costeño 5kg", price: 24.90, quantity: 2 },
      { id: "2", name: "Aceite Primor 1L", price: 12.50, quantity: 1 },
      { id: "3", name: "Leche Gloria 1L", price: 5.20, quantity: 6 },
      { id: "4", name: "Azúcar Rubia 1kg", price: 4.80, quantity: 2 },
    ],
    subtotal: 102.50,
    deliveryFee: 5.00,
    total: 107.50,
    paymentMethod: "yape",
    address: "Av. Los Álamos 123, San Isidro",
    timeline: {
      pedidoRecibido: new Date(2024, 11, 15, 14, 30),
      enPreparacion: new Date(2024, 11, 15, 14, 45),
      listo: new Date(2024, 11, 15, 15, 10),
      enCamino: new Date(2024, 11, 15, 15, 20),
      entregado: new Date(2024, 11, 15, 15, 45),
    }
  },
  {
    id: "2",
    orderNumber: "SHI-2024-0155",
    date: new Date(2024, 11, 14, 10, 15),
    status: "en_camino",
    deliveryMethod: "delivery",
    items: [
      { id: "1", name: "Gaseosa Inca Kola 3L", price: 12.00, quantity: 2 },
      { id: "2", name: "Galletas Oreo 6-pack", price: 8.50, quantity: 1 },
      { id: "3", name: "Pan de Molde Bimbo", price: 7.90, quantity: 1 },
    ],
    subtotal: 40.40,
    deliveryFee: 5.00,
    total: 45.40,
    paymentMethod: "plin",
    address: "Jr. Las Flores 456, Miraflores",
    timeline: {
      pedidoRecibido: new Date(2024, 11, 14, 10, 15),
      enPreparacion: new Date(2024, 11, 14, 10, 30),
      listo: new Date(2024, 11, 14, 11, 00),
      enCamino: new Date(2024, 11, 14, 11, 15),
    }
  },
  {
    id: "3",
    orderNumber: "SHI-2024-0150",
    date: new Date(2024, 11, 12, 16, 45),
    status: "cancelado",
    deliveryMethod: "pickup",
    items: [
      { id: "1", name: "Detergente Bolivar 2kg", price: 28.90, quantity: 1 },
      { id: "2", name: "Jabón Bolívar Pack x3", price: 9.50, quantity: 2 },
    ],
    subtotal: 47.90,
    deliveryFee: 0,
    total: 47.90,
    paymentMethod: "efectivo",
    timeline: {
      pedidoRecibido: new Date(2024, 11, 12, 16, 45),
      cancelado: new Date(2024, 11, 12, 17, 00),
    }
  },
  {
    id: "4",
    orderNumber: "SHI-2024-0148",
    date: new Date(2024, 11, 10, 9, 20),
    status: "entregado",
    deliveryMethod: "pickup",
    items: [
      { id: "1", name: "Yogurt Gloria 1L", price: 8.90, quantity: 3 },
      { id: "2", name: "Queso Fresco 500g", price: 15.00, quantity: 1 },
      { id: "3", name: "Jamón del Norte 200g", price: 12.50, quantity: 1 },
      { id: "4", name: "Pan Francés x10", price: 3.00, quantity: 2 },
      { id: "5", name: "Mantequilla Gloria 200g", price: 7.80, quantity: 1 },
    ],
    subtotal: 68.00,
    deliveryFee: 0,
    total: 68.00,
    paymentMethod: "tarjeta",
    timeline: {
      pedidoRecibido: new Date(2024, 11, 10, 9, 20),
      enPreparacion: new Date(2024, 11, 10, 9, 35),
      listo: new Date(2024, 11, 10, 10, 00),
      entregado: new Date(2024, 11, 10, 10, 30),
    }
  },
  {
    id: "5",
    orderNumber: "SHI-2024-0145",
    date: new Date(2024, 11, 8, 18, 00),
    status: "entregado",
    deliveryMethod: "delivery",
    items: [
      { id: "1", name: "Pollo Entero 2.5kg", price: 32.50, quantity: 1 },
      { id: "2", name: "Papa Blanca 3kg", price: 9.00, quantity: 1 },
      { id: "3", name: "Cebolla Roja 1kg", price: 4.50, quantity: 1 },
      { id: "4", name: "Ají Amarillo 250g", price: 3.00, quantity: 2 },
    ],
    subtotal: 52.00,
    deliveryFee: 5.00,
    total: 57.00,
    paymentMethod: "yape",
    address: "Av. Los Álamos 123, San Isidro",
    timeline: {
      pedidoRecibido: new Date(2024, 11, 8, 18, 00),
      enPreparacion: new Date(2024, 11, 8, 18, 15),
      listo: new Date(2024, 11, 8, 18, 40),
      enCamino: new Date(2024, 11, 8, 18, 50),
      entregado: new Date(2024, 11, 8, 19, 20),
    }
  },
]

export default function OrderHistoryPage() {
  const [orders] = useState<CustomerOrder[]>(sampleOrders)
  const [selectedOrder, setSelectedOrder] = useState<CustomerOrder | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState<string>("todos")
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  })

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    // Status filter
    if (statusFilter !== "todos" && order.status !== statusFilter) {
      return false
    }
    // Date range filter
    if (dateRange.from && order.date < dateRange.from) {
      return false
    }
    if (dateRange.to) {
      const endOfDay = new Date(dateRange.to)
      endOfDay.setHours(23, 59, 59, 999)
      if (order.date > endOfDay) {
        return false
      }
    }
    return true
  })

  const handleViewDetail = (order: CustomerOrder) => {
    setSelectedOrder(order)
    setDetailOpen(true)
  }

  const handleRepeatOrder = (order: CustomerOrder) => {
    // In a real app, this would add items to cart
    console.log("Repeating order:", order.orderNumber)
    alert(`Productos de ${order.orderNumber} agregados al carrito`)
  }

  return (
    <div className="min-h-screen bg-background">
      <CatalogNavbar cartCount={3} />
      
      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
            <Package className="h-7 w-7 text-primary" />
            Mis Pedidos
          </h1>
          <p className="text-muted-foreground mt-1">
            Revisa el historial de tus compras y repite tus pedidos favoritos
          </p>
        </div>

        {/* Filters */}
        <OrderHistoryFilters
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
        />

        {/* Orders List */}
        <div className="mt-6 space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-16 bg-card rounded-xl border">
              <Package className="h-16 w-16 mx-auto text-muted-foreground/40" />
              <h3 className="mt-4 text-lg font-medium text-foreground">
                No se encontraron pedidos
              </h3>
              <p className="mt-2 text-muted-foreground">
                {statusFilter !== "todos" || dateRange.from || dateRange.to
                  ? "Prueba ajustando los filtros de búsqueda"
                  : "Aún no has realizado ningún pedido"}
              </p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <OrderHistoryCard
                key={order.id}
                order={order}
                onViewDetail={() => handleViewDetail(order)}
                onRepeatOrder={() => handleRepeatOrder(order)}
              />
            ))
          )}
        </div>

        {/* Order count */}
        {filteredOrders.length > 0 && (
          <p className="text-center text-sm text-muted-foreground mt-6">
            Mostrando {filteredOrders.length} de {orders.length} pedidos
          </p>
        )}
      </main>

      {/* Order Detail Dialog */}
      <OrderHistoryDetailDialog
        order={selectedOrder}
        open={detailOpen}
        onOpenChange={setDetailOpen}
      />
    </div>
  )
}
