import React from 'react'

export const Store = React.createContext();

const initialState = { 
    messageList:[
        {
            "content" : {
                "S" : "A message sent by ansdfadsgad id lung"
            },
            "userName" : {
                "S" : "Name Surname"
            },
            "userId" : {
                "S" : "029a1a22-8ede-4f4d-9dfd-b54e750b094d"
            }
        },
        {
            "content" : {
                "S" : "A message sent by an user id 23"
            },
            "userName" : {
                "S" : "Sending user name"
            },
            "userId" : {
                "S" : "23"
            }
        },
    ],
    allChannels:[
        {
            "id" : {
                "S" : "029a1a22-8ede-4f4d-9dfd-b54e750b094d"
            },
            "name" : {
                "S" : "Name Surname"
            }
        },
        {
            "id" : {
                "S" : "23"
            },
            "name" : {
                "S" : "Name11 Surname22"
            }
        }
    ],
    authToken: '',
    refreshToken: '',
    userId: '',
    selectedChannel: '',
};

function reducer(state, action) {
    switch(action.type){
        case 'SEND_MESSAGE': 
            return{...state, messageList: [...state.messageList, action.payload]};

        case 'SELECT_CHANNEL':
            return{...state, selectedChannel: action.payload}
        // case 'FETCH_DATA':
        //     return{...state, episodes: action.payload};
        // case 'ADD_FAV':
        //     return{...state, favorites: [...state.favorites, action.payload]};
        // case 'REMOVE_FAV':
        //     return {
        //         ...state,
        //         favorites: action.payload
        //     };
        default: 
            return state;
    } 

}

export function StoreProvider(props) { 

    const [state, dispatch] = React.useReducer(reducer, initialState);
    const value = {state, dispatch};
    return <Store.Provider value={value}> 
            {props.children} 
           </Store.Provider>
}