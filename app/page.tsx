"use client"

import { useState } from "react"
import { LoginForm } from "@/components/auth/login-form"
import { RegisterForm } from "@/components/auth/register-form"
import { BrandedPanel } from "@/components/auth/branded-panel"

export default function AuthPage() {
  const [showRegister, setShowRegister] = useState(false)

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left branded panel */}
      <BrandedPanel />

      {/* Right auth panel */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-background">
        <div className="w-full max-w-md">
          {showRegister ? (
            <RegisterForm onBackToLogin={() => setShowRegister(false)} />
          ) : (
            <LoginForm onRegisterClick={() => setShowRegister(true)} />
          )}
        </div>
      </div>
    </div>
  )
}
