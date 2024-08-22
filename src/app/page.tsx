import { backendApi } from "@/lib/utils";
import axios from "axios";
import HomeComponent from "./components/home/Home";

async function getData() {
  const catRes = await axios.get(`${backendApi}/category/get-category`);
  const animalRes = await axios.get(`${backendApi}/animal/get-animals`);
  return {
    categories: catRes.data.data,
    animals: animalRes.data.data,
  };
}

export default async function Home() {
  const data = await getData();
  return (
    <>
      <section className="mt-8">
        <HomeComponent categories={data?.categories} animals={data?.animals} />
      </section>
    </>
  );
}
