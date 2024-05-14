"use client";
import { ControllerComponent } from "selective-context";
import { initialFunction } from "@/app/demo/utils/mathFunctions";
import { memoizedSwapFunction } from "@/app/demo/utils/swapMathFunction";
import { PropsWithChildren } from "react";
import ControlledMergeButton from "@/app/demo/components/ControlledMergeButton";
import FunctionListenerDiv from "@/app/demo/components/FunctionListenerDiv";
import { useLogStore } from "@/app/demo/utils/csvLogCollector";
import ControlledReplaceButton from "@/app/demo/components/ControlledReplaceButton";
import {
    FunctionContextKey,
    LogContent,
    LogSupplier,
    ReRenderTracker, SwapContextKey, NthTerm,
} from "@/app/demo/literals/contextKeys";
import { wrapper } from "@/app/demo/literals/logFormat";
import ReRenderListener from "@/app/demo/components/ReRenderListener";
import {useRenderCounter} from "@/app/demo/utils/useRenderCounter";

const buttonClassNames =
  "border-2 drop-shadow text-lg bg-sky-300 rounded-lg hover:bg-sky-400 group";

const arrowAnimate = "inline-block transition-transform";

const horizontalAnimate = " group-hover:translate-x-1";

const listenerKeys = {
  updateLogButton: "update-log-readout-button",
  swapFunctionButton: "swap-button",
  functionalListenerDiv: "mode-display",
  applyFunctionButton: "apply-button",
};

export function ClientFunctionWrapper({ children }: PropsWithChildren) {
  let [addLog, getLog] = useLogStore(wrapper);
  let renderCounter = useRenderCounter();

  return (
    <>
      <ControllerComponent
        contextKey={FunctionContextKey}
        initialValue={initialFunction}
      />
      <ControllerComponent contextKey={ReRenderTracker} initialValue={addLog} />
      <ControllerComponent contextKey={LogSupplier} initialValue={getLog} />
      <ControlledReplaceButton
        className={buttonClassNames}
        consumerContextKey={LogContent}
        contextKey={LogSupplier}
        listenerKey={listenerKeys.updateLogButton}
        initialValue={getLog}
      >
        Update Log Readout{" "}
        <div className={"rotate-90 group-hover:translate-y-1 " + arrowAnimate}>
          -{">"}
        </div>
      </ControlledReplaceButton>
      <ControllerComponent
        contextKey={SwapContextKey}
        initialValue={memoizedSwapFunction}
      />
      <ControlledMergeButton
        className={buttonClassNames}
        valueContextKey={FunctionContextKey}
        contextKey={SwapContextKey}
        listenerKey={listenerKeys.swapFunctionButton}
        initialValue={memoizedSwapFunction}
      >
        Swap <div className={arrowAnimate + horizontalAnimate}>-{">"}</div>
      </ControlledMergeButton>
      <FunctionListenerDiv
        contextKey={FunctionContextKey}
        listenerKey={listenerKeys.functionalListenerDiv}
        initialValue={initialFunction}
        className={
          "text-center text-purple-800 drop-shadow border-b-4 border-r-2 rounded-lg bg-gradient-to-tl from-sky-200 to-purple-300 cursor-default select-none "
        }
      />
      <ControlledMergeButton
        className={buttonClassNames}
        valueContextKey={NthTerm}
        contextKey={FunctionContextKey}
        listenerKey={listenerKeys.applyFunctionButton}
        initialValue={initialFunction}
      >
        Apply <div className={arrowAnimate + horizontalAnimate}>-{">"}</div>
      </ControlledMergeButton>

      {children}
        <ReRenderListener parentComponent={'client-function-wrapper'} renderCount={renderCounter}/>
    </>
  );
}
