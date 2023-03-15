import React,{useState} from 'react'
import '../Style/Header.css'
import Modal from 'react-modal';
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';

const responseFacebook = (response) => {
  console.log(response);
}
const onSuccess = (res) => {
  console.log('success:', res);
};
const onFailure = (err) => {
  console.log('failed:', err);
};



const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    color: '#192f60',
   
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');


export default function Header() {
  const[isLoginModalOpen,setLoginModal]=useState(false)
  const[isAccountModalOpen,setAccountModal]=useState(false)
  return (
      <div class="rectangle">
        <span class="ellipse2">e!</span>
        <button class="login" onClick={()=>setLoginModal(true)}>login</button>
          <div class="dc">
            <button class="createAcc" onClick={()=>setAccountModal(true)}>Create an account</button>
          </div> 
          <Modal 
          isOpen={isLoginModalOpen}
          style={customStyles}
          >
            <h2>Login
              <button className='btn btn-danger danger' onClick={()=>setLoginModal(false)}>X</button>
            </h2> <br/><br/>
            <input type="text" placeholder='Enter your Name'/><br/><br/>
            <input type="text" placeholder='Enter your Password'/><br/><br/>
            <button type="button" class="btn btn-primary"><b>LogIn</b></button><br/><br/>
           
          <FacebookLogin
            appId="1225858948028566"
            autoLoad={false}
            fields="name,email,picture"
            // onClick={componentClicked}
            callback={responseFacebook} /><br/><br/>
            <GoogleLogin
          clientId="608437104666-p20733apqkaif0gls9vmbgve6ii41lal.apps.googleusercontent.com"
          buttonText="Sign in with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
      />
            
          </Modal> 
          <Modal
          isOpen={isAccountModalOpen}
          style={customStyles}
          >
            <div>
            <h2>Create an Account
              <button className='btn btn-danger danger' onClick={()=>setAccountModal(false)}>X</button>
            </h2> <br/>
            </div>
            <div>
              Name <br/>
              <input type="text" placeholder='Enter your Name'/><br/><br/>
              Mobile Number <br/>
              <input type="tel" id="phone" name="phone" placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required></input><br/><br/>
              E-mail Address <br/>
              <input type="email" placeholder="abc@gmail.com"/><br/><br/>
              Address <br/>
              <textarea  cols="50"> </textarea><br/><br/>
            </div>
            <button className="btn btn-success" style={{float:'right'}}>Proceed</button>
            </Modal> 
      </div>
  )
}
