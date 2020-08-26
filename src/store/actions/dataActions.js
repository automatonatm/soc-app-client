import  * as actionTypes from '../types'
import axios from "axios";


//Load all Screams
export const loadScreams = () => (dispatch) => {

    dispatch({type: actionTypes.LOADING_DATA})

    axios.get('/screams')
        .then(({data}) => {
            dispatch({
                type: actionTypes.SET_SCREAMS,
                payload: data
            })
        })
        .catch(error => {
            dispatch({
                type: actionTypes.SET_SCREAMS,
                payload: []
            })
            console.log(error)
        })

}


export const likeScream = (screamId) => (dispatch) => {
            axios
                .get(`/scream/${screamId}/like`)
                .then(({data}) => {
                    dispatch({
                        type: actionTypes.LIKE_SCREAM,
                        payload: data
                    })
                })
                .catch(err => console.log(err))
}



export const unLikeScream = (screamId) => (dispatch) => {
    axios
        .get(`/scream/${screamId}/unlike`)
        .then(({data}) => {
            dispatch({
                type: actionTypes.UNLIKE_SCREAM,
                payload: data
            })
        })
        .catch(err => console.log(err))
}

export const deleteScream = (screamId) => (dispatch) => {
    axios
        .delete(`/scream/${screamId}`)
        .then(()  => {
            dispatch({
                type: actionTypes.DELETE_SCREAM,
                payload: screamId
            })
        })
        .catch(err => console.log(err))
}