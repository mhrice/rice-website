import SpectrogramPic from "./resources/spectrogram.png"
import SignalGeneratorPic from "./resources/signal-generator.png"

let ProjectData = [
    {
        title:"Interactive Spectrogram",
        description: "An insanely interactive live-input web spectrogram with complex sound synthesis built in. Includes\
        features like multi-touch drawable synthesis (for touch screen devices), reverb, delay, and FM. Supports midi input and filter-based synthesis",
        date: "September 2019",
        picture: SpectrogramPic,
        link: "https://spectrogram.sciencemusic.org/",
        githubLink: "https://github.com/ListeningToWaves/Spectrogram"
    },
    {
        title: "Interactive Signal Generator",
        description: "A web audio signal generator that displays time-domain information of a user-selected wave shape. \
        Users can draw to change frequency and amplitude of the sound. Supports multi-touch input to display summation of waveforms. ",
        date: "June 2019",
        picture: SignalGeneratorPic,
        link: "https://signalgenerator.sciencemusic.org/",
        githubLink: "https://github.com/ListeningToWaves/Oscilloscope-v2"
    }
]


export default ProjectData;