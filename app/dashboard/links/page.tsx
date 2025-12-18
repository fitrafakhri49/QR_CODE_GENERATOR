import Header from "@/app/components/dashboard/Header";
import Links from "@/app/components/dashboard/Links";
import Sidebar from "@/app/components/dashboard/Sidebar";

export default function LinkPage() {
  return (
    <div className="min-h-screen bg-[#f4f6fa]">
      <Sidebar />
      <div className="md:ml-64">
        <Header />
        <Links />
      </div>
    </div>
  );
}
