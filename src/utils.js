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
function arrSum (arr) {
    if (!Array.isArray(arr)) {
        return 0;
    }
    return arr.reduce(function (a, b) {
        return a + b
    }, 0);
}

function arrSumSquare(arr) {
    if (!Array.isArray(arr)) {
        return 0;
    }
    return arr.reduce(function (a, b) {
        return a + Math.pow(10, b/20);
    }, 0);
}


function arrMax(arr){
    return arr.reduce(function (a, b) {
        return Math.max(a, b);
    });
}

function getFreq(index, min, max) {
    let logResolution = Math.log(max / min);
    let freq = min * Math.pow(Math.E, index * logResolution);
    return Math.round(freq);
}

function getGain(index, min, max) {
    //1 t0 0 ->
    //-30 to 0dB
    // index = index - 0.1;
    let range = max - min;
    return index*range + min;
}

function convertToLinear(value, originalMin, originalMax, newMin, newMax) {
    //solving y=Ae^bx for x, x=ln(y-A)/b
    let b = Math.log(newMax / newMin) / (originalMax - originalMin);
    console.log(b)
    let a = newMax / Math.pow(Math.E, originalMax * b);
    let x = Math.log(value - a) / b;
    return x;
}

function dbToLinear(value){
    const V0 = 0.7746;
    return V0 * Math.pow(10, value/20);
}

export {midiToFreq, convertToLog, arrSum, arrMax, arrSumSquare, getFreq, getGain, dbToLinear};