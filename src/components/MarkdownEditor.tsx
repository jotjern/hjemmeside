import React from "react";

import {
  BoldExtension,
  CodeBlockExtension,
  HeadingExtension,
  ItalicExtension,
  MarkdownExtension,
  UnderlineExtension,
} from "remirror/extensions";
import {
  Remirror,
  useRemirror,
  OnChangeJSON,
  EditorComponent,
} from "@remirror/react";
import {
  ToggleBoldButton,
  ToggleCodeBlockButton,
  ToggleHeadingButton,
  ToggleItalicButton,
  Toolbar,
} from "@remirror/react-ui";

import python from "refractor/python";

const extensions = () => [
  new BoldExtension({}),
  new ItalicExtension(),
  new UnderlineExtension(),
  new MarkdownExtension({}),
  new CodeBlockExtension({
    supportedLanguages: [python],
  }),
  new HeadingExtension({
    levels: [1, 2, 3, 4, 5, 6],
    defaultLevel: 1,
  }),
];

export const Editor = ({ markdown }: { markdown?: string }) => {
  const { manager, state, getContext } = useRemirror({
    extensions,
    content: markdown ?? "",
    stringHandler: "markdown",
    selection: "end",
  });

  return (
    <Remirror manager={manager} initialContent={state}>
      <Toolbar className="grid gap-2">
        <ToggleBoldButton />
        <ToggleItalicButton />
        <ToggleHeadingButton attrs={{ level: 1 }} />
        <ToggleHeadingButton attrs={{ level: 2 }} />
        <ToggleHeadingButton attrs={{ level: 3 }} />
        <ToggleCodeBlockButton />
        <button
          onClick={() => {
            const context = getContext();
            console.log(context);
            context?.commands.updateCodeBlock({ language: "python" });
          }}
        >
          Toggle Bold
        </button>
      </Toolbar>
      <EditorComponent />
      <OnChangeJSON onChange={(json) => console.log(json)} />
    </Remirror>
  );
};
