import MedicationTable from "@/components/tables/MedicationTable";

const medications = [
    { id: 1, acronym: "asd", name: "ádasd", description: "Dưỡng chất", price: 100000, quantity: 100},
    { id: 2, acronym: "asd", name: "ádasd", description: "Dưỡng chất", price: 100000, quantity: 100},
    { id: 3, acronym: "asd", name: "ádasd", description: "Dưỡng chất", price: 100000, quantity: 100},
];

export default function MedicationPage() {
  return (
      <div>
        <MedicationTable medications={medications}/>
      </div>
  );
}