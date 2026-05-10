"use client"

import { Minus, Plus, Trash2, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { CartItem } from "@/app/checkout/page"

interface CartListProps {
  items: CartItem[]
  onUpdateQuantity: (id: number, quantity: number) => void
  onRemoveItem: (id: number) => void
}

export function CartList({ items, onUpdateQuantity, onRemoveItem }: CartListProps) {
  const lowStockItems = items.filter((item) => item.stock <= 5)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">
          Carrito de compras
        </h2>
        <span className="text-sm text-muted-foreground">
          {items.length} {items.length === 1 ? "producto" : "productos"}
        </span>
      </div>

      {/* Low Stock Warning */}
      {lowStockItems.length > 0 && (
        <Alert className="border-amber-500/50 bg-amber-50 dark:bg-amber-950/20">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800 dark:text-amber-200">
            <span className="font-medium">Stock limitado:</span>{" "}
            {lowStockItems.map((item, i) => (
              <span key={item.id}>
                {item.name} (quedan {item.stock})
                {i < lowStockItems.length - 1 ? ", " : ""}
              </span>
            ))}
          </AlertDescription>
        </Alert>
      )}

      {/* Cart Items */}
      <div className="space-y-4">
        {items.map((item) => (
          <CartItemRow
            key={item.id}
            item={item}
            onUpdateQuantity={onUpdateQuantity}
            onRemoveItem={onRemoveItem}
          />
        ))}
      </div>
    </div>
  )
}

interface CartItemRowProps {
  item: CartItem
  onUpdateQuantity: (id: number, quantity: number) => void
  onRemoveItem: (id: number) => void
}

function CartItemRow({ item, onUpdateQuantity, onRemoveItem }: CartItemRowProps) {
  const subtotal = item.price * item.quantity
  const isLowStock = item.stock <= 5
  const isAtMaxStock = item.quantity >= item.stock

  return (
    <div className="flex gap-4 rounded-xl border bg-card p-4 shadow-sm transition-shadow hover:shadow-md">
      {/* Product Image */}
      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-secondary/30 sm:h-24 sm:w-24">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover"
        />
        {isLowStock && (
          <div className="absolute top-1 right-1">
            <Badge
              variant="secondary"
              className="bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200 text-[10px] px-1.5"
            >
              Quedan {item.stock}
            </Badge>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex flex-1 flex-col justify-between min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h3 className="font-medium text-foreground line-clamp-2 text-sm sm:text-base">
              {item.name}
            </h3>
            <p className="mt-0.5 text-sm text-muted-foreground">
              S/. {item.price.toFixed(2)} c/u
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive flex-shrink-0"
            onClick={() => onRemoveItem(item.id)}
            aria-label={`Eliminar ${item.name} del carrito`}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Quantity and Subtotal */}
        <div className="mt-3 flex items-center justify-between">
          {/* Quantity Selector */}
          <div className="flex items-center gap-1 rounded-lg border bg-background p-0.5">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
              aria-label="Reducir cantidad"
            >
              <Minus className="h-3.5 w-3.5" />
            </Button>
            <span className="w-10 text-center font-medium text-foreground">
              {item.quantity}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              disabled={isAtMaxStock}
              aria-label="Aumentar cantidad"
            >
              <Plus className="h-3.5 w-3.5" />
            </Button>
          </div>

          {/* Subtotal */}
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Subtotal</p>
            <p className="text-lg font-bold text-primary">
              S/. {subtotal.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
