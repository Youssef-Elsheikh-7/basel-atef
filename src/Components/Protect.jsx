//
// eslint-disable-next-line no-unused-vars
import { Navigate, useNavigate } from 'react-router-dom'
export default function ProtectedRoutes(props) {
  
  if(localStorage.getItem("token")){
  
    return <Navigate  to={"/"}/>
  }
  else{
    // eslint-disable-next-line react/prop-types
    return props.children
  }
}