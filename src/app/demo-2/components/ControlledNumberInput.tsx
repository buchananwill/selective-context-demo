"use client";

import React from "react";

import { useRenderCounter } from "@/app/demo-2/utils/useRenderCounter";
import ReRenderListener from "@/app/demo-2/components/ReRenderListener";
import { GenericDivProps } from "@/app/demo-2/components/PrintableListenerDiv";
import {SelectiveContextParams} from "selective-context/dist/types";
import {useGlobalDispatchAndListener} from "selective-context";

export type GenericInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

interface slotProps {inputProps:  Omit<GenericInputProps, 'onChange' | 'value' | 'type'>, divProps: GenericDivProps, "data-testid": string }

function ControlledNumberInput(props: SelectiveContextParams<number> & Partial<slotProps>) {
    const {
        contextKey,
            listenerKey,
            initialValue,
            divProps, inputProps,
    } = props

    const { currentState, dispatchWithoutControl } = useGlobalDispatchAndListener({
    contextKey,
    listenerKey,
    initialValue,
  });
  const renderCounter = useRenderCounter();

  return (
    <div {...divProps}>
      <label className={'mr-1'} htmlFor={listenerKey}>Edit:
      </label>
      <input {...inputProps} type={'number'} data-testid={props["data-testid"]} id={listenerKey} value={currentState} onChange={(event) => dispatchWithoutControl(parseInt(event.target.value, 10) || 1)}/>
      <ReRenderListener
        parentComponent={`printable-listener-div:${contextKey}:${listenerKey}`}
        renderCount={renderCounter}
      />
    </div>
  );
}

export default ControlledNumberInput