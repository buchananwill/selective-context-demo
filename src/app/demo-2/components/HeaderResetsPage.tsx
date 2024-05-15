"use client";
import { useGlobalWriteAny } from "selective-context";
import { useCallback } from "react";
import {
  ContextKeys,
  LogContent,
  NthTerm,
} from "@/app/demo-2/literals/contextKeys";
import { initialFunction } from "@/app/demo-2/utils/mathFunctions";
import { createLogStore, useLogStore } from "@/app/demo-2/utils/useLogStore";
import { wrapper } from "@/app/demo-2/literals/logFormat";
import { GenericButtonProps } from "@/app/demo-2/components/ControlledMergeButton";

export default function HeaderResetsPage({
  children,className
}: Pick<GenericButtonProps, "children" | 'className'>) {
  let { dispatchWriteAny } = useGlobalWriteAny();
  useLogStore();

  const resetCallback = useCallback(() => {
    let [addLog, getLog] = createLogStore(wrapper);
    dispatchWriteAny(NthTerm, 27);
    dispatchWriteAny(LogContent, "{}");
    dispatchWriteAny(ContextKeys.FunctionContextKey, initialFunction);
    dispatchWriteAny(ContextKeys.LogSupplier, getLog);
    dispatchWriteAny(ContextKeys.ReRenderTracker, addLog);
  }, [dispatchWriteAny]);

  return (
    <button
      className={
        className
      }
      onClick={resetCallback}
    >
      {children}
    </button>
  );
}
