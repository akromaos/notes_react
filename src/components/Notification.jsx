const Notification = ({rmessage}) => {
    const {message, type} = rmessage
    if (message === null) {
      return null
    }
    
    return (
      <div className={type}>
        {message}
      </div>
    )
  }

  export default Notification