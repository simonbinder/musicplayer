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
        playerVars: {
          autoplay: 'true',
        },

      })
    })
  }


  toggleButton(play){
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
   if(this.state.play === 'Play') {
         console.log("clicked play");
        this.player.playVideo();
       this.toggleButton(false);
     }else{
       console.log("clicked pause");
       this.player.pauseVideo();
       this.toggleButton(true);
     }
   };




render(){
  return <div className="c-footer">
    <div className="c-audio-player-wrapper row">
      <div className="c-slider-wrapper col-lg-8 col-md-8 col-sm-6">
          <div className="c-track-title">Trackname - Artist (Remix)</div>
          <div className="c-slider">
            <div className="c-progress-bar"></div>
            <div className="c-progress"></div>



          </div>
      </div>
<div className="col-lg-4 col-md-4 col-sm-6">
     <div className="c-play-button-wrapper">
        <div className="invisibleYTPlayer"ref={(r) => { this.youtubePlayerAnchor = r }}></div>
        <div className="c-button c-button-previous"></div>
            <PlayButton
               changePlayState={ev => this.switchPlayState(ev)}
               play={this.state.play}/>
        <div className="c-button c-button-next"></div>
          </div>
      </div>
</div>
  </div>
};
};
