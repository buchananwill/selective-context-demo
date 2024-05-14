'use client'
import { ContextKeys } from "@/app/demo/literals/contextKeys";
import { useGlobalDispatch, useGlobalReadAny } from "selective-context";
import { metaContextKey } from "@/app/demo/components/ReadAnyDiv";

export const choicesArray = Object.values(ContextKeys).filter(value => value !== ContextKeys.LogContent);

export default function ReadAnyButton() {
    let useGlobalRead = useGlobalReadAny<string>();
    let {dispatchWithoutListen} = useGlobalDispatch(metaContextKey);

    return (
        <div className={'w-full border-2 rounded-lg items-center p-1 pl-4 flex'}><label className={'w-full'}>
            Read any state:
            <select id={"read-any-dropdown"} onChange={(e) => {
                dispatchWithoutListen(`${useGlobalRead(e.target.value)}`)
            }}>
                {choicesArray.map(choice => <option key={choice} value={choice}>{choice}</option>)}
            </select></label></div>
    )
}