import { ControllerComponent } from "selective-context";
import PrintableListenerDiv, {GenericDivProps} from "@/app/demo/components/PrintableListenerDiv";

export const metaContextKey = "content-of-any-context";

export default function ReadAnyDiv({...props }: GenericDivProps) {
  return (
    <>
      <ControllerComponent contextKey={metaContextKey} initialValue={""} />
      <PrintableListenerDiv
        {...props}
        contextKey={metaContextKey}
        listenerKey={"listens-to-any-content"}
        initialValue={""}
      />{" "}
    </>
  );
}