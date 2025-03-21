"use client";

import useSWR from "swr";
import { getTasks } from "../app/actions";
import { Task } from "@/app/data/schema";

/**
 * タスクデータを取得するカスタムフック
 * @param defaultTasks - デフォルトのタスクデータ
 * @param count - タスクの総数
 * @param startRange - データ取得の開始位置
 * @param endRange - データ取得の終了位置
 * @param pageSize - ページあたりのタスク数
 * @param pageIndex - 現在のページインデックス
 * @returns タスクデータとページネーション情報
 * ページ1-5（アイテム0-49）を見るときは /api/tasks/0/50 から
 * ページ6-10（アイテム50-99）を見るときは /api/tasks/50/100 から
 * ページ11-15（アイテム100-149）を見るときは /api/tasks/100/150 から
 */
export default function useTask({
  defaultTasks,
  totalTaskLength,
  pageSize,
  pageIndex,
}: {
  defaultTasks: Task[];
  totalTaskLength: number;
  pageSize: number;
  pageIndex: number;
}) {
  const startItem = pageIndex * pageSize;
  // データ取得範囲を50単位で区切る
  const chunkSize = 50;
  const startRangeIndex = Math.floor(startItem / chunkSize) * chunkSize;
  const endRangeIndex = Math.min(startRangeIndex + chunkSize, totalTaskLength);

  const { data, isValidating } = useSWR<{
    tasks: Task[];
    totalTaskLength: number;
  }>(
    `/api/tasks/${startRangeIndex}/${endRangeIndex}`,
    () => getTasks(startRangeIndex, endRangeIndex),
    {
      fallbackData: { tasks: defaultTasks, totalTaskLength },
      dedupingInterval: 60000, // 60秒ごとにデータを再取得
      keepPreviousData: true, // 前のデータを保持
    }
  );
  const maxRangeIndex = Math.floor(totalTaskLength / pageSize);
  const lastPageIndex = Math.floor(totalTaskLength / chunkSize);

  return {
    tasks: data?.tasks,
    count: data?.totalTaskLength,
    isValidating,
    maxRangeIndex,
    startRangeIndex,
    lastPageIndex,
  };
}
