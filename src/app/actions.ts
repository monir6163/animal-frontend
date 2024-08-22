"use server";

import { backendApi } from "@/lib/utils";
import axios from "axios";
import { revalidatePath } from "next/cache";

export async function getData() {
  const catRes = await axios.get(`${backendApi}/category/get-category`);
  const animalRes = await axios.get(`${backendApi}/animal/get-animals`);
  revalidatePath("/");
  return {
    categories: catRes.data.data,
    animals: animalRes.data.data,
  };
}
