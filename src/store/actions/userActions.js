import  * as actionTypes from '../types'
import axios from "axios";

export  const loginUser = (loginData, history) => (dispatch) => {
    dispatch({type: actionTypes.LOADING_UI})
    axios
        .post('/login', loginData)
        .then(({data}) => {
            const FBidToken = `Bearer ${data.token}`
            localStorage.setItem('FBidToken',  FBidToken);
            axios.defaults.headers.common['Authorization'] = FBidToken
            dispatch(getUserData())
            dispatch({type: actionTypes.CLEAR_ERRORS})
            history.push('/')

        })
        .catch(err => {
            dispatch({
                type: actionTypes.SET_ERRORS,
                payload: err.response.data
            })
        })
}

export  const signUpUser = (data, history) => (dispatch) => {
    dispatch({type: actionTypes.LOADING_UI})
    axios
        .post('/signup', data)
        .then(({data}) => {
            const FBidToken = `Bearer ${data.token}`
            localStorage.setItem('FBidToken',  FBidToken);
            axios.defaults.headers.common['Authorization'] = FBidToken
            dispatch(getUserData())
            dispatch({type: actionTypes.CLEAR_ERRORS})
            history.push('/')
        })
        .catch(err => {
            dispatch({
                type: actionTypes.SET_ERRORS,
                payload: err.response.data
            })
        })
}

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('FBidToken')
    delete axios.defaults.headers.common['Authorization']
    dispatch({type: actionTypes.SET_UNAUTHENTICATED})
}


export const getUserData = () => (dispatch) => {
        axios.get('/user')
            .then(({data}) => {
                dispatch({
                    type: actionTypes.SET_USER,
                    payload: data
                })
            })
            .catch(err => console.log(err))
}