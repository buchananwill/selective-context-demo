"use client"


import {ContextKeys} from "@/app/demo/literals/contextKeys";
import {theme} from "@/app/demo/components/JsonListenerDiv";
import {GenericDivProps} from "@/app/demo/components/PrintableListenerDiv";
import {useRenderCounter} from "@/app/demo/utils/useRenderCounter";
import ReRenderListener from "@/app/demo/components/ReRenderListener";
import {SubscribeToTwoContextsKey} from "@/app/demo/literals/listenerKeys";
import {useGlobalListenerGroup} from "selective-context";

const contextKeys = [ContextKeys.FunctionListenerPrintout, ContextKeys.NthTerm]

const discoColors = Object.entries(theme).filter(entry => entry[0].includes('base')).sort((a, b) => a[0].localeCompare(b[0]))

export default function SubscribeToTwoContexts(props:GenericDivProps) {
    const {currentState} = useGlobalListenerGroup<string | number>({contextKeys, initialValue: new Map(), listenerKey: 'double-listener'});
    const renderCounter = useRenderCounter();



    return (
      <div className={'col-span-3 grid grid-cols-3 gap-2 border-4 p-1 rounded-lg select-none'} style={{borderColor: discoColors[(renderCounter % 8 + 8)][1]}}>
          <div  {...props}>{`${currentState.get(contextKeys[0])}`}</div>
          <div {...props}>This group of divs are subscribed to two states.</div>
          <div  {...props}>{`${currentState.get(contextKeys[1])}`}</div>


          <ReRenderListener parentComponent={SubscribeToTwoContextsKey} renderCount={renderCounter}/>
      </div>
    );
}