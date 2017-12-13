import React from 'react';
import '../assets/Footer.scss';
import PlayButton from "./PlayButton";

export default class FooterBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      play: 'Play',
    };
    var loadYT;
  };

  componentDidMount () {
   if (!this.loadYT) {
     this.loadYT = new Promise((resolve) => {
       const tag = document.createElement('script')
       tag.src = 'https://www.youtube.com/iframe_api'
       const firstScriptTag = document.getElementsByTagName('script')[0]
       firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
       window.onYouTubeIframeAPIReady = () => resolve(window.YT)
     })
   }
   this.loadYT.then((YT) => {
      this.player = new YT.Player(this.youtubePlayerAnchor, {
        height: '0',
        width: '0',
        videoId: 'E1nfGw8qD70',

      })
    })
  }

  onPlayerStateChange(event){
     if (typeof this.props.onStateChange === 'function') {
       this.props.onStateChange(e)
     }
   }


  toggleButton(play){
   // var img = play ? "play-button.png" : "pause-button.png";
   // icon.setAttribute("src",img);
   if(play){
     this.setState({
       'play': 'Play',
     })}
     else{
       this.setState({
         'play': 'Pause',
       })
     }
 };

  switchPlayState(){
    console.log("clicked");
   if(this.state.play === 'Play') {
        this.player.playVideo();
       this.toggleButton(false);
     }else{
       this.player.pauseVideo();
       this.toggleButton(true);
     }
   };




render(){
  return <div className="c-footer">
    <div className="c-audio-player-wrapper col-md-10">
      <div className="c-slider-wrapper col-md-9">
          <div className="c-track-title">Trackname - Artist (Remix)</div>
          <div className="c-slider">
            <div className="c-progress-bar"></div>
          </div>
      </div>
    <div className="c-play-button-wrapper col-lg-3">
    <div ref={(r) => { this.youtubePlayerAnchor = r }}></div>
          <PlayButton
             changePlayState={ev => this.switchPlayState(ev)}
             play={this.state.play}/>
        </div>
      </div>


    <div className="c-playlist-menu-wrapper col-md-2">
        <div className="c-track-title">Playlist</div>
    </div>
  </div>
};
};
