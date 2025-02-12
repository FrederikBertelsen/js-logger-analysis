import React, {useState} from 'react';


const Displayer = () => {
    const [counter, setCounter] = useState(0);
    function incrementConter(){
        setCounter(counter+1)
    }
    return (

    <>
      <button className="d-flex flex-column" style={{height: '100vh', width: '200vh'}} onClick = {incrementConter}>{counter}</button>
    </>
    );
}
export default Displayer;