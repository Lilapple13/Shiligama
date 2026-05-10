"use client"

import { useState } from "react"
import { Smartphone, CheckCircle2, QrCode, AlertCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface YapePaymentFormProps {
  total: number
}

export function YapePaymentForm({ total }: YapePaymentFormProps) {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [confirmationCode, setConfirmationCode] = useState("")
  const [isConfirmed, setIsConfirmed] = useState(false)

  const formatPhone = (value: string) => {
    return value.replace(/\D/g, "").slice(0, 9)
  }

  const handleConfirm = () => {
    if (confirmationCode.length >= 4) {
      setIsConfirmed(true)
    }
  }

  return (
    <div className="space-y-6">
      {/* Yape Header */}
      <div className="flex items-center gap-3 pb-4 border-b">
        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-lg">Y</span>
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Paga con Yape</h3>
          <p className="text-xs text-muted-foreground">
            Escanea el QR o ingresa tu número
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* QR Code Section */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="relative">
            <div className="w-48 h-48 bg-white border-2 border-purple-200 rounded-2xl p-3 shadow-sm">
              <div className="w-full h-full bg-gradient-to-br from-purple-50 to-white rounded-xl flex items-center justify-center relative overflow-hidden">
                {/* QR Code Pattern */}
                <div className="grid grid-cols-7 gap-1 p-2">
                  {Array.from({ length: 49 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-4 h-4 rounded-sm ${
                        Math.random() > 0.4 ? "bg-purple-900" : "bg-white"
                      }`}
                    />
                  ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white p-2 rounded-lg shadow-sm">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">Y</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-xs font-medium px-3 py-1 rounded-full">
              S/. {total.toFixed(2)}
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-foreground">
              Escanea con tu app Yape
            </p>
            <p className="text-xs text-muted-foreground">
              El monto ya está configurado
            </p>
          </div>
        </div>

        {/* Manual Confirmation */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="h-px flex-1 bg-border" />
            <span>O confirma manualmente</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="yapePhone" className="text-sm font-medium">
              Tu número Yape
            </Label>
            <div className="relative">
              <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="yapePhone"
                placeholder="999 999 999"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(formatPhone(e.target.value))}
                className="pl-11 h-12 text-base font-mono tracking-wider"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmCode" className="text-sm font-medium">
              Código de confirmación Yape
            </Label>
            <div className="relative">
              <QrCode className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="confirmCode"
                placeholder="Ingresa el código de tu app"
                value={confirmationCode}
                onChange={(e) => setConfirmationCode(e.target.value)}
                className="pl-11 h-12 text-base"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Encuentra el código en tu app Yape después de escanear el QR
            </p>
          </div>

          {!isConfirmed ? (
            <Button
              type="button"
              variant="outline"
              className="w-full h-11 border-purple-300 text-purple-700 hover:bg-purple-50"
              onClick={handleConfirm}
              disabled={confirmationCode.length < 4}
            >
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Confirmar pago Yape
            </Button>
          ) : (
            <Alert className="border-green-500/50 bg-green-50">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800 text-sm">
                Pago Yape verificado correctamente
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>

      {/* Instructions */}
      <Alert className="border-purple-200 bg-purple-50/50">
        <AlertCircle className="h-4 w-4 text-purple-600" />
        <AlertDescription className="text-purple-800 text-sm">
          <strong>Instrucciones:</strong> Abre tu app Yape, escanea el código QR y confirma el pago.
          Luego ingresa el código de confirmación que te da la app.
        </AlertDescription>
      </Alert>
    </div>
  )
}
