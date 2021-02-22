import store from "../store"
import { setCurrentUser } from "../../src/actions/authActions";
const axios = require("axios");
const axiosInstance  = axios.create({
    // headers : {
    //     'Authorization' : localStorage.jwtToken
    // }
});



// axiosInstance.interceptors.request.use(req => {
//     // const {cart} = store.getState();
//     this.setState({error:null});
//     // if(localStorage.jwtToken) {
//     // setAuthToken(localStorage.jwtToken);

//     // }
//     return req;
// });
// axiosInstance.interceptors.response.use(res => res , error => {
//     this.setState({error:error})
//     console.log(error.response,'intercepo');
//     if(error.response.status == "401" ) {
//         // localStorage.clear();
//         // localStorage.removeItem("jwtToken");
//         // localStorage.removeItem("isAdmin");
     
//         // // // Remove auth header for future requests
//         // setAuthToken(false) 
//         store.dispatch(setCurrentUser({}))
//         // dispatch({type: SET_CURRENT_USER,
//         //     payload: {}})
//         // this.props.logoutUser();
//     return this.props.history.push('/login');
        
//     }
//     return this.props.history.push('/error');
// });
// axiosInstance.interceptors.request.use((req) => {
//     console.log('lll');

//       return req;
//     },(error) => {
//         console.log(error,'axiosinterceptor');
//         return Promise.reject(error)
//       })

// axiosInstance.interceptors.response.use((res) => {
//     console.log('lll');
//       return res;
//     },(error) => {
//       console.log(error.response,'axiosinterceptor');
//       const {status} = error.response;
//       if(status === 500 )
//       {
//           localStorage.clear();
//           console.log('5555');
//       }
//       return Promise.reject(error)

//     })
    export default axiosInstance;