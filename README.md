# Neuron: Understanding Artificial Neural Networks, One Neuron at a Time

## Live Website

**https://REPLACE-WITH-YOUR-LIVE-URL**

## What the Website Teaches

An interactive two-page website that explains neural networks the way you would explain them to an intelligent 10-year-old. It starts with learning to ride a bike, introduces the biological neuron, shows how scientists turned it into a simple mathematical model, and builds up to a working network and the idea of training. Each analogy is followed by where it stops being accurate, so the science stays honest.

## Main Features

**Page one: the biological beginning**
- An interactive biological neuron: select the dendrites, cell body, axon or synapse, or send a signal through the whole cell.
- A slider that turns the biological neuron into an artificial one.
- The artificial neuron explained one piece at a time: inputs, weights, bias, activation function and output.
- A live "Should I go to the park?" neuron with sliders and numbers that update instantly.

**Page two: inside the artificial mind**
- A network with input, hidden and output layers. Change the inputs, send the signal forward layer by layer, and select any neuron to see its exact calculation.
- The weighted sum explained in plain words, then shown as `z = wx + b`.
- A choice of activation function (sigmoid, ReLU, tanh) with a live graph.
- A training demo that separates making a prediction from learning, with the loss falling as the neuron improves.
- Real-world applications and what neural networks cannot do.

**Design and accessibility**
- Original SVG illustrations and a cream, sage, teal, charcoal and amber palette. No templates.
- Semantic HTML, keyboard-accessible controls, reduced-motion support, and a responsive layout for desktop and mobile.

## Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript (no frameworks, libraries, backend or build step)

Fonts (Young Serif and Atkinson Hyperlegible) load from Google Fonts, with system fonts as a fallback.

## Running Locally

1. Download or clone this repository.
2. Open `index.html` in any modern browser. No installation or build step is needed.
3. Optional: serve it locally with `python3 -m http.server`, then visit `http://localhost:8000`.

## Project Structure

- `index.html` and `network.html`: the two pages
- `styles.css`: shared styling
- `shared.js`: shared helpers
- `neuron.js`: page one interactions
- `network.js`: page two interactions

## Originality

All text, illustrations, styling and code were written from scratch for Pixel Contest 5.0.
