"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "./utils/supabase";

export async function addExpense(formData: FormData) {
  try {
    const amount = formData.get("amount");
    const description = formData.get("description");
    const date = formData.get("date");
    const category = formData.get("category");

    const { error } = await supabase.from("expenses").insert([
      {
        amount: parseFloat(amount as string),
        description,
        date,
        category,
        user_id: "anonymous",
      },
    ]);

    if (error) {
      console.error("Error adding expense:", error);
      throw new Error(error.message);
    }

    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to add expense:", error);
    return { success: false, error: error.message };
  }
}
