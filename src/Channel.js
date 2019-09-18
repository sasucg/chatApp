import React, {Component} from 'react'
import './App.css'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Dashboard from './Dashboard'

const Channel = (props) => { 


    return(
        <div className="channel">
          <div>
          {props.name}
           <div>
          {props.lastMessage}
          </div>
          </div>
        </div>
    )
    
}

export default Channel