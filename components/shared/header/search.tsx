import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllCategories } from "@/lib/actions/products.actions";
import { SearchIcon } from "lucide-react";
import React from "react";

const Search = async () => {
  const categories = await getAllCategories();
  return (
    <form action="/search" method="GET">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Select name="category">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key="All" value="all">
              All
            </SelectItem>
            {categories.map((x) => (
              <SelectItem key={x.category} value={x.category}>
                {x.category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          className="md:w-[100px] lg:w-[300px]"
          type="text"
          name="q"
          placeholder="Search..."
        />
        <Button type="submit">
          <SearchIcon />
        </Button>
      </div>
    </form>
  );
};

export default Search;
