import SpectrogramPic from "./resources/spectrogram.png";
import SignalGeneratorPic from "./resources/signal-generator.png";
import BetternomePic from "./resources/betternome.png";
import YawnGeneratorPic from "./resources/yawn-generator.png";

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
    },
    {
        title: "Betternome",
        description: "A minimalist metronome designed to improve the efficiency and quality of music rehearsing.\
        Features a tool to speed up/slow down over a designated number of measures which enables musicians to choreograph \
        challenging passages without touching the metronome.",
        date: "July 2020",
        picture: BetternomePic,
        link: "TBD",
        githubLink: "TBD"
        
    },
    {
        title: "Yawn Generator VST",
        description: "This audio synthesis VST plugin uses concepts from additive synthesis, physical modeling, and filtering to achieve a synthetic yawn sound. \
        By pressing a desired note on the piano keyboard, the synth will generate a yawn sound centered at that note, before dropping in frequency like a typical yawn does. \
        The algorithm uses time-variant additive synthesis + noise for the base sound, with filtering, envelopes, panning, and a touch of reverb to make it sound more authentic. \
        The plugin has yawn speed and noise control providing tailored yawn experiences.",
        date: "December 2019",
        picture: YawnGeneratorPic,
        link: "TBD",
        githubLink: "TBD"
    }
]


export default ProjectData;