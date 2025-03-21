"use server";

import { promises as fs } from "fs";
import path from "path";
import { z } from "zod";
import { taskSchema } from "./data/schema";

export async function getTasks(startIndex = 0, endIndex = 50) {
  const data = await fs.readFile(
    path.join(process.cwd(), "app/data/tasks.json")
  );

  const tasks = JSON.parse(data.toString());

  const selectedTasks = tasks.slice(startIndex, endIndex);

  return {
    tasks: z.array(taskSchema).parse(selectedTasks),
    totalTaskLength: z.array(taskSchema).parse(tasks).length,
  };
}
