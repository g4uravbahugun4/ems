import EditForm from "@/components/EditForm";


export const metadata = {
    title: "edit emp",
    description: "This is edit emp page",
};


export default async function EditEmp(params) {
    const empId = params.params.empid
   

    return (

        <EditForm empId={empId}/>

    )
}
