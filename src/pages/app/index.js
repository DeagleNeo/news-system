import axios from "axios";
import { useEffect } from "react"
import Child from "../child";
import "./index.less"
const App = () => {

  useEffect(()=>{
    axios.get('/ajax/movieOnInfoList?token=&optimus_uuid=C20F2760241C11EC8633F39F3E0F3D6E7CC101F6AE984B36A10C1890D0EB059E&optimus_risk_level=71&optimus_code=10').then(res=>{
      console.log(res)
    })
  },[])

  return <div>
    Hello world
    <ul>
      <li className="test">11111111111</li>
      <li>11111111111</li>
    </ul>
    <Child />
  </div>
}

export default App;