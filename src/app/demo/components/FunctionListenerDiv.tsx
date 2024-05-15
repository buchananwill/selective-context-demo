"use client";







import {MemoizedFunction} from "@/app/demo/types/memoizedFunction";
import PrintableListenerDiv, {GenericDivProps} from "@/app/demo/components/PrintableListenerDiv";
import {FunctionListenerPrintout} from "@/app/demo/literals/contextKeys";
import {useEffect} from "react";
import {initialFunction, otherFunction} from "@/app/demo/utils/mathFunctions";
import {ControllerComponent, useGlobalDispatch, useGlobalListener} from "selective-context";
import {SelectiveContextParams} from "selective-context/dist/types";

const listenerKeyPrintable = "prints-function-type";
export const initialFunctionLabel = "Simple";
export const chaoticLabel = "Chaotic";
export default function FunctionListenerDiv({
  contextKey,
  listenerKey,
  initialValue,
  children,
  ...divProps
}: SelectiveContextParams<MemoizedFunction<number, number>> & GenericDivProps) {
  const { currentState } = useGlobalListener({
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
          ? chaoticLabel
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
