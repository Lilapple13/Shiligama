"use client"

import { useState } from "react"
import { Mail, Lock, Eye, EyeOff, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

type Role = "cliente" | "trabajador" | "administrador"

interface LoginFormProps {
  onRegisterClick: () => void
}

export function LoginForm({ onRegisterClick }: LoginFormProps) {
  const [selectedRole, setSelectedRole] = useState<Role>("cliente")
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)

  const roles: { key: Role; label: string }[] = [
    { key: "cliente", label: "Cliente" },
    { key: "trabajador", label: "Trabajador" },
    { key: "administrador", label: "Administrador" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Login attempt:", { email, selectedRole, rememberMe })
  }

  return (
    <div className="space-y-8">
      {/* Mobile logo */}
      <div className="flex items-center gap-3 lg:hidden">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
          <ShoppingCart className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Shiligama</h1>
          <p className="text-muted-foreground text-sm">Sistema de Gestión</p>
        </div>
      </div>

      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-foreground">
          Bienvenido de nuevo
        </h2>
        <p className="text-muted-foreground mt-1">
          Ingresa tus credenciales para acceder al sistema
        </p>
      </div>

      {/* Role selector tabs */}
      <div className="bg-muted p-1 rounded-xl flex gap-1">
        {roles.map((role) => (
          <button
            key={role.key}
            onClick={() => setSelectedRole(role.key)}
            className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
              selectedRole === role.key
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/80"
            }`}
          >
            {role.label}
          </button>
        ))}
      </div>

      {/* Login form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-foreground font-medium">
            Correo electrónico
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="tu@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 h-12 bg-card border-border focus:border-primary focus:ring-primary"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-foreground font-medium">
            Contraseña
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 pr-10 h-12 bg-card border-border focus:border-primary focus:ring-primary"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
            <Label
              htmlFor="remember"
              className="text-sm text-muted-foreground cursor-pointer"
            >
              Recordarme
            </Label>
          </div>
          <a
            href="#"
            className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
          >
            ¿Olvidaste tu contraseña?
          </a>
        </div>

        <Button
          type="submit"
          className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-base"
        >
          Iniciar sesión
        </Button>
      </form>

      {/* Register link */}
      <div className="text-center">
        <p className="text-muted-foreground">
          ¿No tienes una cuenta?{" "}
          <button
            onClick={onRegisterClick}
            className="text-primary hover:text-primary/80 font-medium transition-colors"
          >
            Regístrate aquí
          </button>
        </p>
      </div>
    </div>
  )
}
