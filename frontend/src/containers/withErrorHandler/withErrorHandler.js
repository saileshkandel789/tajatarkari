import React, {Component,Fragment} from 'react';
// import Modal from '../../components/UI/Modal/Modal';
// import Aux from '../Auxs/Aux';
import store from "../../store";

import setAuthToken from "../../utils/setAuthToken";
// import {useDispatch} from "react-redux";
import { SET_CURRENT_USER } from "../../actions/types";
import { connect } from "react-redux";
import {logoutUser, setCurrentUser} from "../../actions/authActions"




const withErrorHandler = (WrappedComponent,axios) => {
    
    return class extends Component {
        state = {
            error : null
        }
        componentDidMount(){
            axios.interceptors.request.use(req => {
                // const {cart} = store.getState();
                this.setState({error:null});
                // if(localStorage.jwtToken) {
                // setAuthToken(localStorage.jwtToken);

                // }
                return req;
            });
            axios.interceptors.response.use(res => res , error => {
                this.setState({error:error})
                console.log(error.response,'intercepo');
                if(error.response.status == "401" ) {
                    console.log('401');
                    // localStorage.clear();
                    // setAuthToken(false)


                    localStorage.removeItem("jwtToken");
                    localStorage.removeItem("isAdmin");
                 
                    // // // Remove auth header for future requests
                    setAuthToken(false) 
                    store.dispatch(setCurrentUser({}))

                    // dispatch({type: SET_CURRENT_USER,
                    //     payload: {}})
                    // this.props.logoutUser();
                return this.props.history.push('/login');
                    
                }
                // localStorage.clear();
                //     setAuthToken(false)
                //     store.dispatch(setCurrentUser({}))
                return this.props.history.push('/error');
            });
        }

        errorConfirmedHandler = ()=> {
            this.setState({error:null})
        }
        render() {
            return (
                    <Fragment >
                        
                           {this.state.error ? 'something went wrong' : null}
                        
                        <WrappedComponent {...this.props} />
                    </Fragment>
            )
        }
    }
   
}

export default withErrorHandler;
