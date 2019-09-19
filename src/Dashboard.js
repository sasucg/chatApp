import React from 'react'
import Input from '@material-ui/core/Input'
import { TextField, BottomNavigation, makeStyles } from '@material-ui/core'
import './App.js'
import SendSvg from './send.svg'
import Button from '@material-ui/core/Button'
import { Store } from './Store'



class Dashboard extends React.Component {

    state = {
        channelDisplayed: ' 0',
        inputText: ''
    }


    context = this.context;
    onInputChange = (event) => {
        if (event.target.value) {
            this.setState({ inputText: event.target.value })
        }
        else {
            this.setState({ inputText: '' })
        }
    }


    onSubmitClick = () => {

        this.context.dispatch({
            type: 'SEND_MESSAGE',
            payload: this.state.inputText
        })
        this.setState({ inputText: '' })
    }


    key_up = (e) => {
        var enterKey = 13;
        if (e.which == enterKey) {
            this.context.dispatch({
                type: 'SEND_MESSAGE',
                payload: this.state.inputText
            })
            this.setState({ inputText: '' })
        }
    }


    render() {

        let messages = this.context.state.messageList;
        let selected = this.context.state.selectedChannel
        return (
            <div className="dashboard">


                <div className="user-details-dash">
                    Test
                </div>


                <div className="div-chat">
                    {
                    
                        messages.map(msg => {
                            console.log(selected)
                            if(msg.userId.S == selected)
                                return <div className="div-message">{msg.content.S}</div>
                        })
                    }
                </div>


                <div className="div-input">
                    <div>
                        <TextField fullWidth={true}
                            placeholder="Introdu text"
                            variant="outlined"
                            margin="dense"
                            onChange={this.onInputChange}
                            value={this.state.inputText}
                            onKeyUp={this.key_up} />
                    </div>

                    <div className="div-buton">
                        <img src={SendSvg}
                            className='send-button'
                            onClick={this.onSubmitClick} />

                    </div>
                </div>
            </div>
        )
    }
}
Dashboard.contextType = Store

export default Dashboard