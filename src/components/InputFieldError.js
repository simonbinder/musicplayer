
const InputFieldError = props => {

  let classes = 'o-error';
  if(props.error != '') {
    classes += ' o-error-active';
  }

  return <div className={classes}>
    {props.error}
  </div>
};

export default InputFieldError;
