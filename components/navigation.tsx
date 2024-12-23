"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { MoonIcon, SunIcon, Menu} from 'lucide-react'
import { useTheme } from "next-themes"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const menuItems = [
  { href: "/", label: "Accueil" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projets" },
  { href: "#avis", label: "Avis" },
]

export function Navigation() {
  const { setTheme, theme } = useTheme()
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 z-50 w-full border-b bg-background/80 backdrop-blur-lg"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
      <Link href="/" className="flex items-center space-x-2">
        <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
        >
        </motion.div>
      </Link>

      <nav className="hidden md:flex md:space-x-4">
        {menuItems.map((item, index) => (
        <motion.div
          key={item.href}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Link
          href={item.href}
          className={cn(
            "relative px-4 py-2 text-sm font-medium transition-colors hover:text-purple-500",
            "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-purple-500 after:transition-transform hover:after:scale-x-100"
          )}
          >
          {item.label}
          </Link>
        </motion.div>
        ))}
      </nav>

      <div className="flex items-center space-x-4">
        <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="relative overflow-hidden"
        >
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: theme === "dark" ? 360 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <SunIcon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute top-1/2 left-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </motion.div>
        </Button>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-full sm:w-[300px]">
          <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <nav className="mt-8 flex flex-col space-y-4">
          {menuItems.map((item) => (
            <Link
            key={item.href}
            href={item.href}
            onClick={() => setIsOpen(false)}
            className="text-lg font-medium transition-colors hover:text-purple-500"
            >
            {item.label}
            </Link>
          ))}
          </nav>
        </SheetContent>
        </Sheet>
      </div>
      </div>
    </motion.header>
  )
}

