import { Search } from "lucide-react";
import Form from "next/form";

export function Filter({ url, filter }: { url: string; filter: string }) {
  return (
    <Form action={url}>
      <div className="flex items-center rounded-lg border border-gray-700 bg-black text-[14px] text-white/60 transition-all duration-150 ease-in-out focus-within:ring-2 focus-within:ring-gray-700 focus-within:ring-offset-2 focus-within:ring-offset-[#09090b]">
        <input
          className="w-full rounded-l-lg bg-transparent px-3 py-1 text-[#f4f4f5] focus:outline-none"
          placeholder="Buscar"
          name="filter"
          defaultValue={filter}
        />
        <Search className="mr-2" />
      </div>
    </Form>
  );
}
