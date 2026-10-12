# Browser Wellness Coach

A browser-based daily wellness check-in. Enter sleep, water intake, and steps
to get a weighted score, a rule-based coaching message, and a session history.

## What It Does

- Accepts sleep hours, water glasses, and step count
- Calculates a transparent weighted score out of 100
- Shows whether the score reaches the configured threshold
- Generates a coaching message based on the entered values
- Keeps check-ins in a history table for the current browser session

## Setup

No installation or build step is required. Open `index.html` in a modern
browser.

## Usage

Open `index.html`, enter values in the form, and select **Get today's
check-in**. For example, enter 8 sleep hours, 9 glasses of water, and 11,000
steps. Select **Clear history** to remove session entries.

## Sample Output

```text
Score: 94/100 — threshold reached.
Strong inputs today. Keep the pattern consistent.
```

## Stack

HTML, CSS, JavaScript

The score is a teaching heuristic—not an AI model, calibrated probability,
medical assessment, or health recommendation. All calculations run locally in
the browser; no data is sent or saved.
