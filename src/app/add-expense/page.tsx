"use client";

import { useRouter } from "next/navigation";
import { addExpense } from "../actions";

const categories = [
  "Food",
  "Transport",
  "Entertainment",
  "Shopping",
  "Bills",
  "Other",
];

export default function AddExpense() {
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    const result = await addExpense(formData);
    if (result.success) {
      router.push("/");
    }
  }

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Add New Expense</h1>

      <form action={handleSubmit} className="max-w-md space-y-4">
        <div>
          <label htmlFor="amount" className="block mb-2">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            step="0.01"
            min="0"
            className="w-full p-2 border border-white rounded bg-[#0a0a0a] text-white hover:bg-[#1a1a1a] focus:bg-[#1a1a1a]"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block mb-2 ">
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            className="w-full p-2 border border-white rounded bg-[#0a0a0a] text-white hover:bg-[#1a1a1a] focus:bg-[#1a1a1a]"
            required
          />
        </div>

        <div>
          <label htmlFor="category" className="block mb-2">
            Category
          </label>
          <select
            id="category"
            name="category"
            className="w-full p-2 border rounded bg-[#0a0a0a] text-white hover:bg-[#1a1a1a] focus:bg-[#1a1a1a]"
            required
          >
            <option value="" className="bg-[#0a0a0a] text-white">
              Select a category
            </option>
            {categories.map((category) => (
              <option
                key={category}
                value={category}
                className="bg-[#0a0a0a] text-white"
              >
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="date" className="block mb-2">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            defaultValue={new Date().toISOString().split("T")[0]}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Save Expense
        </button>
      </form>
    </main>
  );
}
