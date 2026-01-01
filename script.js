const vInput = document.getElementById("voltage");
const iInput = document.getElementById("current");
const rInput = document.getElementById("resistance");
const pInput = document.getElementById("power");
const resultsEl = document.getElementById("results");

document.getElementById("calcBtn").addEventListener("click", () => {
  const V = parseFloat(vInput.value);
  const I = parseFloat(iInput.value);
  const R = parseFloat(rInput.value);
  const P = parseFloat(pInput.value);

  const known = [!isNaN(V), !isNaN(I), !isNaN(R), !isNaN(P)].filter(Boolean).length;
  resultsEl.innerHTML = "";

  if (known < 2) {
    resultsEl.innerHTML = "<li>Please enter at least two known values.</li>";
    return;
  }

  let v = V, i = I, r = R, p = P;

  if (!isNaN(v) && !isNaN(i)) {
    r = v / i;
    p = v * i;
  } else if (!isNaN(v) && !isNaN(r)) {
    i = v / r;
    p = v * i;
  } else if (!isNaN(i) && !isNaN(r)) {
    v = i * r;
    p = v * i;
  } else if (!isNaN(v) && !isNaN(p)) {
    i = p / v;
    r = v / i;
  } else if (!isNaN(i) && !isNaN(p)) {
    v = p / i;
    r = v / i;
  } else if (!isNaN(r) && !isNaN(p)) {
    i = Math.sqrt(p / r);
    v = i * r;
  }

  const lines = [];
  if (!isNaN(v)) lines.push(`Voltage V ≈ ${v.toFixed(3)} V`);
  if (!isNaN(i)) lines.push(`Current I ≈ ${i.toFixed(3)} A`);
  if (!isNaN(r)) lines.push(`Resistance R ≈ ${r.toFixed(3)} Ω`);
  if (!isNaN(p)) lines.push(`Power P ≈ ${p.toFixed(3)} W`);

  if (!lines.length) {
    resultsEl.innerHTML = "<li>Could not compute values. Check inputs.</li>";
    return;
  }

  resultsEl.innerHTML = lines.map((t) => `<li>${t}</li>`).join("");
});

document.getElementById("clearBtn").addEventListener("click", () => {
  vInput.value = "";
  iInput.value = "";
  rInput.value = "";
  pInput.value = "";
  resultsEl.innerHTML = "";
});
