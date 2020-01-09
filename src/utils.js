function midiToFreq(midi) {
    return Math.pow(2, ((midi - 69) / 12)) * 440;
}
function convertToLog(value, originalMin, originalMax, newMin, newMax) {
    //solving y=Ae^bx for y
    let b = Math.log(newMax / newMin) / (originalMax - originalMin);
    let a = newMax / Math.pow(Math.E, originalMax * b);
    let y = a * Math.pow(Math.E, b * value);
    // console.log(y);
    return y;
}

export {midiToFreq, convertToLog};