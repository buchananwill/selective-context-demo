'use client'
import {SelectiveContextParams} from "selective-context/dist/types";
import {ControllerComponent, useGlobalDispatch, useGlobalListener} from "selective-context";
import React, {useEffect} from "react";
import PrintableListenerDiv, {GenericDivProps} from "@/app/demo/components/PrintableListenerDiv";
import {MemoizedFunction} from "@/app/demo/types/memoizedFunction";
import {initialFunction, otherFunction} from "@/app/demo/utils/mathFunctions";

const functionListenerPrintout = 'function-listener-printout';
const listenerKeyPrintable = 'prints-function-type';
export default function FunctionListenerDiv({contextKey, listenerKey, initialValue, children, ...divProps}: SelectiveContextParams<MemoizedFunction<any, any>> & GenericDivProps) {
    let {currentState} = useGlobalListener({contextKey, listenerKey, initialValue});
    const { dispatchWithoutListen } = useGlobalDispatch<string>(
      functionListenerPrintout,
    );
    
    useEffect(() => {
        dispatchWithoutListen(
            currentState === initialFunction ? 'Simple' : currentState === otherFunction ? 'Chaotic' : 'Unexpected!'
        )
    }, [currentState, dispatchWithoutListen])

    return (
        <PrintableListenerDiv {...divProps} contextKey={functionListenerPrintout} listenerKey={listenerKeyPrintable} initialValue={''}>
            <ControllerComponent contextKey={functionListenerPrintout} initialValue={''}/>
            {children}
        </PrintableListenerDiv>
    )
}