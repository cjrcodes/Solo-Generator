import React, { useState } from "react";

export default function Controls() {
    const [key, setKey] = useState('A')
    const [scale, setScale] = useState('Major')

    return (
        <div>
            <h2>Solo Generator</h2>
            <label>
                Key:
                <select value={key} onChange={(e) => setKey(e.target.value)}>
                    {['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'].map(k => (
                        <option key={k} value={k}>{k}</option>
                    ))}
                </select>
            </label>

            <label>
                Scale:
                <select value={ scale } onChange={(e) => setScale(e.target.value)}>
                    {['Major', 'Minor', 'Pentatonic', 'Blues', 'Dorian', 'Mixolydian'].map(s => (
                        <option key={s} value={s}>{s}</option>
                    ))}
                </select>
            </label>

            <button onClick={() => alert(`Key: ${key}, Scale: ${scale}`)}>
        Generate & Play Solo
    </button>
</div>
    );

}