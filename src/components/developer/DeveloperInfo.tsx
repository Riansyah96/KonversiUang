"use client"

import { useState } from "react"
import {
  UserIcon,
  CodeBracketIcon,
  ShieldCheckIcon,
  ServerIcon,
  GlobeAltIcon,
  AcademicCapIcon,
  EnvelopeIcon,
  CheckBadgeIcon,
  ArrowTopRightOnSquareIcon,
  CircleStackIcon,
  WrenchScrewdriverIcon,
  BookOpenIcon,
  BriefcaseIcon,
  LanguageIcon,
} from "@heroicons/react/24/outline"
import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"

const SKILLS = [
  { category: "Frontend", icon: CodeBracketIcon, items: ["React", "Next.js", "TypeScript", "Tailwind CSS"], color: "bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400" },
  { category: "Backend", icon: ServerIcon, items: ["Express.js", "Node.js", "REST API", "JWT"], color: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400" },
  { category: "Database", icon: CircleStackIcon, items: ["SQL", "MySQL", "PostgreSQL", "MongoDB"], color: "bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400" },
  { category: "DevOps", icon: WrenchScrewdriverIcon, items: ["Docker", "GitHub Actions", "CI/CD", "Linux"], color: "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400" },
  { category: "Sistem & Jaringan", icon: GlobeAltIcon, items: ["Ubuntu Server", "Fedora", "MikroTik", "MTCNA"], color: "bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400" },
  { category: "Keamanan", icon: ShieldCheckIcon, items: ["Penetration Testing", "Ethical Hacking", "Audit Keamanan", "Enkripsi"], color: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400" },
]

const CERTIFICATIONS = [
  { name: "MikroTik Certified Network Associate (MTCNA)", issuer: "MikroTik", year: "2024", icon: GlobeAltIcon },
]

const LANG_ID = {
  hero: {
    greeting: "Halo! Saya",
    name: "Arief Rachman Apriansyah",
    tagline: "Mahasiswa Teknik Informatika | Fullstack Developer | DevOps & Cybersecurity Enthusiast",
    desc: "Seorang developer yang tidak hanya fokus pada penulisan kode yang fungsional, tetapi juga memastikan infrastruktur aplikasi berjalan dengan aman, efisien, dan siap pakai.",
  },
  sections: {
    overview: "Tentang Saya",
    overviewDesc: "Menjembatani pengembangan aplikasi dengan infrastruktur yang aman dan efisien.",
    skills: "Keahlian Utama",
    certs: "Sertifikasi",
    contact: "Kontak & Media",
  },
  stats: [
    { label: "Bidang Keahlian", value: "6+" },
    { label: "Sertifikasi", value: "1+" },
    { label: "Framework", value: "10+" },
    { label: "Project", value: "20+" },
  ],
  contact: [
    { label: "Email", value: "arkalbojong@gmail.com", href: "mailto:arkalbojong@gmail.com", icon: EnvelopeIcon },
    { label: "GitHub", value: "github.com/Riansyah96", href: "https://github.com/Riansyah96", icon: CodeBracketIcon },
    { label: "LinkedIn", value: "Arief Rachman Apriansyah", href: "#", icon: UserIcon },
  ],
}

const LANG_EN = {
  hero: {
    greeting: "Hi! I am",
    name: "Arief Rachman Apriansyah",
    tagline: "Information Technology Student | Fullstack Developer | DevOps & Cybersecurity Enthusiast",
    desc: "I bridge the gap between building dynamic applications and ensuring they are deployed securely and efficiently.",
  },
  sections: {
    overview: "About Me",
    overviewDesc: "Bridging application development with secure, efficient infrastructure.",
    skills: "Core Skills",
    certs: "Certifications",
    contact: "Contact & Links",
  },
  stats: [
    { label: "Expertise Areas", value: "6+" },
    { label: "Certifications", value: "1+" },
    { label: "Frameworks", value: "10+" },
    { label: "Projects", value: "20+" },
  ],
  contact: [
    { label: "Email", value: "arkalbojong@gmail.com", href: "mailto:arkalbojong@gmail.com", icon: EnvelopeIcon },
    { label: "GitHub", value: "github.com/Riansyah96", href: "https://github.com/Riansyah96", icon: CodeBracketIcon },
    { label: "LinkedIn", value: "Arief Rachman Apriansyah", href: "#", icon: UserIcon },
  ],
}

export function DeveloperInfo() {
  const [lang, setLang] = useState<"id" | "en">("id")
  const content = lang === "id" ? LANG_ID : LANG_EN

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-surface-900 via-primary-900 to-primary-800 p-8 sm:p-10">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl" />
        </div>
        <div className="relative flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-xl shadow-primary-500/30 ring-2 ring-white/20 shrink-0">
            <span className="text-3xl sm:text-4xl font-bold text-white">AR</span>
          </div>
          <div className="text-center sm:text-left flex-1">
            <p className="text-primary-200/80 text-sm font-medium">{content.hero.greeting}</p>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mt-0.5 tracking-tight">{content.hero.name}</h1>
            <p className="text-primary-300/80 text-sm sm:text-base mt-1.5 max-w-2xl">{content.hero.tagline}</p>
            <p className="text-white/60 text-sm mt-3 max-w-xl leading-relaxed">{content.hero.desc}</p>
          </div>
          <button
            onClick={() => setLang(lang === "id" ? "en" : "id")}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all shrink-0"
          >
            <LanguageIcon className="w-4 h-4 text-white/80" />
            <span className="text-sm font-medium text-white/90">{lang === "id" ? "EN" : "ID"}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {content.stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`p-4 sm:p-5 rounded-2xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 text-center ${i === 0 ? "lg:col-span-2 lg:row-span-1 flex flex-col justify-center" : ""}`}
          >
            <p className={`font-bold text-primary-500 ${i === 0 ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl"}`}>{stat.value}</p>
            <p className="text-xs sm:text-sm text-surface-500 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-9 h-9 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center">
              <AcademicCapIcon className="w-5 h-5 text-primary-500" />
            </div>
            <div>
              <h2 className="font-semibold text-surface-900 dark:text-white">{content.sections.overview}</h2>
              <p className="text-xs text-surface-500">{content.sections.overviewDesc}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-surface-50 dark:bg-surface-700/30 border border-surface-100 dark:border-surface-700/50">
              <div className="flex items-center gap-2 mb-2">
                <BookOpenIcon className="w-4 h-4 text-primary-500" />
                <h3 className="text-sm font-medium text-surface-700 dark:text-surface-300">Pendidikan</h3>
              </div>
              <p className="text-sm text-surface-900 dark:text-white font-medium">Teknik Informatika</p>
              <p className="text-xs text-surface-500 mt-0.5">Fokus: Web Development, DevOps & Keamanan Siber</p>
            </div>
            <div className="p-4 rounded-xl bg-surface-50 dark:bg-surface-700/30 border border-surface-100 dark:border-surface-700/50">
              <div className="flex items-center gap-2 mb-2">
                <BriefcaseIcon className="w-4 h-4 text-primary-500" />
                <h3 className="text-sm font-medium text-surface-700 dark:text-surface-300">Minat Riset</h3>
              </div>
              <p className="text-sm text-surface-900 dark:text-white font-medium">Fullstack Engineering</p>
              <p className="text-xs text-surface-500 mt-0.5">Cloud Infrastructure &bull; Cybersecurity &bull; Automation</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 border-primary-200 dark:border-primary-800">
          <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-4">
            <div className="w-14 h-14 rounded-2xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center ring-1 ring-primary-200 dark:ring-primary-800">
              <CodeBracketIcon className="w-7 h-7 text-primary-500" />
            </div>
            <div>
              <p className="text-sm font-semibold text-surface-900 dark:text-white">Tech Stack Utama</p>
              <p className="text-xs text-surface-500 mt-1">React &bull; Next.js &bull; TypeScript</p>
              <p className="text-xs text-surface-500">Express.js &bull; Docker &bull; Linux</p>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-9 h-9 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center">
            <CodeBracketIcon className="w-5 h-5 text-primary-500" />
          </div>
          <div>
            <h2 className="font-semibold text-surface-900 dark:text-white">{content.sections.skills}</h2>
            <p className="text-xs text-surface-500">6 bidang keahlian yang dikuasai</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SKILLS.map((skill) => {
            const Icon = skill.icon
            return (
              <div
                key={skill.category}
                className="p-4 rounded-xl bg-surface-50 dark:bg-surface-700/30 border border-surface-100 dark:border-surface-700/50 hover:border-primary-200 dark:hover:border-primary-800 transition-colors"
              >
                <div className="flex items-center gap-2.5 mb-3">
                  <div className={`w-8 h-8 rounded-lg ${skill.color} flex items-center justify-center`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium text-surface-700 dark:text-surface-300">{skill.category}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {skill.items.map((item) => (
                    <Badge key={item} variant="default" className="text-[11px]">{item}</Badge>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-9 h-9 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center">
              <CheckBadgeIcon className="w-5 h-5 text-primary-500" />
            </div>
            <div>
              <h2 className="font-semibold text-surface-900 dark:text-white">{content.sections.certs}</h2>
              <p className="text-xs text-surface-500">Sertifikasi resmi yang dimiliki</p>
            </div>
          </div>
          <div className="space-y-3">
            {CERTIFICATIONS.map((cert) => {
              const Icon = cert.icon
              return (
                <div key={cert.name} className="p-4 sm:p-5 rounded-xl bg-surface-50 dark:bg-surface-700/30 border border-surface-100 dark:border-surface-700/50 flex items-start gap-4 hover:border-amber-200 dark:hover:border-amber-800 transition-colors">
                  <div className="w-11 h-11 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-surface-900 dark:text-white">{cert.name}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <Badge variant="warning">{cert.issuer}</Badge>
                      <span className="text-xs text-surface-400">{cert.year}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-9 h-9 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center">
              <EnvelopeIcon className="w-5 h-5 text-primary-500" />
            </div>
            <div>
              <h2 className="font-semibold text-surface-900 dark:text-white">{content.sections.contact}</h2>
              <p className="text-xs text-surface-500">3 platform</p>
            </div>
          </div>
          <div className="space-y-3">
            {content.contact.map((item) => {
              const Icon = item.icon
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-surface-50 dark:bg-surface-700/30 border border-surface-100 dark:border-surface-700/50 hover:bg-primary-50 dark:hover:bg-primary-900/10 hover:border-primary-200 dark:hover:border-primary-800 transition-all group"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-4 h-4 text-primary-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-surface-500">{item.label}</p>
                    <p className="text-sm font-medium text-surface-900 dark:text-white truncate">{item.value}</p>
                  </div>
                  <ArrowTopRightOnSquareIcon className="w-4 h-4 text-surface-400 group-hover:text-primary-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                </a>
              )
            })}
          </div>
        </Card>
      </div>
    </div>
  )
}
