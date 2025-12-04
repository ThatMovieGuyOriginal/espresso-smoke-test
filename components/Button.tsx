"use client"

import Link from "next/link"

interface ButtonProps {
  href?: string
  onClick?: () => void
  children: React.ReactNode
  variant?: "primary" | "secondary"
  size?: "sm" | "md" | "lg"
  className?: string
  disabled?: boolean
}

export function Button({
  href,
  onClick,
  children,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
}: ButtonProps) {
  const baseClasses =
    "font-bold rounded-md uppercase tracking-wider transition-all duration-200 inline-block text-center"

  const variantClasses = {
    primary:
      "bg-accent-orange text-black hover:bg-accent-orange-hover hover:scale-105 active:scale-95",
    secondary:
      "bg-dark-surface text-text-primary border border-dark-border hover:border-accent-orange",
  }

  const sizeClasses = {
    sm: "py-2 px-4 text-sm",
    md: "py-3 px-6 text-base",
    lg: "py-4 px-8 text-lg",
  }

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className} ${
    disabled ? "opacity-50 cursor-not-allowed" : ""
  }`

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    )
  }

  return (
    <button onClick={onClick} className={classes} disabled={disabled}>
      {children}
    </button>
  )
}
