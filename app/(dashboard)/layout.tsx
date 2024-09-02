export const metadata = {
  title: "Dashboard | Next Pizza",
  description: "Dashboard | Next Pizza",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      DASHBOARD HEADER
      {children}
    </html>
  );
}
