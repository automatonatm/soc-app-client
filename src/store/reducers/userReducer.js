import  * as actionTypes from '../types'

const initialState = {
    loading: false,
    authenticated: false,
    credentials: {},
    likes: [],
    notifications: []
}


export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            }

        case actionTypes.SET_UNAUTHENTICATED:
            return initialState

        case actionTypes.SET_USER:
            return {
                ...state,
                authenticated: true,
                loading: false,
              ...action.payload
            }

        case actionTypes.LIKE_SCREAM:
            return {
                ...state,
                likes: [
                    ...state.likes,
                    {
                        userHandle: state.credentials.handle,
                        screamId: action.payload.screamId
                    }
                ],

            }

        case actionTypes.UNLIKE_SCREAM:
            return  {
                ...state,
                likes: state.likes.filter(like => like.screamId !== action.payload.screamId)
            }

        case  actionTypes.LOADING_USER:
            return {
                ...state,
                loading: true
            }

        default:
            return state
    }
}