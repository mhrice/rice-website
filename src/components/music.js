import React, { Component } from 'react';
import "../styles/music.css";

// import 

// const mixingData = [{
    // img: 
// }]

// const 

const production = [{name: "Song1", link: "www.e2"}, {name: "Song2", link: "www.e"}]
const mixing  = [
    {name: "Waymaker (Cover)",                      link: <><iframe title="waymaker" width="100%" height="100" scrolling="no" frameBorder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/896327362&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe><div style={{"fontSize": "10px", "color": "#cccccc", "lineBreak": "anywhere", "wordBreak": "normal", "overflow": "hidden", "whiteSpace": "nowrap", "textOverflow": "ellipsis", "fontFamily": "Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif", "fontWeight": "100"}}></div></>}, 
    {name: "Let Justice Roll Like A River (Cover)", link: <><iframe title="justice" width="100%" height="100" scrolling="no" frameBorder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/513980592&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe><div style={{"fontSize": "10px", "color": "#cccccc", "lineBreak": "anywhere", "wordBreak": "normal", "overflow": "hidden", "whiteSpace": "nowrap", "textOverflow": "ellipsis", "fontFamily": "Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif", "fontWeight": "100"}}></div></>},  
    {name: "Rooftops (Album)",                      link: <iframe title="album" style={{"border": 0, "width": "100%", "height": "120px"}} src="https://bandcamp.com/EmbeddedPlayer/album=2315578695/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/" seamless><a href="https://brianfrulla.bandcamp.com/album/rooftops">Rooftops by Brian Frulla</a></iframe>}];
const services = ["Front-of-House/Live Sound (5 Years)", "Production (4 Years)", "Mixing (4 Years)", "Recording (4 Years)"];
const gear = ["Ableton Live 10 Suite", "Behringer x32", "Akai EIE Pro", "SM58", "AT2020", "Novation Launchkey 49", "Kurzweil K2500"];



class Music extends Component {
    render(){
        return (
            <div className="music-container">
                <div className="music-title">Music</div>
                <hr width="90%"/>
                <div className="music-content-container">
                    <div className="music-production-container">
                        <div className="music-category-title">Production</div>
                        <ul className="music-list">
                            {production.map(item=><li className="music-list-item" key={item.name}><a href={item.link} className="music-list-link">{item.name}</a></li>)}
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