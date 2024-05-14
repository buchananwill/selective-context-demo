import { useMemo } from "react";
import {
  MemoizedFunction,
  MemoizedSupplier,
} from "@/app/demo/types/memoizedFunction";

export function csvLogCollector(prev: string, next: string) {
    console.log(prev)
  return prev.length > 0 ? `${prev},${next}` : next;
}

export function useLogStore(wrapper?: {header: string; footer: string}):[MemoizedFunction<string, void>, MemoizedSupplier<string>] {
    return useMemo(() => {
        let log = ''
        const addLog: MemoizedFunction<string, void> = {
          memoizedFunction: (nextLog: string) => {
            log = csvLogCollector(log, nextLog);
          },
        }; 
        const getLog: MemoizedSupplier<string> = {
          get: () => `${wrapper?.header}${log}${wrapper?.footer}`
        };
        return [addLog, getLog]
    }, [wrapper])
} 