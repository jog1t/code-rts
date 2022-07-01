import React from "react";
import { autocompletion } from "@codemirror/autocomplete";
import {
  SandpackCodeEditor,
  SandpackFileExplorer,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
} from "@codesandbox/sandpack-react";
import { TEMPLATE, FILES } from "./template";

function App() {
  return (
    <SandpackProvider
      theme="auto"
      files={FILES}
      customSetup={TEMPLATE}
      options={{ recompileDelay: 600 }}
    >
      <SandpackLayout>
        <SandpackFileExplorer autoHiddenFiles />
        <SandpackCodeEditor
          extensions={[autocompletion()]}
          showTabs
          closableTabs
          showInlineErrors
          showRunButton={false}
        />
        <SandpackPreview showOpenInCodeSandbox={false} />
      </SandpackLayout>
    </SandpackProvider>
  );
}

export default App;
