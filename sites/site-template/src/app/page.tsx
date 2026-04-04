export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="max-w-2xl text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900">
          Welcome to SITE_NAME
        </h1>
        <p className="text-lg text-gray-600">
          Your site is live. Start editing{' '}
          <code className="rounded bg-gray-100 px-2 py-1 text-sm font-mono">
            src/app/page.tsx
          </code>{' '}
          to build it out.
        </p>
      </div>
    </main>
  )
}
