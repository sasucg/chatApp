import React, { Component, useContext } from 'react'
import './App.css'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Dashboard from './Dashboard'
import { Store } from './Store'
import axios from 'axios'


const Channel = (props) => {

  const context = useContext(Store);

  const handleClickChangeChannel = () => {

    context.dispatch({
      type: 'SELECT_CHANNEL',
      payload: props.channelID,
    })

    context.dispatch({
      type: 'SELECT_CHANNEL_NAME',
      payload: props.channelName
    })

  }
  return (
    <div className="channel" onClick={() => {handleClickChangeChannel()}}>
      {props.channelName}
    </div>
  )

}

export default Channel