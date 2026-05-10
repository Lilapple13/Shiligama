"use client"

import { useState } from "react"
import { CreditCard, User, Calendar, Lock, HelpCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function CardPaymentForm() {
  const [cardNumber, setCardNumber] = useState("")
  const [cardName, setCardName] = useState("")
  const [expiry, setExpiry] = useState("")
  const [cvv, setCvv] = useState("")

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4)
    }
    return v
  }

  const getCardType = (number: string) => {
    const clean = number.replace(/\s/g, "")
    if (clean.startsWith("4")) return "visa"
    if (/^5[1-5]/.test(clean) || /^2[2-7]/.test(clean)) return "mastercard"
    if (clean.startsWith("3")) return "amex"
    return null
  }

  const cardType = getCardType(cardNumber)

  return (
    <div className="space-y-6">
      {/* Mercado Pago Header */}
      <div className="flex items-center justify-between pb-4 border-b">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-[#009EE3] flex items-center justify-center">
            <span className="text-white font-bold text-xs">MP</span>
          </div>
          <span className="text-sm font-medium text-muted-foreground">
            Procesado por Mercado Pago
          </span>
        </div>
        <div className="flex items-center gap-2">
          {cardType === "visa" && (
            <div className="h-8 w-12 bg-white border rounded flex items-center justify-center">
              <span className="text-[#1A1F71] font-bold text-xs italic">VISA</span>
            </div>
          )}
          {cardType === "mastercard" && (
            <div className="h-8 w-12 bg-white border rounded flex items-center justify-center">
              <div className="flex">
                <div className="h-4 w-4 rounded-full bg-red-500 -mr-1.5" />
                <div className="h-4 w-4 rounded-full bg-yellow-500" />
              </div>
            </div>
          )}
          {!cardType && (
            <div className="flex gap-1">
              <div className="h-6 w-9 bg-muted rounded" />
              <div className="h-6 w-9 bg-muted rounded" />
            </div>
          )}
        </div>
      </div>

      {/* Card Number */}
      <div className="space-y-2">
        <Label htmlFor="cardNumber" className="text-sm font-medium">
          Número de tarjeta
        </Label>
        <div className="relative">
          <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            id="cardNumber"
            placeholder="1234 5678 9012 3456"
            value={cardNumber}
            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
            maxLength={19}
            className="pl-11 h-12 text-base font-mono tracking-wider"
          />
        </div>
      </div>

      {/* Card Holder Name */}
      <div className="space-y-2">
        <Label htmlFor="cardName" className="text-sm font-medium">
          Nombre del titular
        </Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            id="cardName"
            placeholder="Como aparece en la tarjeta"
            value={cardName}
            onChange={(e) => setCardName(e.target.value.toUpperCase())}
            className="pl-11 h-12 text-base uppercase"
          />
        </div>
      </div>

      {/* Expiry and CVV */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="expiry" className="text-sm font-medium">
            Vencimiento
          </Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              id="expiry"
              placeholder="MM/AA"
              value={expiry}
              onChange={(e) => setExpiry(formatExpiry(e.target.value))}
              maxLength={5}
              className="pl-11 h-12 text-base font-mono"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="cvv" className="text-sm font-medium flex items-center gap-1">
            CVV
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">
                    Los 3 dígitos en el reverso de tu tarjeta
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              id="cvv"
              type="password"
              placeholder="•••"
              value={cvv}
              onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
              maxLength={4}
              className="pl-11 h-12 text-base font-mono tracking-widest"
            />
          </div>
        </div>
      </div>

      {/* Security Note */}
      <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg border border-primary/10">
        <Lock className="h-4 w-4 text-primary shrink-0" />
        <p className="text-xs text-muted-foreground">
          Tu información de pago está encriptada y segura. Nunca almacenamos los datos de tu tarjeta.
        </p>
      </div>
    </div>
  )
}
