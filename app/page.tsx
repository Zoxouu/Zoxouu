"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import Avis from "@/components/avissection"
import { Github, Linkedin, Twitter, Mail, ExternalLink, Code, Server, Database, ArrowRight, GraduationCap } from 'lucide-react'
import Link from "next/link"

const skillsData = [
  { icon: Code, title: "Développement Web", items: [{ name: "Java", level: 80 }, { name: "Python", level: 40 }, { name: "C#", level: 30 }, { name: "React", level: 50 }] },
  { icon: Server, title: "Administration Système", items: [{ name: "Linux", level: 75 }, { name: "Docker", level: 40 }, { name: "Proxmox", level: 50 }, { name: "Nginx", level: 70 }] },
  { icon: Database, title: "Database", items: [{ name: "Redis", level: 60 }, { name: "Mongo", level: 85 }, { name: "PostgreSQL", level: 40 }, { name: "MySQL", level: 40 }] },
];

const projects = [
  {
    title: "NimeliaMC",
    description: "Server Minecraft mini-jeux (Fermer).",
    image: "/NIcon.png?height=400&width=600",
    tags: ["Minecraft", "MongoDB", "Redis", "Java", "Linux"],
    github: "https://github.com/NimeliaMC",
    demo: "null",
  },
  {
    title: "LZCorp",
    description: "LZCorp est une agence de freelancers (Plusieurs domaines).",
    image: "/LZIcon.png?height=400&width=600",
    tags: ["React", "Java", "Gestion-Staff"],
    github: "#",
    demo: "lzcorp.fr",
  },
  {
    title: "FreshPerf",
    description: "Plateforme de monitoring temps réel",
    image: "/FIcon.png?height=400&width=600",
    tags: ["Minecraft", "Java", "Redis", "PostgreSQL", "React", "Linux"],
    github: "https://github.com/FreshPerf",
    demo: "freshperf.fr",
  },
]

const education = [
  {
    degree: "Baccalauréat Systèmes numériques",
    school: "SEPR Lyon",
    year: "2020-2023",
    description: "Option C : réseaux informatiques et systèmes communicants (RISC)"
  },
  {
    degree: "DEP Soutien informatique",
    school: "CFP Léonard-De Vinci Montréal ",
    year: "2023 - 2025",
    description: "Diplôme d’études professionnelles"
  }
]


