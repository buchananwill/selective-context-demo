"use client";
import React from "react";
import { SelectiveContextParams } from "selective-context/dist/types";
import { useGlobalListener } from "selective-context";
import { useRenderCounter } from "@/app/demo/utils/useRenderCounter";
import ReRenderListener from "@/app/demo/components/ReRenderListener";
import { JSONTree } from "react-json-tree";
import { JsonView } from "react-json-view-lite";

export type GenericDivProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const theme = {
  scheme: 'monokai',
  author: 'Will Buchanan',
  base00: '#040000',
  base01: '#1e293b',
  base02: '#3f3f46',
  base03: '#52525b',
  base04: '#a1a1aa',
  base05: '#a8a29e',
  base06: '#e5e5e5',
  base07: '#ffffff',
  base08: '#ef4444',
  base09: '#fb923c',
  base0A: '#fde047',
  base0B: '#6ee7b7',
  base0C: '#67e8f9',
  base0D: '#93c5fd',
  base0E: '#d8b4fe',
  base0F: '#fda4af',
};

export default function JsonListenerDiv({
  contextKey,
  listenerKey,
  initialValue,
  children,
  ...divProps
}: SelectiveContextParams<string> & GenericDivProps) {
  let { currentState } = useGlobalListener({
    contextKey,
    listenerKey,
    initialValue,
  });
  let renderCounter = useRenderCounter();

  let data;

  try {
      data = JSON.parse(currentState)
  } catch (e) {
      console.warn(e)
  }

  return (
    <div {...divProps}>
      <div className={'w-full h-fit drop-shadow-md '}>{data && <JSONTree data={data} invertTheme={false} theme={{
        extend: theme,
        tree: {padding: "1rem", borderRadius: "0.5rem"}
      }}/>}
      {children}
      <ReRenderListener
        parentComponent={`printable-listener-div:${contextKey}:${listenerKey}`}
        renderCount={renderCounter}
      />
      </div>
    </div>
  );
}
