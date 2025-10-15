# 251015_-

## Global Timer Experience

- ✨ Modern glassmorphism clock with AM/PM layout and millisecond precision.
- 🌐 Interactive world map lets you jump between major city timezones with a single click.
- 🔁 Impact animations fire every time seconds or minutes roll over for a punchy feel.
- 🌞 Day/night status indicators pulse around each city so you instantly know who is awake.
- 🈳 Instant language toggle between 한국어 and English across the entire interface.

## Getting Started

1. Open `timer/index.html` in a modern desktop browser (Chrome, Edge, Firefox, or Safari).
2. Click a city beacon on the map to switch the active timezone.
3. Use the `English / 한국어` toggle to change the interface language.

## Design Notes

- Time formatting uses 12-hour style with bold separators, a dedicated AM/PM pill, and a trimmed millisecond rail.
- Minute and second digits receive a quick scale and glow animation on every change to emphasize tempo.
- The map fuses a subdued SVG silhouette with animated city pulses; markers brighten on hover and selection.
- Timezone names automatically show the current GMT offset for the selected city.
- Daytime cities glow in teal, nighttime cities cool to deep blue, with labels that localize per language choice.

## Customization Tips

- Add more cities: duplicate a `.city` button in `timer/index.html`, set `data-city-key` and `data-timezone`, then extend `cityDictionary` in `timer/script.js`.
- Adjust animation intensity: tweak the `--impact-shadow` or `@keyframes impact` settings inside `timer/styles.css`.
- Change the update frequency: modify the `setInterval(updateClock, 75);` line in `timer/script.js` if you prefer a different refresh cadence.
