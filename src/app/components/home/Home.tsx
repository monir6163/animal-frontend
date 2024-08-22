"use client";
import { useState } from "react";
import DialogAnimalAdd from "../addAnimal/AnimalAdd";
import DialogAddCat from "../addCat/AddCat";
import Container from "../shared/Container";
import Animal from "../ShowAnimal/Animal";

export default function HomeComponent({ categories, animals }: any) {
  const [activeTab, setActiveTab] = useState(categories[0]?._id || "");
  const landId = categories.find((cat: any) => cat.name === "Land Animal")?._id;
  const birdCatId = categories.find((cat: any) => cat.name === "Bird")?._id;
  const filteredItems = animals?.filter((item: any) => {
    if (activeTab === landId) {
      return item.catId === landId || item.catId === birdCatId;
    }
    return item.catId === activeTab;
  });

  return (
    <Container>
      <div className="flex w-full flex-col md:flex-row gap-5 justify-between items-center py-3">
        {/* category name */}
        <div className="grid grid-cols-2 gap-5 md:flex md:space-x-4 items-center justify-center">
          {categories?.map((item: any) => (
            <button
              key={item._id}
              onClick={() => setActiveTab(item._id)}
              className={`border rounded-full transition-colors duration-200 ${
                activeTab === item._id
                  ? "text-green-600 border-green-600 w-[140px] px-4 py-2"
                  : "text-red-600 border-red-600 w-[140px] px-4 py-2"
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* add category button and add animal button */}
        <div className="flex items-center space-x-4">
          <DialogAddCat />
          <DialogAnimalAdd categoris={categories} />
        </div>
      </div>

      {/* animal list */}
      <div className="mt-6 text-white">
        <Animal items={filteredItems} />
      </div>
    </Container>
  );
}
