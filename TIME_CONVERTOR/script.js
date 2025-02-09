const express = require("express");
const fetch = require("node-fetch");
const app = express();

app.use(express.json());
app.use(express.static("public")); // Serve static files

const WORLD_TIME_API = "http://worldtimeapi.org/api/timezone";

app.get("/timezones", async (req, res) => {
  try {
    const response = await fetch(WORLD_TIME_API);
    const timeZones = await response.json();
    res.json(timeZones);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch time zones" });
  }
});

app.post("/convert-time", async (req, res) => {
  const { time, fromZone, toZone } = req.body;

  try {
    const fromResponse = await fetch(`${WORLD_TIME_API}/${fromZone}`);
    const toResponse = await fetch(`${WORLD_TIME_API}/${toZone}`);

    if (!fromResponse.ok || !toResponse.ok) {
      throw new Error("Invalid time zone");
    }

    const fromData = await fromResponse.json();
    const toData = await toResponse.json();

    const [hours, minutes] = time.split(":").map(Number);

    const fromOffset = fromData.utc_offset;
    const toOffset = toData.utc_offset;

    const fromTotalMinutes =
      parseInt(fromOffset.slice(1, 3)) * 60 + parseInt(fromOffset.slice(4, 6));
    const toTotalMinutes =
      parseInt(toOffset.slice(1, 3)) * 60 + parseInt(toOffset.slice(4, 6));

    const offsetDifference =
      (toOffset[0] === "+" ? 1 : -1) * toTotalMinutes -
      (fromOffset[0] === "+" ? 1 : -1) * fromTotalMinutes;

    const date = new Date();
    date.setUTCHours(hours);
    date.setUTCMinutes(minutes + offsetDifference);

    const convertedTime = date.toTimeString().slice(0, 5);

    res.json({ convertedTime });
  } catch (error) {
    res.status(500).json({ error: "Failed to convert time" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
