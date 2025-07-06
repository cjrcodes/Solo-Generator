import React, { useState } from "react";
import * as Tone from "tone"; // make sure this is at the top of your file

export default function Controls() {
  const [key, setKey] = useState("A");
  const [scale, setScale] = useState("Major");

  const scales = {
    'Major': [0, 2, 4, 5, 7, 9, 11],
    'Minor Pentatonic': [0, 3, 5, 7, 10],
    'Blues': [0, 3, 4, 5, 7, 10],
    'Dorian': [0, 2, 3, 5, 7, 9, 10],
    'Mixolydian': [0, 2, 4, 5, 7, 9, 10],
  };

  const noteNames = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
  ];

  // Helper to get note index
  function getNoteIndex(note) {
    return noteNames.indexOf(note);
  }

  function playSolo() {
    const synth = new Tone.Synth().toDestination();
    const rootIndex = getNoteIndex(key);
    const scaleIntervals = scales[scale];
    const notes = [];

    // Generate 8 random notes from the scale
    for (let i = 0; i < 8; i++) {
      const interval =
        scaleIntervals[Math.floor(Math.random() * scaleIntervals.length)];
      const pitchIndex = (rootIndex + interval) % 12;
      const octave = 4 + Math.floor(Math.random() * 2); // random octave: 4 or 5
      const note = noteNames[pitchIndex] + octave;
      notes.push(note);
    }

    // Play notes in sequence
    Tone.start(); // resume audio context
    notes.forEach((note, i) => {
      const time = i * 0.4; // 0.4 seconds between notes
      synth.triggerAttackRelease(note, "8n", Tone.now() + time);
    });
  }

  return (
    <div>
      <h2>Solo Generator</h2>
      <label>
        Key:
        <select value={key} onChange={(e) => setKey(e.target.value)}>
          {[
            "C",
            "C#",
            "D",
            "D#",
            "E",
            "F",
            "F#",
            "G",
            "G#",
            "A",
            "A#",
            "B",
          ].map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>
      </label>

      <label>
        Scale:
        <select value={scale} onChange={(e) => setScale(e.target.value)}>
          {[
            "Major",
            "Minor Pentatonic",
            "Blues",
            "Dorian",
            "Mixolydian",
          ].map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </label>

      <button onClick={() => playSolo()}>Generate & Play Solo</button>
    </div>
  );
}
