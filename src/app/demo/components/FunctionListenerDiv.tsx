"use client";
import { SelectiveContextParams } from "selective-context/dist/types";
import {
  ControllerComponent,
  useGlobalDispatch,
  useGlobalListener,
} from "selective-context";
import React, { useEffect } from "react";
import PrintableListenerDiv, {
  GenericDivProps,
} from "@/app/demo/components/PrintableListenerDiv";
import { MemoizedFunction } from "@/app/demo/types/memoizedFunction";
import { initialFunction, otherFunction } from "@/app/demo/utils/mathFunctions";
import { FunctionListenerPrintout } from "@/app/demo/literals/contextKeys";

const listenerKeyPrintable = "prints-function-type";
const initialFunctionLabel = "Simple";
export default function FunctionListenerDiv({
  contextKey,
  listenerKey,
  initialValue,
  children, ref,
  ...divProps
}: SelectiveContextParams<MemoizedFunction<any, any>> & GenericDivProps) {
  let { currentState } = useGlobalListener({
    contextKey,
    listenerKey,
    initialValue,
  });
  const { dispatchWithoutListen } = useGlobalDispatch<string>(
    FunctionListenerPrintout,
  );

  useEffect(() => {
    dispatchWithoutListen(
      currentState === initialFunction
        ? initialFunctionLabel
        : currentState === otherFunction
          ? "Chaotic"
          : "Unexpected!",
    );
  }, [currentState, dispatchWithoutListen]);

  return (
    <>
      <PrintableListenerDiv
        {...divProps}
        contextKey={FunctionListenerPrintout}
        listenerKey={`${listenerKey}:${listenerKeyPrintable}`}
        initialValue={initialFunctionLabel}
      >
        {children}
      </PrintableListenerDiv>
      <ControllerComponent
        contextKey={FunctionListenerPrintout}
        initialValue={initialFunctionLabel}
      />
    </>
  );
}
