'use client'
import { useEffect, useRef } from "react";
import { useGlobalListener } from "selective-context";
import { MemoizedFunction } from "@/app/demo/types/memoizedFunction";

function warningFunction(log: string) {
  console.warn("no function in selective context");
}

const initialValue = { memoizedFunction: warningFunction };
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
    contextKey: "re-render-tracker",
    listenerKey: parentComponent,
    initialValue: initialValue,
  });

  useEffect(() => {
    if (renderCount > 0)
      memoizedFunction(`{"parent": "${parentComponent}", "renderCount": "${renderCount}"}`);
  });

  return null;
}
