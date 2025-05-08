import Link from "next/link";
import { Button } from "../components/ui/button";
import { Subtitle, Title } from "../components/typography";

// This is a Server Component
async function ExpenseList() {
  // In a real app, this would fetch from your database
  const expenses = []; // We'll implement this later

  if (expenses.length === 0) {
    return (
      <p className="text-gray-500">No expenses yet. Add your first expense!</p>
    );
  }

  return (
    <div className="space-y-4">
      {expenses.map((expense) => (
        <div key={expense.id} className="p-4 border rounded">
          <p className="font-bold">${expense.amount}</p>
          <p>{expense.description}</p>
          <p className="text-sm text-gray-500">{expense.date}</p>
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
