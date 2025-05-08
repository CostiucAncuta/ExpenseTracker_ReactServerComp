import { revalidatePath } from "next/cache";

// Server Action for adding expenses
async function addExpense(formData: FormData) {
  "use server";

  const amount = formData.get("amount");
  const description = formData.get("description");
  const date = formData.get("date");

  // Here you would typically save to your database
  console.log("Saving expense:", { amount, description, date });

  // Revalidate the expenses page to show the new expense
  revalidatePath("/");
}

export default function AddExpense() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Add New Expense</h1>

      <form action={addExpense} className="max-w-md space-y-4">
        <div>
          <label htmlFor="amount" className="block mb-2">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block mb-2">
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            className="w-full p-2 border rounded"
            required
          />
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
