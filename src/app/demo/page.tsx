import { ControllerComponent } from "selective-context";
import PrintableListenerDiv from "@/app/demo/components/PrintableListenerDiv";
import { initialNthValue, valueContextKey } from "@/app/demo/literals/literals";
import {ClientFunctionWrapper, LogContent} from "@/app/demo/components/ClientFunctionWrapper";
import JsonListenerDiv from "@/app/demo/components/JsonListenerDiv";



export default function Page() {
  return (
    <>
      <ControllerComponent
        contextKey={valueContextKey}
        initialValue={initialNthValue}
      />
        <ControllerComponent contextKey={LogContent} initialValue={''}/>
      <div className={"grid gap-2 grid-cols-5 p-16"}>

          <ClientFunctionWrapper>
        <PrintableListenerDiv
          className={"border-2 text-xl rounded-lg text-right"}
          contextKey={valueContextKey}
          listenerKey={"listenerDiv"}
          initialValue={initialNthValue}
        />
          </ClientFunctionWrapper>
          <JsonListenerDiv className={'border-4 col-span-5 h-fit rounded-lg p-4 min-h-8'} contextKey={LogContent} listenerKey={'read-out-div'} initialValue={''}/>
      </div>
    </>
  );
}
