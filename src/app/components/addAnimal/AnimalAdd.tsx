import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { backendApi } from "@/lib/utils";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function DialogAnimalAdd({ categoris }: any) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [catId, setCatId] = useState("");
  const [animal_avatar, setAnimalAvatar] = useState("");
  const [loading, setLoading] = useState(false);
  const handleAvatar = (e: any) => {
    setAnimalAvatar(e.target.files[0]);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("catId", catId);
      formData.append("animal_avatar", animal_avatar);
      const res = await axios.post(`${backendApi}/animal/add-animal`, formData);
      if (res.data.status === "success") {
        setLoading(false);
        setName("");
        setCatId("");
        setAnimalAvatar("");
        toast.success(res.data.message, { theme: "colored" });
        router.refresh();
      }
    } catch (error: any) {
      setLoading(false);
      toast.error(error.response.data.message, { theme: "colored" });
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="px-4 py-2 border rounded-full text-white">
          Add Animal
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Animal</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="category">
                Animal Name <span className="text-red-600">*</span>
              </Label>
              <Input
                id="name"
                type="animalName"
                placeholder="Enter animal name"
                className="w-full mt-3"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="category">
                Category <span className="text-red-600">*</span>
              </Label>
              <select
                className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full mt-3"
                id="category"
                value={catId}
                onChange={(e) => setCatId(e.target.value)}
              >
                <option value="">Select Category</option>
                {categoris?.map((cat: any) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="img">
                Image <span className="text-red-600">*</span>
              </Label>
              <Input
                id="img"
                name="animalImg"
                type="file"
                className="w-full mt-3"
                onChange={handleAvatar}
              />
            </div>
          </div>

          <Button className="w-full mt-3" type="submit" disabled={loading}>
            {loading ? "Loading..." : "Create Animal"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
