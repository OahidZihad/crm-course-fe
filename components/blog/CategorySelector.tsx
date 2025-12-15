"use client";

import { BlogCategory, BlogSubcategory } from "@/lib/features/blog/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CategorySelectorProps {
  categories: BlogCategory[];
  selectedCategoryId: string;
  selectedSubcategoryId?: string;
  onCategoryChange: (categoryId: string) => void;
  onSubcategoryChange: (subcategoryId: string) => void;
}

export function CategorySelector({
  categories,
  selectedCategoryId,
  selectedSubcategoryId,
  onCategoryChange,
  onSubcategoryChange,
}: CategorySelectorProps) {
  const selectedCategory = categories.find((c) => c.id === selectedCategoryId);
  const subcategories = selectedCategory?.subcategories || [];

  return (
    <div className="flex gap-6 w-full">
      {/* Category Select */}
      <div className="flex-1 w-full">
        <label className="block text-sm font-bold mb-2 uppercase">
          Category *
        </label>
        <Select value={selectedCategoryId} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-full border-2 border-border shadow-[4px_4px_0px_0px_#a8a6ff] rounded-none h-12 font-bold">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent className="border-2 border-border shadow-[4px_4px_0px_0px_#a8a6ff] rounded-none z-[100]">
            {categories.map((category) => (
              <SelectItem
                key={category.id}
                value={category.id}
                className="font-bold cursor-pointer focus:bg-primary focus:text-black"
              >
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Subcategory Select */}
      <div className="flex-1 w-full">
        <label className="block text-sm font-bold mb-2 uppercase">
          Subcategory
        </label>
        <Select
          value={selectedSubcategoryId || "none"}
          onValueChange={(value) =>
            onSubcategoryChange(value === "none" ? "" : value)
          }
          disabled={subcategories.length === 0}
        >
          <SelectTrigger className="w-full border-2 border-border shadow-[4px_4px_0px_0px_#a8a6ff] rounded-none h-12 font-bold disabled:opacity-50">
            <SelectValue placeholder="Select a subcategory" />
          </SelectTrigger>
          <SelectContent className="border-2 border-border shadow-[4px_4px_0px_0px_#a8a6ff] rounded-none z-[100]">
            <SelectItem
              value="none"
              className="font-bold cursor-pointer focus:bg-primary focus:text-black"
            >
              None
            </SelectItem>
            {subcategories.map((subcategory) => (
              <SelectItem
                key={subcategory.id}
                value={subcategory.id}
                className="font-bold cursor-pointer focus:bg-primary focus:text-black"
              >
                {subcategory.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default CategorySelector;
