import React from 'react'
//import { useSelector } from 'react-redux'
import { connect } from 'react-redux'

const Notification = (props) => {
  //const notification = useSelector( state => state.notification)
  if (props.notification === null) {
    return null
  }
  /*const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }*/

  return (
    <div className={props.style}>
      {props.notification}
    </div>
  )
}

//export default Notification
const mapStateToProps = (state) => {
  if(state.notification === null || state.notification.length  === 0){
    return { notification: null }
  }
  if ( state.notification.text === null ) {
    return { notification: null }
  }  else{
    return {
      notification: state.notification.text,
      style: state.notification.style
    }
  }
}


const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification