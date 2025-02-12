import React, {useState} from 'react';
import '../css/button.css';


const Displayer = () => {
    const [counter, setCounter] = useState(0);
    function incrementConter(){
        setCounter(counter+1)
    }
    return (
    <div className='center'>
      <button className='button' onClick = {incrementConter}>{counter}</button>
      <form>
        <div>
          <input type="text" style={{width: "80vh", height: "10vh", borderRadius: "20px", marginTop: "5vh"}}/>
          <input className='input-button' type="submit" value="Send" />
        </div>
      </form>
    </div>
    );
}
export default Displayer;