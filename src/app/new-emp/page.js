import NewEmpForm from "@/components/NewEmpForm";


export const metadata = {
    title: "new emp",
    description: "This is add new emp form page",
};
export default function EmpForm() {
    return (
        <main className="bg-white">
        <NewEmpForm/>
        </main>
    );
}
