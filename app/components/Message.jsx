import React from 'react'

export default function Message(props){
  const message = props.message;

  return (
    <li className="message">
    <div className="message">
      <h4 className="message-from">{ message[1].from }</h4>
      { message[1].content }
    </div>
  </li>
  )
}