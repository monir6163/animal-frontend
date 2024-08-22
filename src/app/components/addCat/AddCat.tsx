"use client";
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
import Toastify from "@/lib/Toastify";
import { backendApi } from "@/lib/utils";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function DialogAddCat() {
  const [name, setName] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${backendApi}/category/add-category`, {
        name,
      });
      if (res.data.status === "success") {
        setLoading(false);
        setName("");
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
      <Toastify />
      <DialogTrigger asChild>
        <button className="px-4 py-2 border rounded-full text-white">
          Add Category
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="category">
                Category Name <span className="text-red-600">*</span>
              </Label>
              <Input
                id="category"
                type="text"
                placeholder="Enter category name"
                className="w-full mt-3"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <Button className="w-full mt-3" type="submit" disabled={loading}>
            {loading ? "Loading..." : "Create Category"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
