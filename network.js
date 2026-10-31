(function () {
  const layerSizes = [3, 4, 2];
  const layerNames = ["Input", "Hidden", "Output"];
  const weights = [
    null,
    [[1.5, -0.5, 0.5], [-0.5, 1.8, -0.5], [0.3, -0.4, 1.6], [0.6, 0.6, 0.6]],
    [[1.4, -1.5, 1.4, 0], [-1.0, 1.6, -0.8, 0.2]]
  ];
  const biases = [null, [-0.3, -0.3, -0.3, -0.3], [-0.5, -0.3]];
  const functions = { sigmoid: Neuron.sigmoid, relu: Neuron.relu, tanh: Math.tanh };
  const format = Neuron.format;

  const diagram = document.getElementById("network-diagram");
  const edgeLayer = Neuron.svg("g", {}, diagram);
  const nodeLayer = Neuron.svg("g", {}, diagram);
  const choice = document.getElementById("activation-choice");
  const columns = [90, 300, 510];
  const positions = layerSizes.map((count, layer) =>
    Array.from({ length: count }, (_, index) => ({ x: columns[layer], y: 160 + (index - (count - 1) / 2) * 72 }))
  );

  const edges = [[], [], []];
  for (let layer = 1; layer < 3; layer++) {
    positions[layer].forEach((to, j) => {
      positions[layer - 1].forEach((from, i) => {
        const weight = weights[layer][j][i];
        edges[layer].push(Neuron.svg("line", {
          class: "edge", x1: from.x, y1: from.y, x2: to.x, y2: to.y,
          stroke: weight >= 0 ? "#3b6b6f" : "#c4872a",
          "stroke-width": 1 + Math.abs(weight) * 2.2
        }, edgeLayer));
      });
    });
  }

  let selected = { layer: 1, index: 0 };
  const nodes = positions.map((column, layer) =>
    column.map((point, index) => {
      const node = Neuron.svg("circle", {
        class: "node", cx: point.x, cy: point.y, r: 22, tabindex: 0, role: "button",
        "aria-label": layerNames[layer] + " neuron " + (index + 1)
      }, nodeLayer);
      const choose = () => { selected = { layer, index }; draw(shown); describe(); };
      node.addEventListener("click", choose);
      Neuron.activateOnKey(node, choose);
      return node;
    })
  );
  layerNames.forEach((name, layer) => {
    const label = Neuron.svg("text", { x: columns[layer], y: 330, "text-anchor": "middle", "font-size": 16, fill: "#262b2a" }, diagram);
    label.textContent = name + " layer";
  });

  const inputSliders = [0, 1, 2].map((i) => document.getElementById("input-" + i));
  let values = [];
  let sums = [];
  let shown = 2;
  let timers = [];

  function compute() {
    const activation = functions[choice.value];
    values = [inputSliders.map((slider) => parseFloat(slider.value))];
    sums = [[]];
    for (let layer = 1; layer < 3; layer++) {
      sums[layer] = weights[layer].map((row, j) => row.reduce((total, w, i) => total + w * values[layer - 1][i], biases[layer][j]));
      values[layer] = sums[layer].map((z) => (layer === 2 ? Neuron.sigmoid(z) : activation(z)));
    }
  }

  function draw(stage) {
    shown = stage;
    nodes.forEach((column, layer) => column.forEach((node, index) => {
      const active = layer <= stage;
      node.setAttribute("fill", active ? "#3b6b6f" : "#fbf7ee");
      node.setAttribute("fill-opacity", active ? 0.12 + 0.88 * Neuron.clamp(Math.abs(values[layer][index]), 0, 1) : 1);
      node.classList.toggle("selected", layer === selected.layer && index === selected.index);
    }));
    edges.forEach((group, layer) => group.forEach((edge) => edge.setAttribute("opacity", layer <= stage ? 0.9 : 0.12)));
  }

  function describe() {
    const { layer, index } = selected;
    const title = document.getElementById("detail-title");
    const sum = document.getElementById("detail-sum");
    const output = document.getElementById("detail-output");
    title.textContent = layerNames[layer] + " neuron " + (index + 1);
    if (layer === 0) {
      sum.textContent = "This input is set to " + format(values[0][index]) + ". Input neurons only hold the data entering the network.";
      output.textContent = "";
      return;
    }
    const terms = weights[layer][index].map((w, i) => format(w) + " \u00d7 " + format(values[layer - 1][i])).join(" + ");
    sum.textContent = "z = " + terms + " + " + format(biases[layer][index]) + " = " + format(sums[layer][index]);
    output.textContent = "output = " + (layer === 2 ? "sigmoid" : choice.value) + "(z) = " + format(values[layer][index]);
  }

  function showOutputs() {
    const [a, b] = values[2];
    document.getElementById("output-a-label").textContent = "Cat score: " + format(a);
    document.getElementById("output-b-label").textContent = "Dog score: " + format(b) + (a === b ? "" : "   Best guess: " + (a > b ? "cat" : "dog"));
    document.getElementById("output-a-meter").style.width = a * 100 + "%";
    document.getElementById("output-b-meter").style.width = b * 100 + "%";
  }

  function refresh() {
    timers.forEach(clearTimeout);
    inputSliders.forEach((slider, i) => { document.getElementById("input-" + i + "-value").textContent = format(parseFloat(slider.value)); });
    compute();
    draw(2);
    describe();
    showOutputs();
    drawActivation();
  }

  function drawActivation() {
    const f = functions[choice.value];
    let path = "";
    for (let step = 0; step <= 80; step++) {
      const z = -4 + step / 10;
      const x = 100 + z * 22.5;
      const y = 85 - Neuron.clamp(f(z), -1.2, 3) * 30;
      path += (step ? "L" : "M") + x.toFixed(1) + " " + y.toFixed(1);
    }
    document.getElementById("activation-curve").setAttribute("d", path);
  }

  inputSliders.forEach((slider) => slider.addEventListener("input", refresh));
  choice.addEventListener("change", refresh);
  document.getElementById("send-button").addEventListener("click", () => {
    timers.forEach(clearTimeout);
    if (Neuron.reduceMotion) { draw(2); return; }
    draw(0);
    timers = [setTimeout(() => draw(1), 800), setTimeout(() => draw(2), 1600)];
  });
  refresh();

  const data = [[1, 2.2], [2, 3.9], [3, 6.3], [4, 7.8]];
  const learningRate = 0.03;
  const scaleX = (x) => 40 + x * 68;
  const scaleY = (y) => 230 - y * 21;
  const errorGroup = document.getElementById("error-lines");
  const fitLine = document.getElementById("fit-line");
  const pointGroup = document.getElementById("data-points");
  data.forEach(([x, y]) => Neuron.svg("circle", { cx: scaleX(x), cy: scaleY(y), r: 7 }, pointGroup));
  const errorLines = data.map(() => Neuron.svg("line", {}, errorGroup));
  const predictSlider = document.getElementById("predict-input");
  let w, b, steps, runner;

  function resetModel() {
    clearInterval(runner);
    w = 0.5; b = 0; steps = 0;
    renderModel();
  }

  function renderModel() {
    fitLine.setAttribute("x1", scaleX(0)); fitLine.setAttribute("y1", scaleY(b));
    fitLine.setAttribute("x2", scaleX(5)); fitLine.setAttribute("y2", scaleY(5 * w + b));
    let loss = 0;
    data.forEach(([x, y], i) => {
      const guess = w * x + b;
      loss += (guess - y) ** 2 / data.length;
      errorLines[i].setAttribute("x1", scaleX(x)); errorLines[i].setAttribute("x2", scaleX(x));
      errorLines[i].setAttribute("y1", scaleY(y)); errorLines[i].setAttribute("y2", scaleY(guess));
    });
    document.getElementById("model-line").textContent = "Prediction rule: output = " + format(w) + " \u00d7 x + " + format(b) + "   (steps trained: " + steps + ")";
    document.getElementById("loss-line").textContent = "Loss (average squared mistake): " + format(loss);
    const x = parseFloat(predictSlider.value);
    document.getElementById("predict-value").textContent = x.toFixed(1);
    document.getElementById("predict-line").textContent = "For x = " + x.toFixed(1) + ", the neuron predicts " + format(w * x + b);
  }

  function trainStep() {
    let gradientW = 0, gradientB = 0;
    data.forEach(([x, y]) => {
      const error = w * x + b - y;
      gradientW += (2 * error * x) / data.length;
      gradientB += (2 * error) / data.length;
    });
    w -= learningRate * gradientW;
    b -= learningRate * gradientB;
    steps++;
    renderModel();
  }

  document.getElementById("step-button").addEventListener("click", trainStep);
  document.getElementById("run-button").addEventListener("click", () => {
    clearInterval(runner);
    if (Neuron.reduceMotion) { for (let i = 0; i < 40; i++) trainStep(); return; }
    let remaining = 40;
    runner = setInterval(() => {
      trainStep();
      if (--remaining === 0) clearInterval(runner);
    }, 70);
  });
  document.getElementById("reset-button").addEventListener("click", resetModel);
  predictSlider.addEventListener("input", renderModel);
  resetModel();
})();
