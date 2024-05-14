'use client'
import React from "react";
import { useGlobalDispatch, useGlobalListener } from "selective-context";
import { SelectiveContextParams } from "selective-context/dist/types";

import { MemoizedFunction } from "@/app/demo/types/memoizedFunction";
import { useRenderCounter } from "@/app/demo/utils/useRenderCounter";
import ReRenderListener from "@/app/demo/components/ReRenderListener";

export type GenericButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export default function ControlledMergeButton<T>({
  contextKey,
  listenerKey,
  initialValue,
  valueContextKey,
  children,
  ...otherProps
}: {
  valueContextKey: string;
} & SelectiveContextParams<MemoizedFunction<T, T>> &
  Omit<GenericButtonProps, "onClick">) {
  let renderCounter = useRenderCounter();
  const {
    currentState: { memoizedFunction },
  } = useGlobalListener({ contextKey, listenerKey, initialValue });
  const { dispatchWithoutListen } = useGlobalDispatch<T>(valueContextKey);
  return (
    <button
      onClick={() => {
        dispatchWithoutListen((prev) => memoizedFunction(prev));
      }}
      {...otherProps}
    >
      {children}
      <ReRenderListener
        parentComponent={`controlled-merge-button:${contextKey}:${listenerKey}:${valueContextKey}`}
        renderCount={renderCounter}
      />
    </button>
  );
}
