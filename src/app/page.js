
import EmpTable from "@/components/EmpTable";
import Image from "next/image";
import Link from "next/link";
export default function Home() {
  

  return (
    <main className="bg-amber-100 w-full">
      <div className="flex justify-between px-2 w-full">
      <h1 className="text-black text-xl">EMS - Employee Management System</h1>
      <Link href='/new-emp' className="px-3 py-1 rounded-full bg-green-600 text-white cursor-pointer">Add Employee</Link>
      </div>
      <EmpTable />
    </main>
  );
}
