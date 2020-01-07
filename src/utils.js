function midiToFreq(midi) {
    return Math.pow(2, ((midi - 69) / 12)) * 440;
}

export {midiToFreq};