import  * as actionTypes from '../types'

const initialState = {
    loading: false,
    screams: ''
}


export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.SET_SCREAMS:
            return {
                ...state,
                loading: false,
                screams: action.payload
            }
        case actionTypes.LOADING_DATA:
            return {
                ...state,
                loading: true
            }

        case actionTypes.LIKE_SCREAM:
        case actionTypes.UNLIKE_SCREAM:
            let index  = state.screams.findIndex((scream) => scream.screamId === action.payload.screamId)
            state.screams[index] = action.payload
            return  {
                ...state
            }

        case actionTypes.DELETE_SCREAM:
             //index  = state.screams.findIndex((scream) => scream.screamId === action.payload)
             //state.screams.splice(index, 1)

            return  {
                ...state,
                screams: state.screams.filter((scream) => scream.screamId !== action.payload)
            }

        default: return  state
    }
}




