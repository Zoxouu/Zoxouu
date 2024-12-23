"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, Gamepad2 } from 'lucide-react'
import Link from "next/link"

const projects = [
  {
    title: "Projet Alpha",
    description: "Une application cloud-native avec architecture microservices",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Kubernetes", "React", "Node.js", "AWS"],
    github: "#",
    demo: "#",
  },
  {
    title: "Projet Beta",
    description: "Système de déploiement continu automatisé",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Docker", "Jenkins", "Python", "Terraform"],
    github: "#",
    demo: "#",
  },
  {
    title: "Projet Gamma",
    description: "Plateforme de monitoring temps réel",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Grafana", "Prometheus", "Go", "PostgreSQL"],
    github: "#",
    demo: "#",
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function ProjectsPage() {
  return (
    <div className="container mx-auto min-h-screen px-4 pt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center space-y-4 text-center"
      >
        <Badge className="mb-4" variant="outline">
          <Gamepad2 className="mr-2 h-4 w-4" />
          Projets
        </Badge>
        <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl">
          Mes Créations
        </h1>
        <p className="max-w-[900px] text-gray-500 md:text-xl dark:text-gray-400">
          Découvrez mes projets les plus innovants en développement et infrastructure
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((project) => (
          <motion.div
            key={project.title}
            variants={item}
            className="group relative overflow-hidden rounded-lg border bg-background"
          >
            <div className="aspect-video overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                width={600}
                height={400}
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="relative space-y-4 p-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight">{project.title}</h2>
                <p className="text-gray-500 dark:text-gray-400">{project.description}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex gap-4 pt-4">
                <Link href={project.github}>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Github className="h-4 w-4" />
                    Code
                  </Button>
                </Link>
                <Link href={project.demo}>
                  <Button variant="outline" size="sm" className="gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Demo
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

