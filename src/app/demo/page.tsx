import { ControllerComponent } from "selective-context";
import PrintableListenerDiv from "@/app/demo/components/PrintableListenerDiv";
import {ClientFunctionWrapper} from "@/app/demo/components/ClientFunctionWrapper";
import JsonListenerDiv from "@/app/demo/components/JsonListenerDiv";
import {LogContent, NthTerm} from "@/app/demo/literals/contextKeys";
import ReadAnyDiv from "@/app/demo/components/ReadAnyDiv";
import ReadAnyButton from "@/app/demo/components/ReadAnyButton";
import {InitialNthValue} from "@/app/demo/literals/constants";
import React from "react";
import SubscribeToTwoContexts from "@/app/demo/components/SubscribeToTwoContexts";


const MemoDiv = React.memo(PrintableListenerDiv)

const someDivClassNames = 'border-2 rounded-lg place-content-center justify-center flex items-center p-1';
export default function Page() {
  return (
    <div className={'flex-col py-8 gap-4'}>
      <ControllerComponent
        contextKey={NthTerm}
        initialValue={InitialNthValue}
      />
        <ControllerComponent contextKey={LogContent} initialValue={'{}'}/>
        <h1 className={'text-lg font-semibold drop-shadow border-8 rounded-lg p-4 text-center mx-8 block mb-8'}>Selective Context Demo</h1>
      <div className={"grid gap-2 grid-cols-5 px-16"}>

          <ClientFunctionWrapper>
        <MemoDiv
          className={"border-2 text-xl rounded-lg text-right"}
          contextKey={NthTerm}
          listenerKey={"listenerDiv"}
          initialValue={InitialNthValue}
        />
          </ClientFunctionWrapper>
          <JsonListenerDiv className={'border-4 col-span-5 h-[60vh] overflow-y-scroll rounded-lg min-h-8 overflow-hidden bg-[#040000]'} contextKey={LogContent} listenerKey={'read-out-div'} initialValue={'{}'}/>
          <ReadAnyButton/>
          <ReadAnyDiv className={someDivClassNames}/>
          <SubscribeToTwoContexts className={someDivClassNames + ' border-red-300'}/>
      </div>
    </div>
  );
}
