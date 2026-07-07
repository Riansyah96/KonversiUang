"use client"

import { useState } from "react"
import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import {
  AcademicCapIcon,
  CodeBracketIcon,
  ShieldCheckIcon,
  ServerStackIcon,
  GlobeAltIcon,
  EnvelopeIcon,
  LinkIcon,
  BriefcaseIcon,
  CommandLineIcon,
  WrenchScrewdriverIcon,
  ChatBubbleLeftRightIcon,
  BeakerIcon,
} from "@heroicons/react/24/outline"

const skillsID = [
  { icon: CodeBracketIcon, label: "Fullstack Developer", desc: "React, Express.js, TypeScript" },
  { icon: ServerStackIcon, label: "DevOps Engineer", desc: "Docker, CI/CD, GitHub Actions" },
  { icon: ShieldCheckIcon, label: "Keamanan Siber", desc: "Penetration Testing, Ethical Hacking" },
  { icon: CommandLineIcon, label: "System Admin", desc: "Linux (Ubuntu, Fedora), MikroTik MTCNA" },
  { icon: WrenchScrewdriverIcon, label: "Database", desc: "SQL, Manajemen Basis Data" },
  { icon: ChatBubbleLeftRightIcon, label: "Tech Leadership", desc: "Project Management, Kolaborasi" },
]

const skillsEN = [
  { icon: CodeBracketIcon, label: "Fullstack Developer", desc: "React, Express.js, TypeScript" },
  { icon: ServerStackIcon, label: "DevOps Engineer", desc: "Docker, CI/CD, GitHub Actions" },
  { icon: ShieldCheckIcon, label: "Cybersecurity", desc: "Penetration Testing, Ethical Hacking" },
  { icon: CommandLineIcon, label: "SysAdmin", desc: "Linux (Ubuntu, Fedora), MikroTik MTCNA" },
  { icon: WrenchScrewdriverIcon, label: "Database", desc: "SQL, Database Management" },
  { icon: ChatBubbleLeftRightIcon, label: "Tech Leadership", desc: "Project Management, Collaboration" },
]

