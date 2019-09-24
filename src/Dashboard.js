import React from 'react'
import Input from '@material-ui/core/Input'
import { TextField, BottomNavigation, makeStyles } from '@material-ui/core'
import './App.js'
import SendSvg from './send.svg'
import Button from '@material-ui/core/Button'
import { Store } from './Store'
import axios from 'axios'
import Pusher from 'pusher-js'


class Dashboard extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            inputText: '',
            messageList: [],
            selectedChannel: '',
            updates: 0
        }

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
            let userName = this.context.state.userLoggedinName;
            let userId = this.context.state.userLoggedinId;

            const obj =
            {
                "content": {
                    "S": this.state.inputText
                },
                "userName": {
                    "S": userName
                },
                "userId": {
                    "S": userId
                }
            }
            this.setState(previousState => ({
                messageList: [...previousState.messageList, obj]
            }));
        }

        this.setState({ inputText: '' })
    }


    key_up = (e) => {
        const enterKey = 13;
        if (e.which == enterKey && this.state.inputText != '' && typeof (this.state.inputText) != 'undefined') {
            let selectedChannel = this.context.state.selectedChannel;
            let userName = this.context.state.userLoggedinName;
            let userId = this.context.state.userLoggedinId;
            // const obj =
            // {
            //     "content": {
            //         "S": this.state.inputText
            //     },
            //     "userName": {
            //         "S": userName
            //     },
            //     "userId": {
            //         "S": userId
            //     }
            // }
            // if (selectedChannel)
            //     this.setState(previousState => ({
            //         messageList: [...previousState.messageList, obj]
            //     }));
            
            axios.post('http://app-prod.b4cjkb3nwe.eu-west-1.elasticbeanstalk.com/chat/',{
                message: this.state.inputText,
                userId: userId,
                userName: userName,
                channelId: this.context.state.selectedChannel,
                channelNameSelected: this.context.state.channelNameSelected
            })
            .then(function(response) {
                console.log(response.data);
                
            })
            .catch(function(error){
                console.log(error);
                
            })
            this.setState({ inputText: '' })
        }
    }

    getMesaj = () => {
        var obj = this;
        if (this.context.state.selectedChannel != '') {
            console.log("intrat in get")
            axios.get(
                'http://app-prod.b4cjkb3nwe.eu-west-1.elasticbeanstalk.com/chat/getMessages/?channelId=' + obj.context.state.selectedChannel
            )
                .then(function (response) {
                    obj.setState({ messageList: response.data, selectedChannel: obj.context.state.selectedChannel })
                    // obj.state.messageList.push(response)
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
        else {
            console.log("n-am intrat");
        }
    }

    connectToPusher = () => {

        var pusher = new Pusher('e46488b1793af8778b05', {
            cluster: 'eu',
            forceTLS: true
        });

        var channel = pusher.subscribe(this.context.state.channelNameSelected);

        var obj = this;

        channel.bind('my-event', function (data) {
            var dataToAdd = {
                'content': { 'S': data.message },
                'userName': { 'S': data.userName },
                'userId': { 'S': data.userId }
            };
            obj.setState(previousState => ({
                messageList: [...previousState.messageList, dataToAdd]
            }));
        });
    }

    componentDidUpdate(_, prevState) {
        let myselect = this.context.state.selectedChannel
        if (this.context.state.selectedChannel !== this.context.state.oldSelectedChannel && this.context.state.selectedChannel !== this.state.selectedChannel) {
            this.getMesaj();
            this.connectToPusher();
        }
    }


    render() {

        let messages = this.state.messageList;
        let selectedChannel = this.context.state.selectedChannel;
        let loggedInUser = this.context.state.userLoggedinId;
        let selectedName = this.context.state.channelNameSelected;
        return (
            <div className="dashboard">

                <div className="user-details-dash">
                    <span className='span-user-dash'>
                        {
                            selectedName + ':->>' + selectedChannel
                        }
                    </span>
                </div>

                <div className="div-chat">
                    {
                        messages.map(msg => {
                            if (msg.userId.S == loggedInUser)
                                return <div className="div-message">
                                    <span className="span-message">{msg.content.S}</span>
                                </div>
                            else
                                return <div className="div-message-received">
                                    <span className="span-message">{msg.content.S}</span>
                                </div>
                        }).reverse()
                    }
                </div>


                <div className="div-input">
                    <div>
                        <TextField fullWidth={true}
                            placeholder="Introduceti text"
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

export default Dashboard;