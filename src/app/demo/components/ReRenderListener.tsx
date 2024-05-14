"use client";
import { useEffect } from "react";
import { useGlobalListener } from "selective-context";
import { MemoizedFunction } from "@/app/demo/types/memoizedFunction";
import {ReRenderTracker} from "@/app/demo/literals/contextKeys";


function warningFunction(log: string) {
  console.warn("no function in selective context", log);
}

const fallbackWarningFunction = { memoizedFunction: warningFunction };
export default function ReRenderListener({
  parentComponent,
  renderCount,
}: {
  parentComponent: string;
  renderCount: number;
}) {

  let {
    currentState: { memoizedFunction },
  } = useGlobalListener<MemoizedFunction<string, void>>({
    contextKey: ReRenderTracker,
    listenerKey: parentComponent,
    initialValue: fallbackWarningFunction,
  });

  useEffect(() => {
    const arg = `{"parent": "${parentComponent}", "renderCount": "${renderCount}"}`;
    if (renderCount > 0)
      memoizedFunction(arg);
  });

  return null;
}
