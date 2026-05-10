"use client"

import { 
  Package, 
  Wine, 
  Milk, 
  Cookie, 
  SprayCan, 
  Beef, 
  Apple, 
  Candy,
  Snowflake,
  Baby
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"

const categories = [
  { id: "abarrotes", name: "Abarrotes", icon: Package },
  { id: "bebidas", name: "Bebidas", icon: Wine },
  { id: "lacteos", name: "Lacteos", icon: Milk },
  { id: "snacks", name: "Snacks", icon: Cookie },
  { id: "limpieza", name: "Limpieza", icon: SprayCan },
  { id: "carnes", name: "Carnes y Embutidos", icon: Beef },
  { id: "frutas", name: "Frutas y Verduras", icon: Apple },
  { id: "dulces", name: "Dulces y Golosinas", icon: Candy },
  { id: "congelados", name: "Congelados", icon: Snowflake },
  { id: "bebes", name: "Bebes", icon: Baby },
]

interface CategorySidebarProps {
  selectedCategory: string | null
  onCategoryChange: (category: string | null) => void
  priceRange: [number, number]
  onPriceRangeChange: (range: [number, number]) => void
}

export function CategorySidebar({
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
}: CategorySidebarProps) {
  return (
    <div className="space-y-6">
      {/* Categories */}
      <div className="rounded-xl bg-card p-4 shadow-sm border">
        <h3 className="mb-4 text-sm font-semibold text-foreground uppercase tracking-wide">
          Categorias
        </h3>
        <nav className="space-y-1">
          <button
            onClick={() => onCategoryChange(null)}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              selectedCategory === null
                ? "bg-primary text-primary-foreground"
                : "text-foreground hover:bg-secondary"
            )}
          >
            <Package className="h-4 w-4" />
            Todos los productos
          </button>
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  selectedCategory === category.id
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-secondary"
                )}
              >
                <Icon className="h-4 w-4" />
                {category.name}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Price Range */}
      <div className="rounded-xl bg-card p-4 shadow-sm border">
        <h3 className="mb-4 text-sm font-semibold text-foreground uppercase tracking-wide">
          Rango de Precio
        </h3>
        <div className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={(value) => onPriceRangeChange(value as [number, number])}
            min={0}
            max={100}
            step={1}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm">
            <div className="rounded-md bg-secondary px-3 py-1.5 font-medium text-secondary-foreground">
              S/. {priceRange[0]}
            </div>
            <span className="text-muted-foreground">-</span>
            <div className="rounded-md bg-secondary px-3 py-1.5 font-medium text-secondary-foreground">
              S/. {priceRange[1]}
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={() => onPriceRangeChange([0, 100])}
          >
            Limpiar filtros
          </Button>
        </div>
      </div>
    </div>
  )
}
