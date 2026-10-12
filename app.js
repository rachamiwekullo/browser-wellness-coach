const form = document.querySelector("#coach-form");
const result = document.querySelector("#result");
const table = document.querySelector("#history-table");
const tableBody = table.querySelector("tbody");
const emptyState = document.querySelector("#empty-state");
const clearButton = document.querySelector("#clear-history");
const history = [];

function predictGoal(sleepHours, waterGlasses, steps) {
  const sleepScore = Math.min(sleepHours / 8, 1) * 35;
  const waterScore = Math.min(waterGlasses / 10, 1) * 25;
  const stepsScore = Math.min(steps / 12_000, 1) * 40;
  const score = Math.round(sleepScore + waterScore + stepsScore);
  return { score, hitGoal: score >= 60 };
}

function getCoaching(sleepHours, waterGlasses, hitGoal) {
  if (hitGoal && sleepHours >= 7 && waterGlasses >= 8) {
    return "Strong inputs today. Keep the pattern consistent.";
  }
  if (hitGoal) return "You reached the score threshold. Consider improving sleep or hydration.";
  if (sleepHours < 7) return "Sleep was below the practice target. Consider making room for rest.";
  if (waterGlasses < 8) return "Hydration was below the practice target. Keep water accessible.";
  return "Your inputs looked solid; review your schedule and keep moving at a comfortable pace.";
}

function renderHistory() {
  tableBody.replaceChildren();
  for (const entry of history) {
    const row = document.createElement("tr");
    for (const value of [
      entry.time,
      `${entry.sleep} h`,
      `${entry.water}`,
      entry.steps.toLocaleString(),
      `${entry.score}/100`,
      entry.hitGoal ? "Threshold reached" : "Below threshold",
    ]) {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.append(cell);
    }
    tableBody.append(row);
  }
  table.hidden = history.length === 0;
  emptyState.hidden = history.length !== 0;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;

  const values = new FormData(form);
  const sleep = Number(values.get("sleep"));
  const water = Number(values.get("water"));
  const steps = Number(values.get("steps"));
  const prediction = predictGoal(sleep, water, steps);
  const coaching = getCoaching(sleep, water, prediction.hitGoal);

  result.textContent = `Score: ${prediction.score}/100 — ${
    prediction.hitGoal ? "threshold reached" : "below threshold"
  }. ${coaching}`;
  history.unshift({
    time: new Date().toLocaleTimeString(),
    sleep,
    water,
    steps,
    ...prediction,
  });
  renderHistory();
});

clearButton.addEventListener("click", () => {
  history.length = 0;
  renderHistory();
  result.textContent = "History cleared.";
});
