(function () {
  const parts = {
    dendrites: ["Dendrites: the ears", "These branches listen. Thousands of other neurons whisper their messages here."],
    soma: ["Cell body: the decider", "It adds up all the whispers. If there are enough of them, it decides to shout."],
    axon: ["Axon: the long wire", "The shout travels down this wire. It is all or nothing: the neuron shouts at full volume or stays quiet."],
    synapse: ["Synapse: the handshake", "A tiny gap where the message jumps to the next cell. A strong handshake means that friend's message counts a lot. Handshakes get stronger with practice, which is how your bike riding got better."]
  };
  const groups = document.querySelectorAll("#biological-neuron [data-part]");
  const title = document.getElementById("part-title");
  const text = document.getElementById("part-text");
  let current = "";

  function selectPart(name) {
    if (name === current) return;
    current = name;
    groups.forEach((group) => group.classList.toggle("on", group.dataset.part === name));
    title.textContent = parts[name][0];
    text.textContent = parts[name][1];
  }

  groups.forEach((group) => {
    group.addEventListener("click", () => selectPart(group.dataset.part));
    Neuron.activateOnKey(group, () => selectPart(group.dataset.part));
  });

  const route = document.getElementById("signal-route");
  const pulse = document.getElementById("signal-pulse");
  document.getElementById("fire-button").addEventListener("click", () => {
    const order = ["dendrites", "soma", "axon", "synapse"];
    if (Neuron.reduceMotion) {
      order.forEach((name, index) => setTimeout(() => selectPart(name), index * 700));
      return;
    }
    const length = route.getTotalLength();
    const start = performance.now();
    const duration = 2600;
    pulse.setAttribute("opacity", "1");
    function step(now) {
      const progress = Math.min(1, (now - start) / duration);
      const point = route.getPointAtLength(progress * length);
      pulse.setAttribute("cx", point.x);
      pulse.setAttribute("cy", point.y);
      selectPart(progress < 0.3 ? "dendrites" : progress < 0.42 ? "soma" : progress < 0.8 ? "axon" : "synapse");
      if (progress < 1) requestAnimationFrame(step);
      else pulse.setAttribute("opacity", "0");
    }
    requestAnimationFrame(step);
  });

  const slider = document.getElementById("morph-slider");
  const biological = document.getElementById("morph-biological");
  const artificial = document.getElementById("morph-artificial");
  const caption = document.getElementById("morph-caption");
  slider.addEventListener("input", () => {
    const amount = slider.value / 100;
    biological.style.opacity = 1 - amount;
    artificial.style.opacity = amount;
    document.getElementById("morph-value").textContent = slider.value + "%";
    caption.textContent = amount < 0.34 ? "A biological neuron." : amount < 0.67 ? "The same shape, simplified." : "An artificial neuron: inputs, weights, a sum, an output.";
  });

  const ids = ["x1", "x2", "w1", "w2", "bias"];
  function update() {
    const v = {};
    ids.forEach((id) => {
      v[id] = parseFloat(document.getElementById(id).value);
      document.getElementById(id + "-value").textContent = Neuron.format(v[id]);
    });
    const f = Neuron.format;
    const z = v.w1 * v.x1 + v.w2 * v.x2 + v.bias;
    const output = Neuron.sigmoid(z);
    document.getElementById("sum-line").textContent = "z = (" + f(v.w1) + " \u00d7 " + f(v.x1) + ") + (" + f(v.w2) + " \u00d7 " + f(v.x2) + ") + " + f(v.bias) + " = " + f(z);
    document.getElementById("output-line").textContent = "output = sigmoid(z) = " + f(output) + (output > 0.6 ? ". The neuron says: go to the park!" : output < 0.4 ? ". The neuron says: stay home." : ". The neuron is not sure.");
    document.getElementById("output-meter").style.width = output * 100 + "%";
  }
  ids.forEach((id) => document.getElementById(id).addEventListener("input", update));
  update();
})();
