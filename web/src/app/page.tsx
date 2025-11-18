"use client"

import Link from "next/link"

export default function HomePage() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>Lucas Workspace</h1>
      <p>Bem-vindo ao seu hub de serviços.</p>

      <ul style={{ marginTop: "1rem" }}>
        <li><Link href="/portfolio">Portfólio (público)</Link></li>
        <li><Link href="/streaming">Streaming Service</Link></li>
        <li><Link href="/news">News Service</Link></li>
      </ul>
    </main>
  )
}
