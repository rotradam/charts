export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="p-6 rounded-lg border bg-card text-card-foreground">
            <h2 className="text-lg font-semibold mb-2">Quick Navigation</h2>
            <p className="text-muted-foreground">
              Access market analysis tools and settings from the sidebar.
            </p>
          </div>
          {/* Add more dashboard cards here */}
        </div>
      </div>
    </main>
  );
}
