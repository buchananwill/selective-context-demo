"use client";
import React from "react";
import { SelectiveContextParams } from "selective-context/dist/types";
import { useGlobalListener } from "selective-context";
import { useRenderCounter } from "@/app/demo/utils/useRenderCounter";
import ReRenderListener from "@/app/demo/components/ReRenderListener";

export type GenericDivProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export default function PrintableListenerDiv({
  contextKey,
  listenerKey,
  initialValue,
  children,
  ...divProps
}: SelectiveContextParams<number | string> & GenericDivProps) {
  let { currentState } = useGlobalListener({
    contextKey,
    listenerKey,
    initialValue,
  });
  let renderCounter = useRenderCounter();

  return (
    <div {...divProps}>
      {currentState}
      {children}
      <ReRenderListener
        parentComponent={`printable-listener-div:${contextKey}:${listenerKey}`}
        renderCount={renderCounter}
      />
    </div>
  );
}
