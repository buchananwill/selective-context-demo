"use client";





import {useRenderCounter} from "@/app/demo-2/utils/useRenderCounter";
import ReRenderListener from "@/app/demo-2/components/ReRenderListener";
import {SelectiveContextParams} from "selective-context/dist/types";
import {useGlobalListener} from "selective-context";

export type GenericDivProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

function PrintableListenerDiv({
  contextKey,
  listenerKey,
  initialValue,
  children,
  ...divProps
}: SelectiveContextParams<number | string> & GenericDivProps) {
  const { currentState } = useGlobalListener({
    contextKey,
    listenerKey,
    initialValue,
  });
  const renderCounter = useRenderCounter();

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

export default PrintableListenerDiv