export default function Home() {
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0])

  const [githubStats, setGithubStats] = useState({ stars: 0, repos: 0, followers: 0 })

  useEffect(() => {
    fetch("https://api.github.com/users/Zoxouu")
      .then(response => response.json())
      .then(data => {
        setGithubStats({
          stars: data.public_gists, // Using public_gists as a placeholder for stars
          repos: data.public_repos,
          followers: data.followers
        })
      })
  }, [])

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="relative">
      {/* Hero Section */}
      <section ref={targetRef} className="relative min-h-screen bg-gradient-to-b from-purple-900 to-background pt-20">
        <motion.div
          style={{ y, opacity }}
          className="container relative z-10 flex min-h-screen flex-col items-center justify-center px-4"
        >
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="flex flex-col justify-center space-y-8">
              <div className="space-y-4">
                <motion.h1
                  initial="hidden"
                  animate="visible"
                  variants={fadeInUpVariants}
                  transition={{ delay: 0.2 }}
                  className="text-4xl font-bold tracking-tighter sm:text-6xl xl:text-7xl/none"
                >
                  Développeur & <span className="text-purple-400">Admin Sys</span>
                </motion.h1>
                <motion.p
                  initial="hidden"
                  animate="visible"
                  variants={fadeInUpVariants}
                  transition={{ delay: 0.4 }}
                  className="max-w-[600px] text-gray-200 md:text-xl"
                >
                  Passionné par le développement et l&apos;administration système, je transforme des idées complexes en solutions numériques innovantes.
                </motion.p>
              </div>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUpVariants}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <Button asChild className="bg-purple-600 hover:bg-purple-700">
                  <Link href="https://discord.zoxouu.me">
                    Me contacter
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-purple-400 text-purple-400 hover:bg-purple-400/10">
                  <Link href="#projects">
                    Voir mes projets
                  </Link>
                </Button>
              </motion.div>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUpVariants}
                transition={{ delay: 0.8 }}
                className="flex space-x-4"
              >
                <Link href="https://github.com/Zoxouu" target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="icon" className="text-purple-400 hover:text-purple-300">
                    <Github className="h-6 w-6" />
                  </Button>
                </Link>
                <Link href="https://linkedin.com/in/Zoxouu" target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="icon" className="text-purple-400 hover:text-purple-300">
                    <Linkedin className="h-6 w-6" />
                  </Button>
                </Link>
                <Link href="https://twitter.com/Zoxouu" target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="icon" className="text-purple-400 hover:text-purple-300">
                    <Twitter className="h-6 w-6" />
                  </Button>
                </Link>
                <Link href="mailto:your@email.com">
                  <Button variant="ghost" size="icon" className="text-purple-400 hover:text-purple-300">
                    <Mail className="h-6 w-6" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Mon Parcours</h2>

          <div className="space-y-8">
            {education.map((item, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUpVariants}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <GraduationCap className="h-6 w-6 mr-2 text-purple-600" />
                      <h3 className="text-xl font-semibold">{item.degree}</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">{item.school}</p>
                    <p className="text-sm text-gray-500">{item.year}</p>
                    <p className="mt-2">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <br />
        <br />
        <br />
        <br />

        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Mes Compétences</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {skillsData.map((category, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUpVariants}
                transition={{ delay: index * 0.1 }}
              >
                <div className="card overflow-hidden">
                  <div className="card-content p-6">
                    <category.icon className="h-12 w-12 mb-4 text-purple-600 mx-auto" />
                    <h3 className="text-xl font-semibold mb-2 text-center">{category.title}</h3>
                    <ul className="space-y-2">
                      {category.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center">
                          <Badge variant="outline" className="mr-2">{item.name}</Badge>
                          <Progress value={item.level} className="h-2 flex-grow" />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <br />
        <br />

        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { label: "Stars", value: githubStats.stars, icon: Github },
              { label: "Repos", value: githubStats.repos, icon: Database },
              { label: "Followers", value: githubStats.followers, icon: Github },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUpVariants}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="flex flex-col items-center p-6">
                    <stat.icon className="h-12 w-12 mb-4 text-purple-600" />
                    <h3 className="text-2xl font-bold">{stat.value}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

      </section>

      <div className="relative min-h-screen bg-gradient-to-t from-purple-900 to-background pt-20">
        <div className="container mx-auto px-4">
          {/* Projects Section */}
          <section id="projects" className="py-20">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8 text-center">Mes Projets</h2>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project, index) => (
                  <motion.div
                    key={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUpVariants}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden">
                      <div className="flex justify-center mt-4">
                        <Image
                          src={project.image}
                          alt={project.title}
                          width={600}
                          height={200}
                          className="object-contain rounded-full h-36 w-36"
                        />
                      </div>
                      <CardContent className="p-6 text-center">
                        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
                        <div className="flex flex-wrap justify-center gap-2 mb-4">
                          {project.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">{tag}</Badge>
                          ))}
                        </div>
                        <div className="flex justify-center gap-4">
                          <Button asChild variant="outline" size="sm">
                            <Link href={project.github}>
                              <Github className="mr-2 h-4 w-4" />
                              Code
                            </Link>
                          </Button>
                          <Button asChild variant="outline" size="sm">
                            <Link href={project.demo}>
                              <ExternalLink className="mr-2 h-4 w-4" />
                              Site
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Avis Section */}
          <section id="avis" className="py-20 flex justify-center">
            <div className="container mx-auto px-4">
              <Avis />
            </div>
          </section>

          {/* Footer */}
          <footer className="py-8 text-white">
            <div className="container mx-auto px-4 text-center">
              <p>&copy; {new Date().getFullYear()} Zoxouu. Tous droits réservés.</p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}