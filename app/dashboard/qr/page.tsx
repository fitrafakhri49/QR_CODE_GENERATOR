import Header from "@/app/components/dashboard/Header";
import Sidebar from "@/app/components/dashboard/Sidebar";
import Qr from "@/app/components/dashboard/Qr";

export default function QrPage() {
  return (
    <div className="min-h-screen bg-[#f4f6fa]">
      <Sidebar />
      <div className="md:ml-64">
        <Header />
        <Qr />
      </div>
    </div>
  );
}
