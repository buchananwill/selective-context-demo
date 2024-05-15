"use client";




import {MemoizedFunction} from "@/app/demo-2/types/memoizedFunction";
import {ReRenderTracker} from "@/app/demo-2/literals/contextKeys";
import React, {ProfilerOnRenderCallback, useCallback, useEffect} from "react";
import {useGlobalListener} from "selective-context";

function warningFunction(log: string) {
  console.warn("no function in selective context", log);
}

const fallbackWarningFunction = { memoizedFunction: warningFunction };

function createLogEntry(parentComponent: string, renderCount: number) {
  return `{"parent": "${parentComponent}", "renderCount": "${renderCount}"}`;
}

// Use a variable to decide which logging function to use
const viteLogStyle = process.env.VITE_LOG_STYLE;
const nextLogStyle = process.env.NEXT_PUBLIC_LOG_STYLE;


export const CreateLogEntry = 'createLogEntry';
export default function ReRenderListener({
  parentComponent,
  renderCount,
}: {
  parentComponent: string;
  renderCount: number;
}) {

  const {
    currentState: { memoizedFunction },
  } = useGlobalListener<MemoizedFunction<string, void>>({
    contextKey: ReRenderTracker,
    listenerKey: parentComponent,
    initialValue: fallbackWarningFunction,
  });

  useEffect(() => {
    const arg = createLogEntry(parentComponent, renderCount);
    if (renderCount > 0 && nextLogStyle === CreateLogEntry) {
      memoizedFunction(arg);
    }
  }, [renderCount, memoizedFunction, parentComponent]);

  const renderCallback: ProfilerOnRenderCallback = useCallback((id, phase, actualDuration, baseDuration, startTime, commitTime) => {
    if (viteLogStyle === 'useProfiler') {
      const object = { id, phase, actualDuration, baseDuration, startTime, commitTime };
      const jsonStringLog = JSON.stringify(object);
      memoizedFunction(jsonStringLog);
    }
  }, [memoizedFunction]);



  return <React.Profiler id={parentComponent} onRender={renderCallback}>{null}</React.Profiler>;
}
