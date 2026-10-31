const Neuron = {
  reduceMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  sigmoid: (z) => 1 / (1 + Math.exp(-z)),
  relu: (z) => Math.max(0, z),
  clamp: (value, low, high) => Math.min(high, Math.max(low, value)),
  format: (value) => (value < 0 ? "\u2212" : "") + Math.abs(value).toFixed(2),
  svg(tag, attributes = {}, parent) {
    const element = document.createElementNS("http://www.w3.org/2000/svg", tag);
    for (const name in attributes) element.setAttribute(name, attributes[name]);
    if (parent) parent.appendChild(element);
    return element;
  },
  activateOnKey(element, handler) {
    element.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handler();
      }
    });
  }
};
