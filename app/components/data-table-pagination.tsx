import { Table } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  maxRangeIndex: number;
  totalTaskLength: number;
}

export function DataTablePagination<TData>({
  table,
  maxRangeIndex,
  totalTaskLength,
}: DataTablePaginationProps<TData>) {
  const router = useRouter();

  const { pageSize } = table.getState().pagination;
  const [dbRangeIndex, setDbRangeIndex] = useState(0);

  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of {totalTaskLength}
        {/* {table.getFilteredSelectedRowModel().rows.length} 
        {table.getFilteredRowModel().rows.length} row(s) selected. */}
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
              router.push(`?perPage=${value}`);
              table.setPageIndex(0);
              setDbRangeIndex(0);
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[2, 5, 10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          {/* Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()} */}
          Page {dbRangeIndex + 1} of {maxRangeIndex + 1}
        </div>
        <div className="flex items-center space-x-2">
          {/* <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => {
              table.setPageIndex(0);
              router.push(`?size=${pageSize}&index=${0}`);
              setDbRangeIndex(0);
            }}
            disabled={dbRangeIndex <= 0}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft />
          </Button> */}
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => {
              table.previousPage();
              router.push(`?size=${pageSize}&index=${dbRangeIndex - 1}`);
              setDbRangeIndex(dbRangeIndex - 1);
            }}
            disabled={dbRangeIndex <= 0}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => {
              table.nextPage();
              router.push(`?size=${pageSize}&index=${dbRangeIndex + 1}`);
              setDbRangeIndex(dbRangeIndex + 1);
            }}
            disabled={dbRangeIndex >= maxRangeIndex}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight />
          </Button>
          {/* <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => {
              // console.log("lastPageIndex", lastPageIndex);
              router.push(`?size=${pageSize}&index=${maxRangeIndex}`);
              setDbRangeIndex(maxRangeIndex);
              table.setPageIndex(lastPageIndex);
            }}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight />
          </Button> */}
        </div>
      </div>
    </div>
  );
}
