import { ControllerComponent } from "selective-context";
import PrintableListenerDiv from "@/app/demo/components/PrintableListenerDiv";
import { initialNthValue, valueContextKey } from "@/app/demo/literals/literals";
import {ClientFunctionWrapper, LogContent} from "@/app/demo/components/ClientFunctionWrapper";
import JsonListenerDiv from "@/app/demo/components/JsonListenerDiv";



export default function Page() {
  return (
    <div className={'flex-col py-8 gap-4'}>
      <ControllerComponent
        contextKey={valueContextKey}
        initialValue={initialNthValue}
      />
        <ControllerComponent contextKey={LogContent} initialValue={''}/>
        <h1 className={'text-lg font-semibold drop-shadow border-8 rounded-lg p-4 text-center mx-8 block mb-8'}>Selective Context Demo</h1>
      <div className={"grid gap-2 grid-cols-5 px-16"}>

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
    </div>
  );
}
