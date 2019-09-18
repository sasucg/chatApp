import React, {Component} from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import './index.css'
import axios from 'axios'



class Login extends Component {

    state = {
        username: '',
        email: '',
        password: '',
        authToken: '',
        refreshToken: ''
    }

    handleClick = () => { 
        console.log('1234')
        var obj = this;
        axios.post('http://localhost:8000/testapp/token',
        {
            "username": this.state.username, 
            "password": this.state.password
        })
        .then(function (response) {
            obj.setState({
                authToken: response.data.access,
                refreshToken: response.data.refresh
            })
        })
        .catch(function (error) {
        alert("Try again");
        });
    }

    handleChange = (event) => { 
        
        this.setState({
            username: event.target.value
        })
    }

    handleChangePassword = (event) => { 
        
        this.setState({
            password: event.target.value
        })
    }

    testEndPoint = () => { 
        const options = {
            headers: {'Authorization': 'Bearer ' + this.state.authToken}
        }
        axios.get('http://localhost:8000/testapp/testWithAuth', options)
        .then(function(response){
            console.log(response.data)
        })
        .catch(function(error){
            console.log(error);
            
        })
    }

    updateAuth = () => { 
        console.log("123456")
        var obj = this;
        axios.post('http://localhost:8000/testapp/token/refresh',
        {
            "refresh": this.state.refreshToken
        })
        .then(function (response) {
            obj.setState({
                authToken: response.data.access
            })
        })
        .catch(function (error) {
        console.log(error);
        });
    }

    render(){
        return(
            <div className="div-login">

                <div className="inputDiv">
                <TextField  style={{padding:6}} 
                            placeholder="Username/Email"
                            id="username-input"
                            margin="normal"
                            onKeyUp={(e) => {this.handleChange(e)}}
                             />
                </div>

                <div className="inputDiv">
                 <TextField style={{padding:6}} 
                            placeholder="Password"
                            id="password"
                            margin="normal"
                            onKeyUp={(e) => {this.handleChangePassword(e)}}
                            type="password"/>
                </div>
                
                <div>
                <Button variant="outlined" color="primary" margin="normal" onClick={() => {this.handleClick()}} > Log me in! </Button>
                </div>
                <Button variant="outlined" color="primary" margin="normal" onClick={() => {this.testEndPoint()}} > Test Endpoint </Button>
                <Button variant="outlined" color="primary" margin="normal" onClick={() => {this.updateAuth()}} > Get authToken </Button>

                
            </div>)
    }
     
}

export default Login