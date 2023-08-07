import SpeakerComponent from '../speaker/SpeakerComponent'
import ListenerComponent from '../listener/ListenerComponent'
import WaitingComponent from '../common/WaitingComponent'
import * as ApiCalls from '../api/ApiCalls'

  
function User(){
  if(ApiCalls.getUserRole()==0){
    return SpeakerComponent();
  }
  else if(ApiCalls.getUserRole()==1){
    return ListenerComponent();
  }
  else{
    return WaitingComponent();
  }
}

export default User;