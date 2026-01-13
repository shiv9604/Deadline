const express = require('express');
const app = express();

// Deadline is of 24 hours since service started.
const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
const DEADLINE_TIMESTAMP = Date.now() + ONE_DAY_IN_MS;

app.get('/api/deadline', (_req, res) => {
  const secondsLeft = Math.max(
    Math.floor((DEADLINE_TIMESTAMP - Date.now()) / 1000),
    0
  );

  res.json({ secondsLeft });
});

app.listen(3000, () => {
  console.log('Backend running on http://localhost:3000');
});
