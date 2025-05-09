import Link from "next/link";
import { Button } from "./components/ui/button";
import { Subtitle, Title } from "./components/typography";
import { supabase } from "./utils/supabase";

// This is a Server Component
async function ExpenseList() {
  const { data: expenses, error } = await supabase
    .from("expenses")
    .select("*")
    .order("date", { ascending: false });

  if (error) {
    console.error("Error fetching expenses:", error);
    return <p className="text-red-500">Error loading expenses</p>;
  }
  if (!expenses || expenses.length === 0) {
    return (
      <p className="text-gray-500">No expenses yet. Add your first expense!</p>
    );
  }

  return (
    <div className="space-y-4">
      {expenses.map((expense) => (
        <div key={expense.id} className="p-4 border rounded shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-bold text-lg">${expense.amount}</p>
              <p className="text-gray-700">{expense.description}</p>
            </div>
            <p className="text-sm text-gray-500">
              {new Date(expense.date).toLocaleDateString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <Title>My Expenses</Title>
        <Subtitle>My Expenses List</Subtitle>

        <Button asChild>
          <Link href="/add-expense">Add Expense</Link>
        </Button>
      </div>

      <ExpenseList />
    </main>
  );
}
