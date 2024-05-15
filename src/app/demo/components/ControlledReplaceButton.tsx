'use client'

import {MemoizedSupplier} from "@/app/demo/types/memoizedFunction";
import {useRenderCounter} from "@/app/demo/utils/useRenderCounter";
import ReRenderListener from "@/app/demo/components/ReRenderListener";
import {SelectiveContextParams} from "selective-context/dist/types";
import {useGlobalDispatch, useGlobalListener} from "selective-context";

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
  const renderCounter = useRenderCounter();
  const {
    currentState: {get },
  } = useGlobalListener({ contextKey, listenerKey, initialValue });
  const { dispatchWithoutListen } = useGlobalDispatch<T>(consumerContextKey);
  return (
    <button
      onClick={() => {
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
