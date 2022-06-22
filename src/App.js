import * as React from "react";
import "./App.css";
import {
  registerToSelectionChange,
  getRewriteResults,
} from "./lib/editorUtils";

function App() {
  const [suggestions, setSuggestion] = React.useState(null);
  const [selectedText, setSelectedText] = React.useState("");
  const [coords, setCoords] = React.useState({ top: 0, right: 0 });

  return (
    <div className="App">
      <header className="header">
        <button
          onClick={async () => {
            const selection = window.getSelection().toString();
            const suggestions = await getRewriteResults(selection).catch(() =>
              console.error("error")
            );
            setCoords(window.getSelection().getRangeAt(0).getClientRects()[0]);
            setSuggestion(suggestions);

            function closeSuggestion() {
              setSuggestion(null);
              document.removeEventListener("click", closeSuggestion);
            }

            document.addEventListener("click", closeSuggestion);
          }}
        >
          Show rewrite suggestions
        </button>
      </header>
      <div contentEditable={true} className="editor">
        this is my editor
      </div>
      <div
        style={{
          position: "absolute",
          top: coords.top + coords.height,
          right: coords.right - coords.width / 2,
        }}
      >
        {suggestions && (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {suggestions.map((item) => {
              return (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  {item}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
