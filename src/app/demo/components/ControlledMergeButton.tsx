'use client'


import {MemoizedFunction} from "../types/memoizedFunction";
import {useRenderCounter} from "../utils/useRenderCounter";

import ReRenderListener from "./ReRenderListener";
import React from "react";
import {SelectiveContextParams} from "selective-context/dist/types";
import {useGlobalDispatch, useGlobalListener} from "selective-context";


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
  const renderCounter = useRenderCounter();
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
