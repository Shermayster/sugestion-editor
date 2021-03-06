// Dispatches the callback on every selection change
export function registerToSelectionChange(callback) {
  document.addEventListener("selectionchange", () => {
    const rects = Array.from(
      window.getSelection().getRangeAt(0).getClientRects()
    );
    callback(rects);
  });
}

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getRewriteResults(selectedText) {
  await timeout(150);
  const words = selectedText.split(" ");
  const randomize = () => words.sort(() => 0.5 - Math.random()).join(" ");
  return [1, 2, 3, 4, 5].map((i) => randomize());
}
