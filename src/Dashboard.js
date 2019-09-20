import React from 'react'
import Input from '@material-ui/core/Input'
import { TextField, BottomNavigation, makeStyles } from '@material-ui/core'
import './App.js'
import SendSvg from './send.svg'
import Button from '@material-ui/core/Button'
import { Store } from './Store'


class Dashboard extends React.Component {

    state = {
        inputText: '',
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
        if (this.state.inputText != '' && typeof (this.state.inputText) != 'undefined') {

            let selected = this.context.state.selectedChannel;
            let selectedName = this.context.state.userNameSelected;

            const obj =
            {
                "content": {
                    "S": this.state.inputText
                },
                "userName": {
                    "S": selectedName
                },
                "userId": {
                    "S": selected
                }
            }

            if (selected)
                this.context.dispatch({
                    type: 'SEND_MESSAGE',
                    payload: obj
                })
        }

        this.setState({ inputText: '' })
    }


    key_up = (e) => {
        var enterKey = 13;
        if (e.which == enterKey && this.state.inputText != '' && typeof (this.state.inputText) != 'undefined') {
            let selected = this.context.state.selectedChannel;
            let selectedName = this.context.state.userNameSelected;
            const obj =
            {
                "content": {
                    "S": this.state.inputText
                },
                "userName": {
                    "S": selectedName
                },
                "userId": {
                    "S": selected
                }
            }

            if (selected)
                this.context.dispatch({
                    type: 'SEND_MESSAGE',
                    payload: obj
                })
            this.setState({ inputText: '' })
        }
    }


    render() {

        let messages = this.context.state.messageList;
        let selected = this.context.state.selectedChannel;
        let selectedName = this.context.state.userNameSelected;
        return (
            <div className="dashboard">


                <div className="user-details-dash">
                    <span className='span-user-dash'>
                        {
                            selectedName
                        }
                    </span>
                </div>

                <div className="div-chat">

                    {
                        messages.map(msg => {
                            if (msg.userId.S == selected)
                                return <div className="div-message">
                                    <span className="span-message">{msg.content.S}</span>
                                </div>
                        }).reverse()
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

                    <div className="div-button">
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