export function DeveloperInfo() {
  const [lang, setLang] = useState<"id" | "en">("id")

  const content = lang === "id" ? {
    title: "Tentang Developer",
    greeting: "Halo! Saya",
    name: "Arief Rachman Apriansyah",
    role: "Mahasiswa Teknik Informatika",
    focus: "Fullstack Web Development, DevOps, dan Keamanan Siber",
    bio: "Sebagai seorang developer, saya tidak hanya fokus pada penulisan kode yang fungsional, tetapi juga memastikan infrastruktur aplikasi berjalan dengan aman, efisien, dan siap pakai.",
    skillsTitle: "Keahlian Utama",
    certTitle: "Sertifikasi",
    certs: [
      { name: "MikroTik Certified Network Associate (MTCNA)", icon: GlobeAltIcon },
    ],
    contact: "Kontak & Media",
    openSource: "Saya selalu terbuka untuk kolaborasi, tantangan baru, dan pengembangan teknologi mutakhir.",
    skillDesc: skillsID,
    stats: [
      { value: "3+", label: "Tahun Belajar" },
      { value: "20+", label: "Proyek Dibuat" },
      { value: "MTCNA", label: "Sertifikasi" },
      { value: "ID/EN", label: "Bahasa" },
    ],
  } : {
    title: "About the Developer",
    greeting: "Hi! I am",
    name: "Arief Rachman Apriansyah",
    role: "Information Technology Student",
    focus: "Fullstack Web Development, DevOps, and Cybersecurity",
    bio: "I bridge the gap between building dynamic applications and ensuring they are deployed securely and efficiently.",
    skillsTitle: "Core Skills",
    certTitle: "Certification",
    certs: [
      { name: "MikroTik Certified Network Associate (MTCNA)", icon: GlobeAltIcon },
    ],
    contact: "Contact & Media",
    openSource: "Passionate about project management, technical leadership, and continuously learning new technologies.",
    skillDesc: skillsEN,
    stats: [
      { value: "3+", label: "Years Learning" },
      { value: "20+", label: "Projects Built" },
      { value: "MTCNA", label: "Certified" },
      { value: "ID/EN", label: "Languages" },
    ],
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={() => setLang(lang === "id" ? "en" : "id")}
          className="flex items-center gap-1.5 rounded-lg border border-surface-200 bg-white px-3 py-1.5 text-xs font-medium text-surface-600 hover:bg-surface-50 dark:border-surface-700 dark:bg-surface-800 dark:text-surface-300 dark:hover:bg-surface-700 transition-colors"
        >
          <GlobeAltIcon className="h-4 w-4" />
          {lang === "id" ? "English" : "Indonesia"}
        </button>
      </div>

      <Card className="overflow-hidden">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-primary-700/5" />
          <div className="relative flex flex-col items-center gap-4 py-8 sm:flex-row sm:items-start sm:py-6">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 text-3xl text-white shadow-lg shadow-primary-500/20">
              AR
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-xl font-bold text-surface-900 dark:text-white">
                {content.greeting} {content.name}
              </h2>
              <p className="mt-1 text-sm font-medium text-primary-600 dark:text-primary-400">
                {content.role}
              </p>
              <p className="mt-2 text-sm text-surface-500 dark:text-surface-400 max-w-xl">
                {content.bio}
              </p>
              <div className="mt-2 flex flex-wrap justify-center gap-2 sm:justify-start">
                <Badge variant="primary">{content.focus}</Badge>
                <Badge variant="success">Security First</Badge>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {content.stats.map((stat, i) => (
          <Card key={i} className="text-center py-4">
            <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">{stat.value}</p>
            <p className="text-xs text-surface-500 dark:text-surface-400 mt-1">{stat.label}</p>
          </Card>
        ))}
      </div>

      <Card>
        <div className="flex items-center gap-2 mb-4">
          <BriefcaseIcon className="h-5 w-5 text-primary-500" />
          <h3 className="text-base font-semibold text-surface-900 dark:text-white">{content.skillsTitle}</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {content.skillDesc.map((skill, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-lg border border-surface-100 bg-surface-50/50 p-3 dark:border-surface-700 dark:bg-surface-800/50"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-100 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400">
                <skill.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-surface-900 dark:text-white">{skill.label}</p>
                <p className="text-xs text-surface-400 mt-0.5">{skill.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <AcademicCapIcon className="h-5 w-5 text-primary-500" />
            <h3 className="text-base font-semibold text-surface-900 dark:text-white">{content.certTitle}</h3>
          </div>
          <div className="space-y-2">
            {content.certs.map((cert, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg bg-surface-50 p-3 dark:bg-surface-700/50">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-50 text-accent-600 dark:bg-accent-500/10 dark:text-accent-400">
                  <cert.icon className="h-5 w-5" />
                </div>
                <p className="text-sm font-medium text-surface-900 dark:text-white">{cert.name}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-4">
            <EnvelopeIcon className="h-5 w-5 text-primary-500" />
            <h3 className="text-base font-semibold text-surface-900 dark:text-white">{content.contact}</h3>
          </div>
          <div className="space-y-3">
            <a
              href="mailto:rianscollege@gmail.com"
              className="flex items-center gap-3 rounded-lg bg-surface-50 p-3 text-sm text-surface-700 hover:bg-primary-50 hover:text-primary-600 dark:bg-surface-700/50 dark:text-surface-300 dark:hover:bg-primary-900/20 dark:hover:text-primary-400 transition-colors"
            >
              <EnvelopeIcon className="h-5 w-5 shrink-0" />
              <span>rianscollege@gmail.com</span>
            </a>
            <a
              href="https://github.com/Riansyah96"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-lg bg-surface-50 p-3 text-sm text-surface-700 hover:bg-primary-50 hover:text-primary-600 dark:bg-surface-700/50 dark:text-surface-300 dark:hover:bg-primary-900/20 dark:hover:text-primary-400 transition-colors"
            >
              <LinkIcon className="h-5 w-5 shrink-0" />
              <span>github.com/Riansyah96</span>
            </a>
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-warning-50 text-warning-600 dark:bg-warning-500/10 dark:text-warning-400">
            <ChatBubbleLeftRightIcon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-surface-900 dark:text-white">
              {lang === "id" ? "Kolaborasi & Proyek" : "Collaboration & Projects"}
            </p>
            <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">
              {content.openSource}
            </p>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600 dark:bg-primary-500/10 dark:text-primary-400">
            <BeakerIcon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-surface-900 dark:text-white">
              Next.js Dev Tools
            </p>
            <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">
              Next.js Dev Tools adalah perkakas khusus (spesialis) yang paham betul bagaimana &ldquo;mesin&rdquo; Next.js bekerja di latar belakang. Alat ini menghemat waktu Anda agar tidak perlu terus-menerus melakukan console.log di terminal server maupun konsol browser.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
