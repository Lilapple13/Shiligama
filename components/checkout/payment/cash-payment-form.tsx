"use client"

import { useState, useMemo } from "react"
import { Banknote, Coins, Calculator, CheckCircle2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface CashPaymentFormProps {
  total: number
}

const quickAmounts = [20, 50, 100, 200]

export function CashPaymentForm({ total }: CashPaymentFormProps) {
  const [cashAmount, setCashAmount] = useState("")

  const cashValue = parseFloat(cashAmount) || 0
  const change = useMemo(() => {
    return cashValue >= total ? cashValue - total : 0
  }, [cashValue, total])

  const isExact = cashValue === total
  const hasEnough = cashValue >= total

  return (
    <div className="space-y-6">
      {/* Cash Header */}
      <div className="flex items-center gap-3 pb-4 border-b">
        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center shadow-lg">
          <Banknote className="h-6 w-6 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Pago en Efectivo</h3>
          <p className="text-xs text-muted-foreground">
            Calcula tu vuelto antes de pagar
          </p>
        </div>
      </div>

      {/* Amount Due */}
      <div className="text-center p-6 bg-secondary/50 rounded-xl">
        <p className="text-sm text-muted-foreground mb-1">Total a pagar</p>
        <p className="text-4xl font-bold text-primary">
          S/. {total.toFixed(2)}
        </p>
      </div>

      {/* Quick Amount Buttons */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Monto rápido</Label>
        <div className="grid grid-cols-4 gap-2">
          {quickAmounts.map((amount) => (
            <button
              key={amount}
              type="button"
              onClick={() => setCashAmount(amount.toString())}
              className={cn(
                "h-12 rounded-lg border-2 font-semibold transition-all",
                cashAmount === amount.toString()
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card hover:border-primary/50 text-foreground"
              )}
            >
              S/. {amount}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Amount Input */}
      <div className="space-y-2">
        <Label htmlFor="cashAmount" className="text-sm font-medium">
          O ingresa el monto con el que pagarás
        </Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
            S/.
          </span>
          <Input
            id="cashAmount"
            type="number"
            placeholder="0.00"
            value={cashAmount}
            onChange={(e) => setCashAmount(e.target.value)}
            className="pl-11 h-14 text-2xl font-bold text-center"
            step="0.10"
            min="0"
          />
        </div>
      </div>

      {/* Change Calculator */}
      <div
        className={cn(
          "p-6 rounded-xl border-2 transition-all",
          hasEnough
            ? isExact
              ? "border-primary bg-primary/5"
              : "border-green-500 bg-green-50"
            : cashValue > 0
            ? "border-amber-500 bg-amber-50"
            : "border-border bg-secondary/30"
        )}
      >
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "h-12 w-12 rounded-full flex items-center justify-center",
              hasEnough
                ? isExact
                  ? "bg-primary/20"
                  : "bg-green-100"
                : cashValue > 0
                ? "bg-amber-100"
                : "bg-muted"
            )}
          >
            {hasEnough ? (
              isExact ? (
                <CheckCircle2 className="h-6 w-6 text-primary" />
              ) : (
                <Coins className="h-6 w-6 text-green-600" />
              )
            ) : (
              <Calculator className="h-6 w-6 text-muted-foreground" />
            )}
          </div>
          <div className="flex-1">
            {!cashValue || cashValue === 0 ? (
              <>
                <p className="text-sm text-muted-foreground">Tu vuelto</p>
                <p className="text-xl font-bold text-muted-foreground">
                  Ingresa un monto
                </p>
              </>
            ) : hasEnough ? (
              isExact ? (
                <>
                  <p className="text-sm text-primary font-medium">
                    Monto exacto
                  </p>
                  <p className="text-xl font-bold text-primary">
                    No hay vuelto
                  </p>
                </>
              ) : (
                <>
                  <p className="text-sm text-green-700 font-medium">
                    Tu vuelto será
                  </p>
                  <p className="text-3xl font-bold text-green-700">
                    S/. {change.toFixed(2)}
                  </p>
                </>
              )
            ) : (
              <>
                <p className="text-sm text-amber-700 font-medium">
                  Falta por pagar
                </p>
                <p className="text-xl font-bold text-amber-700">
                  S/. {(total - cashValue).toFixed(2)}
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Info Note */}
      <div className="flex items-start gap-3 p-4 bg-secondary/50 rounded-lg">
        <Banknote className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
        <div className="text-sm text-muted-foreground">
          <p className="font-medium text-foreground mb-1">Pago contra entrega</p>
          <p>
            El repartidor llevará el vuelto exacto. Por favor ten el dinero listo
            para agilizar la entrega.
          </p>
        </div>
      </div>
    </div>
  )
}
