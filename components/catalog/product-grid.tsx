"use client"

import { useMemo } from "react"
import { ShoppingCart, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  stock: number
  isPromo?: boolean
}

const products: Product[] = [
  {
    id: 1,
    name: "Arroz Extra Costeño 5kg",
    price: 24.90,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=300&fit=crop",
    category: "abarrotes",
    stock: 45,
  },
  {
    id: 2,
    name: "Aceite Primor 1L",
    price: 12.50,
    originalPrice: 15.90,
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=300&fit=crop",
    category: "abarrotes",
    stock: 32,
    isPromo: true,
  },
  {
    id: 3,
    name: "Inca Kola 1.5L",
    price: 6.50,
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=300&h=300&fit=crop",
    category: "bebidas",
    stock: 78,
  },
  {
    id: 4,
    name: "Leche Gloria Entera 1L",
    price: 5.20,
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&h=300&fit=crop",
    category: "lacteos",
    stock: 120,
  },
  {
    id: 5,
    name: "Yogurt Laive Fresa 1L",
    price: 8.90,
    originalPrice: 10.50,
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300&h=300&fit=crop",
    category: "lacteos",
    stock: 25,
    isPromo: true,
  },
  {
    id: 6,
    name: "Galletas Oreo x6",
    price: 4.50,
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&h=300&fit=crop",
    category: "snacks",
    stock: 65,
  },
  {
    id: 7,
    name: "Detergente Bolivar 2.6kg",
    price: 28.90,
    image: "https://images.unsplash.com/photo-1585441695325-21557f37a1b3?w=300&h=300&fit=crop",
    category: "limpieza",
    stock: 18,
  },
  {
    id: 8,
    name: "Jabon Bolivar Pack x3",
    price: 9.90,
    originalPrice: 12.90,
    image: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=300&h=300&fit=crop",
    category: "limpieza",
    stock: 42,
    isPromo: true,
  },
  {
    id: 9,
    name: "Pechuga de Pollo 1kg",
    price: 16.90,
    image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=300&h=300&fit=crop",
    category: "carnes",
    stock: 8,
  },
  {
    id: 10,
    name: "Manzana Roja 1kg",
    price: 5.90,
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300&h=300&fit=crop",
    category: "frutas",
    stock: 35,
  },
  {
    id: 11,
    name: "Platano de Seda 1kg",
    price: 3.50,
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&h=300&fit=crop",
    category: "frutas",
    stock: 50,
  },
  {
    id: 12,
    name: "Chocolate Sublime x6",
    price: 7.90,
    image: "https://images.unsplash.com/photo-1511381939415-e44015466834?w=300&h=300&fit=crop",
    category: "dulces",
    stock: 88,
  },
  {
    id: 13,
    name: "Helado Donofrio 1L",
    price: 18.90,
    originalPrice: 22.90,
    image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=300&h=300&fit=crop",
    category: "congelados",
    stock: 12,
    isPromo: true,
  },
  {
    id: 14,
    name: "Pañales Huggies M x40",
    price: 45.90,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=300&fit=crop",
    category: "bebes",
    stock: 15,
  },
  {
    id: 15,
    name: "Agua San Luis 2.5L",
    price: 3.20,
    image: "https://images.unsplash.com/photo-1560023907-5f339617ea55?w=300&h=300&fit=crop",
    category: "bebidas",
    stock: 200,
  },
  {
    id: 16,
    name: "Papas Lays Original 150g",
    price: 6.90,
    image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=300&h=300&fit=crop",
    category: "snacks",
    stock: 0,
  },
]

interface ProductGridProps {
  selectedCategory: string | null
  priceRange: [number, number]
  onAddToCart: () => void
}

export function ProductGrid({
  selectedCategory,
  priceRange,
  onAddToCart,
}: ProductGridProps) {
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = !selectedCategory || product.category === selectedCategory
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
      return matchesCategory && matchesPrice
    })
  }, [selectedCategory, priceRange])

  const getStockBadge = (stock: number) => {
    if (stock === 0) {
      return { label: "Agotado", variant: "destructive" as const }
    }
    if (stock <= 10) {
      return { label: `Quedan ${stock}`, variant: "secondary" as const }
    }
    return { label: "En stock", variant: "default" as const }
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            {selectedCategory
              ? products.find((p) => p.category === selectedCategory)?.category
                  .charAt(0)
                  .toUpperCase() +
                (products.find((p) => p.category === selectedCategory)?.category.slice(1) || "")
              : "Todos los productos"}
          </h2>
          <p className="text-sm text-muted-foreground">
            {filteredProducts.length} productos encontrados
          </p>
        </div>
      </div>

      {/* Grid */}
      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <ShoppingCart className="h-16 w-16 text-muted-foreground/50 mb-4" />
          <h3 className="text-lg font-medium text-foreground">No hay productos</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Intenta ajustar los filtros para ver mas productos
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => {
            const stockInfo = getStockBadge(product.stock)
            const isOutOfStock = product.stock === 0

            return (
              <div
                key={product.id}
                className={cn(
                  "group relative flex flex-col overflow-hidden rounded-xl bg-card border shadow-sm transition-all duration-300 hover:shadow-md",
                  isOutOfStock && "opacity-75"
                )}
              >
                {/* Promo Badge */}
                {product.isPromo && (
                  <div className="absolute top-2 left-2 z-10">
                    <Badge className="bg-destructive text-white font-semibold">
                      Oferta
                    </Badge>
                  </div>
                )}

                {/* Image */}
                <div className="relative aspect-square overflow-hidden bg-secondary/30">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {isOutOfStock && (
                    <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm">
                      <span className="font-semibold text-foreground">Agotado</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-3 sm:p-4">
                  {/* Stock Badge */}
                  <Badge
                    variant={stockInfo.variant}
                    className={cn(
                      "mb-2 w-fit text-xs",
                      stockInfo.variant === "default" && "bg-primary/10 text-primary border-0"
                    )}
                  >
                    {stockInfo.label}
                  </Badge>

                  {/* Name */}
                  <h3 className="mb-2 text-sm font-medium text-foreground line-clamp-2 leading-snug">
                    {product.name}
                  </h3>

                  {/* Price */}
                  <div className="mt-auto flex items-baseline gap-2">
                    <span className="text-lg font-bold text-primary">
                      S/. {product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        S/. {product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  {/* Add to Cart */}
                  <Button
                    className="mt-3 w-full gap-2"
                    size="sm"
                    disabled={isOutOfStock}
                    onClick={onAddToCart}
                  >
                    <Plus className="h-4 w-4" />
                    <span className="hidden sm:inline">Agregar</span>
                    <span className="sm:hidden">Agregar</span>
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
