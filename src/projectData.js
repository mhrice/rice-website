import SpectrogramPic from "./resources/spectrogram.png";
import SignalGeneratorPic from "./resources/signal-generator.png";
import MidiPic from "./resources/midi.png";
import BetternomePic from "./resources/betternome.png";
import YawnGeneratorPic from "./resources/yawn-generator.png";
import AIJamPic from "./resources/Ai-jam2.png"
import CRASSHHFYPic from "./resources/crasshhfy.png"
import LenaPic from "./resources/lena.png"
import BeattrackPic from "./resources/beattrack.png"
import RemfxPic from "./resources/remfx.png"
import SoundsaucePic from "./resources/soundsauce.png"

let FeaturedProjects = [
    {
        title: "Audio Effect Removal",
        description: "Implementation for the paper 'General Purpose Audio Effect Removal' by Rice, Steinmetz, Reiss, and Fazekas.\
        This project is part of my master's thesis at Queen Mary University of London. We experimented with training SOTA source-separation models for the related task of audio effect removal. \
        Used pytorch-lightning for implementation, Hydra for experiment management, and wandb for real-time logging. ",
        date: "October 2023",
        picture: RemfxPic,
        link: "https://csteinmetz1.github.io/RemFX/",
        githubLink: "https://github.com/mhrice/RemFx"
    },
    {
        title: "Soundsauce.ai",
        description: "A web app for text-to-music generation using Meta's MusicGen melody model, fine-tuned on a set of EDM melodies. \
        Supports providing a conditioning melody and parallel inference with 4 generation variations. \
        Uses Next.js, Beam Cloud, Firebase, GCP, Cloud Functions, and Vercel.",
        date: "March 2023",
        picture: SoundsaucePic,
        link: "https://soundsauce-web-hd65.vercel.app/",
        githubLink: "https://github.com/mhrice/"
    },
    {
        title: "CRASSHHFY",
        description: "A neural drum sampler VST that uses a diffusion network to generate drum samples. \
        Besides unconditional generation, the plugin also supports priming and inpainting.\
        Based on the 'CRASH' paper and implementation by Rouard and Hadjeres.\
        Submitted to the 2023 nerual audio plugin competition.",
        date: "March 2023",
        picture: CRASSHHFYPic,
        link: "https://t.co/GmBo7BvCow",
        githubLink: "https://github.com/calgoheen/crasshhfy"
    },
    {
        title: "Interactive Spectrogram",
        description: "An insanely interactive live-input web spectrogram with complex sound synthesis built in. Includes\
        features like multi-touch drawable synthesis (for touch screen devices), reverb, delay, and FM. Supports midi input and filter-based synthesis. \
        This project is part of ",
        date: "September 2019",
        picture: SpectrogramPic,
        link: "https://spectrogram.sciencemusic.org/",
        githubLink: "https://github.com/ListeningToWaves/Spectrogram"
    },
]
let ProjectData = [
    {
        title: "Lena Singer",
        description: "The Lena Singer project is a simulation of someone learning how to sing.\
        Users can select an initial motivation and an initial ability for the singer, then, through a feedback-based process, \
        the singer may improve at singing, or they may get worse, which in turn boosts or diminishes its confidence, ability, and motivation.\
        It uses a VISinger2, a singing synthesis model, to generate the singing.",
        date: "May 2023",
        picture: LenaPic,
        link: "https://lena-singer.vercel.app/",
        githubLink: "https://github.com/mhrice/Lena-singer"
    },
    {
        title: "TCN Beat and Downbeat Tracking",
        description: "My pytorch-lightning implementation of 'Temporal convolutional networks for musical audio beat tracking' by Davies and Böck. \
        Extended the paper to jointly predict downbeat tracking. Achieved comparable performance to the original paper. ",
        date: "March 2023",
        picture: BeattrackPic,
        link: "https://github.com/mhrice/BeatTrack/blob/main/beat_track_assignment.pdf",
        githubLink: "https://github.com/mhrice/BeatTrack"
    },
    {
        title: "Transformer-based Symbolic Music Generation",
        description: "Midi-based music generation using Google Magenta's Music Transformer and the REMI symbolic music data format.\
        Trained on over 10,000 songs from the Lakh Midi Dataset.",
        date: "February 2022",
        picture: MidiPic,
        link: "https://github.com/mhrice/music-transformer-generation",
        githubLink: "https://github.com/mhrice/music-transformer-generation"
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


export { ProjectData, FeaturedProjects };