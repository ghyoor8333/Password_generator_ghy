import { logDOM } from '@testing-library/react'
import React, { useState } from 'react'
import { act } from 'react-dom/test-utils'

export default function TodoList() {
    const [activity,setActivity]=useState("")
    const [listData,setlistData]=useState([])
    const[toggleSubmit,setToggleBtn]=useState(true)
    const[isEditItem,setIsEditItem]=useState(null)
    function addActivity(){

            // setlistData([...listData,activity])
            // console.log(listData);
            if(activity && !toggleSubmit){
                 setlistData(
                  listData.map((elem,id)=>{                     
                      //  console.log(elem);
                      if(id===isEditItem){
                        console.log("done");
                        return activity
                      }
                      // console.log(elem,"eeeeee");
                      return elem
                  })
                 )
            }else(
                setlistData((listData)=>{
                const updateList=[...listData,activity]
                // console.log(updateList);
                setActivity('')
                return updateList
            })
            )
            
            setToggleBtn(true)
            setIsEditItem('')
            setActivity('')
    }
    function removeActivity(i){
         const updatedListData=listData.filter((elem,id)=>{
            return i!=id;
         })
         setlistData(updatedListData)
    }
    const updateItems=(i)=>{
        const newValue=[...listData].map((newVal,id)=>{
          // console.log(newVal)         
          // console.log(i,"...");
          // console.log(id,"////");
          if(i==id){           
            // console.log(i);         
            return newVal;
          }
        })
        // console.log(newValue,"...");
        // console.log(i,"...");
        setActivity(newValue[i])
        setToggleBtn(false)
        setActivity(newValue[i])
        setIsEditItem(i)   //IsEditItem me id chali jayegi
         
       
     }
   
    function removeAll(){
        setlistData([])
    }
  return (
    <>
    <div className='container'>
          <div className='header'>TODO LIST</div>
          <input type='text' placeholder='Add activity' value={activity} onChange={(e)=>setActivity(e.target.value)}/>
          {toggleSubmit? <button onClick={addActivity}>ADD</button> : <button onClick={addActivity}>Update</button> }
          
        <p className='List-heading'>Here is your list</p>
         {listData!=[] && listData.map((data,i)=>{
            return(
                <>
                    <h1 key={i}>
                        <div className='listData'>{data}</div>
                        <div className='btn-position'><button onClick={()=>removeActivity(i)} >DELETE</button></div>
                        <div className='btn-position_Update'><button onClick={()=>updateItems(i)} >Update</button></div>
                    </h1>
                </>
            )
         })}
         {listData.length>=1 && 
         <button onClick={removeAll}>Remove All</button>}
    </div>
    </>
  )
}
