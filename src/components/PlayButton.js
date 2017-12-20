
const PlayButton = props => {

const {
  changePlayState,
} = props;

  let classes = 'button ';
  if(props.play != 'Play') {
    classes = 'c-button c-button-pause';
  }else{
    classes = 'c-button c-button-play';
  }

  return <div className={classes} onClick={ changePlayState }>
  </div>
};

export default PlayButton;
