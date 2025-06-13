import Link from "next/link";
import { Button } from "./components/ui/button";
import { Subtitle, Title } from "./components/typography";
import { supabase } from "./utils/supabase";
import formatCurrency from "../formatcurrency";

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

  // Calculate statistics
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const categoryTotals = expenses.reduce((acc, exp) => {
    const category = exp.category || "Uncategorized";
    acc[category] = (acc[category] || 0) + exp.amount;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      {/* Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg shadow">
        <div>
          <h2 className="text-lg font-semibold mb-2 text-purple-600">
            Total Expenses
          </h2>
          <p className="text-2xl font-bold text-green-600">
            {formatCurrency(totalExpenses)}
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2 text-indigo-600">
            Category Breakdown
          </h2>
          <div className="space-y-1">
            {Object.entries(categoryTotals as Record<string, number>).map(
              ([category, amount]: [string, number]) => (
                <div key={category} className="flex justify-between">
                  <span className="capitalize">{category}</span>
                  <span className="text-green-600">
                    {formatCurrency(amount)}
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Expenses List */}
      <ExpenseListRoot>
        {expenses.map((expense) => (
          <div key={expense.id} className="p-4 border rounded shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-bold text-lg text-green-600">
                  {formatCurrency(expense.amount)}
                </p>
                <p className="text-gray-700">{expense.description}</p>
                {expense.category && (
                  <span className="inline-block px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full mt-1">
                    {expense.category}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500">
                {new Date(expense.date).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </ExpenseListRoot>
    </div>
  );
}

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <Title>My Expenses</Title>

        <Button asChild>
          <Link href="/add-expense">Add Expense</Link>
        </Button>
      </div>

      <ExpenseList />
    </main>
  );
}
