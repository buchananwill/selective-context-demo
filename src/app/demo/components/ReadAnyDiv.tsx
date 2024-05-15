import PrintableListenerDiv, {GenericDivProps} from "@/app/demo/components/PrintableListenerDiv";

import {PageListeners} from "@/app/demo/literals/listenerKeys";
import {ControllerComponent} from "selective-context";


export const metaContextKey = "content-of-any-context";

const placeholderReadAnyDivContent = "Select a key to read its current value.";
export default function ReadAnyDiv({...props }: GenericDivProps) {
  return (
    <>
      <ControllerComponent contextKey={metaContextKey} initialValue={placeholderReadAnyDivContent} />
      <PrintableListenerDiv
        {...props}
        contextKey={metaContextKey}
        listenerKey={PageListeners.readAnyDiv}
        initialValue={placeholderReadAnyDivContent}
        data-testid={PageListeners.readAnyDiv}
      />
    </>
  );
}