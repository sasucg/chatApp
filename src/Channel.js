import React, { Component, useContext } from 'react'
import './App.css'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Dashboard from './Dashboard'
import { Store } from './Store'




const Channel = (props) => {

  const context = useContext(Store);

  const handleClickChangeChannel =  async () => {
    await context.dispatch({
      type: 'SELECT_CHANNEL',
      payload: props.channelID

    })

    console.log(context)
  }



  return (
    <div className="channel" onClick={() => handleClickChangeChannel()}>
      <div>
        {props.channel}
      </div>
    </div>
  )

}

export default Channel