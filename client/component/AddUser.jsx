import axios from 'axios';
import React, { useRef, useState } from 'react'
import { HandlePopup } from './NotifinationHttp';

const AddUser = ({token}) => {
    const [mount,setMount] = useState();
    const imgWrapper = useRef();
    const [value,setValue] = useState("");

    const HandleAdd = async (e) =>{
        if(value.length<10){
            return;
        }else{
            const data = {
                token : token,
                email : value
            }
            const result = await axios.post("http://localhost:8000/account/addfriend",data);
            if(result && result.data){
                if(!result.data.error){
                    setValue("");
                }

                await HandlePopup(3000,result.data.message,result.data.response_code,setMount);

            }
        }
    }
    const HandleChange = (e) =>{
        setValue(e.target.value);
    }

  return (
    <div className="adduserParent">
        {mount}
        <div className="wrapper">
            <input type="text" onChange={HandleChange} value={value} />
            <div className='imgWrapper' ref={imgWrapper}>
            <img src="/png/search.png" onClick={HandleAdd} />
            </div>
        </div>
    </div>
  )
}

export default AddUser