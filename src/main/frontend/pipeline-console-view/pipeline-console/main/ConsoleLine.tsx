import linkifyHtml from "linkify-html";
import { memo } from "react";

import { linkifyJsOptions } from "../../../common/utils/linkify-js.ts";
import { makeReactChildren, tokenizeANSIString } from "./Ansi.tsx";

export interface ConsoleLineProps {
  lineNumber: string;
  content: string;
  stepId: string;
  startByte: number;
}

// Console output line
export const ConsoleLine = memo(function ConsoleLine(props: ConsoleLineProps) {
  return (
    <pre
      style={{ background: "none", border: "none" }}
      className="console-output-line"
      key={`console-line-pre${props.lineNumber}`}
    >
      <div className="console-output-line" key={`${props.lineNumber}-body`}>
        <a
          className="console-line-number"
          id={`log-${props.lineNumber}`}
          href={`?start-byte=${props.startByte}&selected-node=${props.stepId}#log-${props.lineNumber}`}
          style={{
            width: Math.max(9 * String(props.lineNumber).length, 30) + "px",
          }}
        >
          {props.lineNumber}
        </a>
        <div
          id={`${props.stepId}-${props.lineNumber}`}
          className="console-text"
        >
          {makeReactChildren(
            tokenizeANSIString(linkifyHtml(props.content, linkifyJsOptions)),
            `${props.stepId}-${props.lineNumber}`,
          )}
        </div>
      </div>
    </pre>
  );
});
