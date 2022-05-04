import React, { Component } from 'react';
import "../styles/music.css";


const production = [
    {name: "Bach, Prelude and Fugue #13 in F# major",    link: <iframe className="music-iframe" title="bach" width="100%" height="100"scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1261881586&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>},
    {name: "Beethoven, Sonata in F Minor, Op. 2, No. 1", link: <iframe className="music-iframe" title="beethoven" width="100%" height="100" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1261881829&color=%23ff5500&auto_play=false&hide_related=false&show_comments=false&show_user=false&show_reposts=false&show_teaser=false"></iframe>},
    {name: "Mozart, Sonata in A minor, K. 310",          link: <iframe className="music-iframe" title="mozart" width="100%" height="100" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1261881631&color=%23ff5500&auto_play=false&hide_related=false&show_comments=false&show_user=false&show_reposts=false&show_teaser=false"></iframe>},
    {name: "Prokofiev, Visions Fugitive, No. 8-13",      link: <iframe className="music-iframe" title="prokofiev" width="100%" height="100" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1261881493&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>},
    {name: "Bright",                                     link: <iframe className="music-iframe" title="bright" width="100%" height="100" scrolling="no" frameBorder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/903049099&color=%23ff5500&auto_play=false&hide_related=false&show_comments=false&show_user=false&show_reposts=false&show_teaser=false"></iframe>},  
    {name: "Journey's End/A New Beginning",              link: <iframe className="music-iframe" title="journey" width="100%" height="100" scrolling="no" frameBorder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/288387195&color=%23ff5500&auto_play=false&hide_related=false&show_comments=false&show_user=false&show_reposts=false&show_teaser=false"></iframe>},  
    {name: "Excite",                                     link: <iframe className="music-iframe" title="excite" width="100%" height="100" scrolling="no" frameBorder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/221072662&color=%23ff5500&auto_play=false&hide_related=false&show_comments=false&show_user=false&show_reposts=false&show_teaser=false"></iframe>},  
    {name: "Primpax",                                    link: <iframe className="music-iframe" title="primpax" width="100%" height="100" scrolling="no" frameBorder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/270571798&color=%23ff5500&auto_play=false&hide_related=false&show_comments=false&show_user=false&show_reposts=false&show_teaser=false"></iframe>}  
];
const mixing  = [
    {name: "Waymaker (Cover)",                      link: <iframe className="music-iframe" title="waymaker" width="100%" height="100" scrolling="no" frameBorder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/896327362&color=%23ff5500&auto_play=false&hide_related=false&show_comments=false&show_user=false&show_reposts=false&show_teaser=false"/>}, 
    {name: "Let Justice Roll Like A River (Cover)", link: <iframe className="music-iframe" title="justice" width="100%" height="100" scrolling="no" frameBorder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/513980592&color=%23ff5500&auto_play=false&hide_related=false&show_comments=false&show_user=false&show_reposts=false&show_teaser=false"/>},  
    {name: "Rooftops (Album)",                      link: <iframe  className="music-iframe" title="album" src="https://bandcamp.com/EmbeddedPlayer/album=2315578695/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/" seamless><a href="https://brianfrulla.bandcamp.com/album/rooftops">Rooftops by Brian Frulla</a></iframe>}
];
const services = ["Front-of-House/Live Sound", "Production", "Mixing", "Recording"];
const gear = ["Ableton Live 10 Suite", "Behringer x32", "Allen & Heath QU-16 ", "Akai EIE Pro", "Shure SM58", "Audio Technica AT2020", "Novation Launchkey", "Kurzweil K2500"];



class Music extends Component {
    render(){
        return (
            <div className="music-container">
                <div className="music-title">Music</div>
                <hr className="music-hr" width="90%"/>
                <div className="music-content-container">
                    <div className="music-production-container">
                        <div className="music-category-title">Piano/Production</div>
                        <ul className="music-list">
                           {production.map(item=><li className="music-list-item" key={item.name}>{item.name}{item.link}</li>)}
                        </ul>
                    </div>
                    <hr className="music-content-divider"/>
                    <div className="music-mixing-container">
                        <div className="music-category-title">Recording/Mixing</div>
                        <ul className="music-list">
                            {mixing.map(item=><li className="music-list-item" key={item.name}>{item.name}{item.link}</li>)}
                        </ul>                    
                    </div>
                    <hr className="music-content-divider"/>
                    <div className="music-other-container">
                        <div className="music-services-container">
                            <div className="music-category-title">Services</div>
                                <ul className="music-list">
                                    {services.map(item=><li className="music-list-item" key={item}>{item}</li>)}
                                </ul>               
                            </div>
                        <div className="music-gear-container">
                            <div className="music-category-title">Gear</div>
                                <ul className="music-list">
                                    {gear.map(item=><li className="music-list-item" key={item}>{item}</li>)}
                                </ul>    
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default Music;