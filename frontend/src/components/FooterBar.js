import React from 'react';
import '../assets/Footer.scss';
import PlayButton from "./PlayButton";

const FooterBar = props => {

  const {
    activeTrack,
    onShuffleClicked,
    shuffleState,
    progress,
    onPreviousClicked,
    onNextClicked,
    onPauseClicked,
    onPlayClicked,
    playStatus
  } = props;

  if(!activeTrack) {
    return null;
  }

  let shuffleClasses = "c-button c-button-shuffle";
  if(shuffleState == true) {
    shuffleClasses += " c-button-shuffle-active";
  }

  let playButtonProps = {
    'className': playStatus == false ?
      "c-button c-button-play" :
      "c-button c-button-pause",
    'onClick': playStatus == false ?
      onPlayClicked :
      onPauseClicked,
  };

  return <div className="c-footer">
    <div className="c-audio-player-wrapper row">
      <div className="c-slider-wrapper col-lg-8 col-md-8 col-sm-6">
          <div className="c-track-title">{activeTrack.title} - <b>({activeTrack.artists})</b></div>
          <div className="c-slider">
            <div className="c-progress-bar"></div>
            <div className="c-progress" style={{ width: progress * 100 + '%' }}></div>
          </div>
      </div>
      <div className="col-lg-4 col-md-4 col-sm-6">
        <div className="c-play-button-wrapper">
          <div className={shuffleClasses} onClick={ onShuffleClicked }></div>
          <div className="c-button c-button-previous" onClick={ onPreviousClicked }></div>
          <div {...playButtonProps} ></div>
          <div className="c-button c-button-next" onClick={ onNextClicked }></div>
        </div>
      </div>
    </div>
  </div>
};

export default FooterBar;

// export default class FooterBar extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       play: 'Play',
//     };
//     var loadYT;
//   };
//
//   // componentDidMount () {
//   //  if (!this.loadYT) {
//   //    this.loadYT = new Promise((resolve) => {
//   //      const tag = document.createElement('script')
//   //      tag.src = 'https://www.youtube.com/iframe_api'
//   //      const firstScriptTag = document.getElementsByTagName('script')[0]
//   //      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
//   //      window.onYouTubeIframeAPIReady = () => resolve(window.YT)
//   //    })
//   //  }
//   //  this.loadYT.then((YT) => {
//   //     this.player = new YT.Player(this.youtubePlayerAnchor, {
//   //       height: '0',
//   //       width: '0',
//   //       videoId: 'E1nfGw8qD70',
//   //       playerVars: {
//   //         autoplay: 'true',
//   //       },
//   //
//   //     })
//   //   })
//   // }
//
//
//   toggleButton(play){
//    if(play){
//      this.setState({
//        'play': 'Play',
//      })}
//      else{
//        this.setState({
//          'play': 'Pause',
//        })
//      }
//  };
//
//   switchPlayState(){
//    if(this.state.play === 'Play') {
//          console.log("clicked play");
//         this.player.playVideo();
//        this.toggleButton(false);
//      }else{
//        console.log("clicked pause");
//        this.player.pauseVideo();
//        this.toggleButton(true);
//      }
//    };
//
//
//
//
// render(){
//
//   let classes = "c-footer";
//   if(this.props.active == true) {
//     classes += " c-footer--active";
//   }
//
//   const {
//     title,
//     artists,
//   } = this.props;
//
//   return <div className={classes}>
//     <div className="c-audio-player-wrapper row">
//       <div className="c-slider-wrapper col-lg-8 col-md-8 col-sm-6">
//           <div className="c-track-title">{title}, {artists}</div>
//           <div className="c-slider">
//             <div className="c-progress-bar"></div>
//             <div className="c-progress"></div>
//           </div>
//       </div>
//       <div className="col-lg-4 col-md-4 col-sm-6">
//         <div className="c-play-button-wrapper">
//           <div className="invisibleYTPlayer"ref={(r) => { this.youtubePlayerAnchor = r }}></div>
//           <div className="c-button c-button-previous"></div>
//             <PlayButton
//               changePlayState={ev => this.switchPlayState(ev)}
//               play={this.state.play}
//             />
//             <div className="c-button c-button-next"></div>
//         </div>
//       </div>
//     </div>
//   </div>};
// };
