"use client";
import { ControllerComponent } from "selective-context";
import { initialFunction } from "@/app/demo/utils/mathFunctions";
import { memoizedSwapFunction } from "@/app/demo/utils/swapMathFunction";
import {
  functionContextKey,
  swapContextKey,
  valueContextKey,
} from "@/app/demo/literals/literals";
import { PropsWithChildren } from "react";
import ControlledMergeButton from "@/app/demo/components/ControlledMergeButton";
import FunctionListenerDiv from "@/app/demo/components/FunctionListenerDiv";
import { useLogStore } from "@/app/demo/utils/logCollector";
import ControlledReplaceButton from "@/app/demo/components/ControlledReplaceButton";

export const ReRenderTracker = "re-render-tracker";

export const LogContent = "log-content";

export const LogSupplier = "LogSupplier";

const buttonClassNames = "border-2 drop-shadow text-lg bg-sky-300 rounded-lg hover:bg-sky-400 group";

const arrowAnimate = 'inline-block transition-transform';

const horizontalAnimate = ' group-hover:translate-x-1';

const logHeader = '{ "name": "log", "logEntries": ['
const logFooter = ']}'
const wrapper = {header: logHeader, footer: logFooter}

export function ClientFunctionWrapper({ children }: PropsWithChildren) {
  let [addLog, getLog] = useLogStore(wrapper);

    return (
    <>
      <ControllerComponent
        contextKey={functionContextKey}
        initialValue={initialFunction}
      />
      <ControllerComponent contextKey={ReRenderTracker} initialValue={addLog} />
      <ControllerComponent contextKey={LogSupplier} initialValue={getLog} />
        <ControlledReplaceButton className={buttonClassNames} consumerContextKey={LogContent} contextKey={LogSupplier} listenerKey={'consume-logs-button'} initialValue={getLog}>
            Update Log Readout <div className={'rotate-90 group-hover:translate-y-1 ' + arrowAnimate}>-{">"}</div>
        </ControlledReplaceButton>
      <ControllerComponent
        contextKey={swapContextKey}
        initialValue={memoizedSwapFunction}
      />
      <ControlledMergeButton
        className={buttonClassNames}
        valueContextKey={functionContextKey}
        contextKey={swapContextKey}
        listenerKey={"swap-button"}
        initialValue={memoizedSwapFunction}
      >
        Swap <div className={arrowAnimate + horizontalAnimate}>-{">"}</div>
      </ControlledMergeButton>
      <FunctionListenerDiv
        contextKey={functionContextKey}
        listenerKey={"mode-display"}
        initialValue={initialFunction}
        className={
          "text-center text-purple-800 drop-shadow border-b-4 border-r-2 rounded-lg bg-gradient-to-tl from-sky-200 to-purple-300 cursor-default select-none "
        }
      />
      <ControlledMergeButton
        className={buttonClassNames}
        valueContextKey={valueContextKey}
        contextKey={functionContextKey}
        listenerKey={"apply-button"}
        initialValue={initialFunction}
      >
        Apply <div className={arrowAnimate + horizontalAnimate}>-{">"}</div>
      </ControlledMergeButton>

      {children}
    </>
  );
}
