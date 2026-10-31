# Neuron: Understanding Artificial Neural Networks, One Neuron at a Time

An interactive two-page website that explains neural networks the way you would explain them to an intelligent 10-year-old. It starts with a familiar experience, introduces the biological neuron, and builds step by step to a working network and the idea of training.

Built for the Website Designing and Development Competition at Pixel Contest 5.0. Theme: Neural Networks.

## The learning journey

**Page one: The biological beginning (`index.html`)**
- Opens with a question: how does something learn?
- An interactive biological neuron. Select the dendrites, cell body, axon or synapse, or send a signal through the whole cell.
- A slider that gradually turns the biological neuron into an artificial one, with a table matching each part to its model equivalent.
- The artificial neuron explained one piece at a time (inputs, weights, bias, activation function, output), each with an everyday analogy and a note on where the analogy stops being accurate.
- A live "Should I go to the park?" neuron with sliders and numbers that update as you change them.

**Page two: Inside the artificial mind (`network.html`)**
- A network with input, hidden and output layers. Change the inputs, send the signal forward layer by layer, and select any neuron to see its exact calculation.
- The weighted sum explained in plain words first, then shown as `z = wx + b`.
- A selector for the hidden-layer activation function (sigmoid, ReLU, tanh) with a live graph.
- A training demo that separates making a prediction from learning: a single neuron adjusts its weight and bias, and the loss falls as it improves.
- Real-world applications and an honest list of what neural networks cannot do.

## Project structure

| File | Purpose |
| --- | --- |
| `index.html` | Page one |
| `network.html` | Page two |
| `styles.css` | Shared styling for both pages |
| `shared.js` | Shared helpers: activation functions, SVG creation, keyboard activation, reduced-motion check |
| `neuron.js` | Interactions for page one |
| `network.js` | Interactions for page two |

## Technology

HTML5, CSS3 and vanilla JavaScript only. No frameworks, build step, backend or database. The only external resource is the Google Fonts stylesheet (Young Serif and Atkinson Hyperlegible); system fonts are used as fallbacks if it cannot load.

## Design

- Palette: warm cream, muted sage, dusty teal, charcoal and restrained amber, with lighter and darker sections alternating for rhythm.
- Typography: Young Serif for expressive headings and Atkinson Hyperlegible for body text, chosen for readability.
- All illustrations are hand-written SVG. There are no stock images, templates, gradients or decorative particle effects.
- Each interaction exists to teach one idea.

## Accessibility

- Semantic HTML with labelled controls and live regions for changing explanations.
- Every interactive part, including the neuron drawing and the network nodes, is reachable and operable by keyboard.
- Visible focus outlines and text colours chosen for sufficient contrast.
- Respects `prefers-reduced-motion`: animations are skipped and results appear immediately.
- Responsive layout for desktop and mobile.

## Scientific accuracy

The biological neuron is a simplified drawing, and the artificial neuron is a simplified mathematical model that captures only some aspects of how real neurons work. Each analogy is followed by where it stops being accurate. The weights in the cat and dog network are set by hand to illustrate the idea; real networks learn their weights through training.

## Running and hosting

Open `index.html` in any modern browser. To host, upload the contents of this folder to Vercel, Netlify or GitHub Pages, with `index.html` at the top level. No configuration is needed.

## Originality

All text, illustrations, styling and code were written from scratch for this competition. No templates or existing website designs were used.
