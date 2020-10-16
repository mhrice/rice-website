import SpectrogramPic from "./resources/spectrogram.png";
import SignalGeneratorPic from "./resources/signal-generator.png";
import BetternomePic from "./resources/betternome.png";
import YawnGeneratorPic from "./resources/yawn-generator.png";
import AIJamPic from "./resources/Ai-jam2.png"

let ProjectData = [
    {
        title:"Interactive Spectrogram",
        description: "An insanely interactive live-input web spectrogram with complex sound synthesis built in. Includes\
        features like multi-touch drawable synthesis (for touch screen devices), reverb, delay, and FM. Supports midi input and filter-based synthesis. \
        This project is part of ",
        date: "September 2019",
        picture: SpectrogramPic,
        link: "https://spectrogram.sciencemusic.org/",
        githubLink: "https://github.com/ListeningToWaves/Spectrogram"
    },
    {
        title: "Interactive Signal Generator",
        description: "A web audio signal generator that displays time-domain information of a user-selected wave shape. \
        Users can draw to change frequency and amplitude of the sound. Supports multi-touch input to display summation of waveforms. \
        This project is part of ",
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
        link: "https://mhrice.github.io/betternome/",
        githubLink: "https://github.com/mhrice/betternome"
        
    },
    {
        title: "AI Jam 2",
        description: "Final project for Machine Learning and the Arts course. Live jam session with machine learning music models based on Google's AI Jam. \
        Uses pre-trained Magenta drum-rnn and melody-rnn models to generate accompaniment for user-created baselines and melodies.\
        Note: For full functionality, download and run locally with npm and use a midi controller.",
        date: "June 2019",
        picture: AIJamPic,
        link: "https://mhrice.github.io/Ai-Jam-2/",
        githubLink: "https://github.com/mhrice/Ai-Jam-2"
    },
    {
        title: "Yawn Generator VST",
        description: "This audio synthesis VST plugin uses concepts from additive synthesis, physical modeling, and filtering to achieve a synthetic yawn sound. \
        By pressing a desired note on the piano keyboard, the synth will generate a yawn sound centered at that note, before dropping in frequency like a typical yawn does. \
        The algorithm uses time-variant additive synthesis + noise for the base sound, with filtering, envelopes, panning, and a touch of reverb to make it sound more authentic. \
        The plugin has yawn speed and noise control providing tailored yawn experiences.",
        date: "December 2018",
        picture: YawnGeneratorPic,
        link: "https://github.com/mhrice/YawnGenerator/raw/master/YawnGenerator.dll",
        githubLink: "https://github.com/mhrice/YawnGenerator"
    }
]


export default ProjectData;