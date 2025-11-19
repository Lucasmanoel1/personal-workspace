// src/app/page.tsx
"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <section className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
      <p className="mb-6 text-gray-600">Painel central do workspace.</p>

      <div className="grid gap-4 md:grid-cols-3">
        <Link href="/streaming" className="border p-4 rounded-lg hover:shadow-md">
          <h3 className="font-semibold">Streaming</h3>
          <p className="text-sm text-gray-500">Serviço de streaming (filho)</p>
        </Link>

        <Link href="/news" className="border p-4 rounded-lg hover:shadow-md">
          <h3 className="font-semibold">News</h3>
          <p className="text-sm text-gray-500">Serviço de notícias (filho)</p>
        </Link>

        <Link href="/portfolio" className="border p-4 rounded-lg hover:shadow-md">
          <h3 className="font-semibold">Portfólio</h3>
          <p className="text-sm text-gray-500">Página pública</p>
        </Link>
      </div>
    </section>
  );
}
