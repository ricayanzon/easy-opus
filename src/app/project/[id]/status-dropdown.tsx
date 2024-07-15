import { Status } from "@/types";
import { ChangeEvent } from "react";

export const statuses: Status[] = ['inprogress', 'done', 'finished', 'not started', 'unknown']

interface StatusDropdownProps {
  currentStatus?: string
  onChange: (status: Status) => void
}

export function StatusDropdown({ currentStatus, onChange }: StatusDropdownProps) {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault()
    onChange(event.target.value as Status)
      
  }

  return (
    <select
      defaultValue={currentStatus}
      name="selectedStatus"
      onChange={(e) => handleChange(e)}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow hover:shadow-md transition duration-200 ease-in-out">
      {statuses.map((status) => (
        <option key={status} value={status}>{status}</option>
      ))}
    </select>
  );
} 