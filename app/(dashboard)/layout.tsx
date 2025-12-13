import { Sidebar } from "@/components/layout/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />
      <main className="flex-1 md:ml-64 ml-0 p-4 md:p-8 overflow-y-auto pt-18 md:pt-8">
        {children}
      </main>
    </div>
  );
}

