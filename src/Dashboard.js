import React from 'react'
import Input from '@material-ui/core/Input'
import { TextField, BottomNavigation, makeStyles } from '@material-ui/core'
import './App.js'
import SendSvg from './send.svg'
import Button from '@material-ui/core/Button'

class Dashboard extends React.Component {

    state = { 
        channelDisplayed: ' 0'
    }


    render() { 
        return(
            <div className="dashboard">
                Click a Channel {this.state.channelDisplayed}
                <div style={{height:"91%"}}></div>
                <div className="div-input">
                    <div>
                        <TextField fullWidth={true} placeholder="Introdu text" variant="outlined" margin="dense"/>
                    </div>
                    <div>
                    <img src={SendSvg} className='send-button' onClick={()=>{alert('ok')}} /> 

                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard