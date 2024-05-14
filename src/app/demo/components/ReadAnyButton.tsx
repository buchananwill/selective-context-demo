"use client";
import { ContextKeys } from "@/app/demo/literals/contextKeys";
import { useGlobalDispatch, useGlobalReadAny } from "selective-context";
import { metaContextKey } from "@/app/demo/components/ReadAnyDiv";
import ReRenderListener from "@/app/demo/components/ReRenderListener";
import {useRenderCounter} from "@/app/demo/utils/useRenderCounter";

export const choicesArray = Object.values(ContextKeys).filter(
  (value) => value !== ContextKeys.LogContent,
);

export default function ReadAnyButton() {
  let globalRead = useGlobalReadAny<string>();
  let { dispatchWithoutListen } = useGlobalDispatch(metaContextKey);
  let renderCounter = useRenderCounter();

  return (
    <div className={"w-full border-2 rounded-lg items-center p-1 pl-4 flex"}>
      <label className={"w-full select-none"}>
        Read any state:
        <select
          id={"read-any-dropdown"}
          onChange={(e) => {
            dispatchWithoutListen(`${globalRead(e.target.value)}`);
          }}
          className={'outline-blue-400 outline-offset-2 hover:opacity-75 bg-sky-100 rounded-lg p-1 cursor-pointer'}
          // style={{backgroundColor: theme.base0C}}
        >
          {choicesArray.map((choice) => (
            <option key={choice} value={choice} className={'p-1'}>
              {choice}
            </option>
          ))}
        </select>
      </label>
        <ReRenderListener parentComponent={'read-any-button'} renderCount={renderCounter}/>
    </div>
  );
}
