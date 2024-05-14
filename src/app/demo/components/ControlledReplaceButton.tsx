'use client'
import React from "react";
import { useGlobalDispatch, useGlobalListener } from "selective-context";
import { SelectiveContextParams } from "selective-context/dist/types";

import {MemoizedSupplier} from "@/app/demo/types/memoizedFunction";
import { useRenderCounter } from "@/app/demo/utils/useRenderCounter";
import ReRenderListener from "@/app/demo/components/ReRenderListener";

export type GenericButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export default function ControlledReplaceButton<T>({
  contextKey,
  listenerKey,
  initialValue,
  consumerContextKey,
  children,
  ...otherProps
}: {
  consumerContextKey: string;
} & SelectiveContextParams<MemoizedSupplier<T>> &
  Omit<GenericButtonProps, "onClick">) {
  let renderCounter = useRenderCounter();
  const {
    currentState: {get },
  } = useGlobalListener({ contextKey, listenerKey, initialValue });
  const { dispatchWithoutListen } = useGlobalDispatch<T>(consumerContextKey);
  return (
    <button
      onClick={() => {
        console.log(get)
        console.log(get())
        dispatchWithoutListen(get());
      }}
      {...otherProps}
    >
      {children}
      <ReRenderListener
        parentComponent={`controlled-replace-button:${contextKey}:${listenerKey}`}
        renderCount={renderCounter}
      />
    </button>
  );
}
