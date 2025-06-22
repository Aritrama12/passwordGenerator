import { useState,useCallback,useEffect,useRef } from 'react'



function App() {
  const [length,setLength] = useState(8)
  const [numberAllowed,setNumberAllowed] = useState(false)
  const [characterAllowed,setCharacterAllowed] = useState(true)
  const [password,setPassword] = useState("")


  //useRef() hook

  const passwordRef=useRef(null)

  const passordGenerator=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIZKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

  if(numberAllowed) str+="012345689"
  if(characterAllowed) str+="!@#$%^&*-_+=[]{}~`"

  for (let i = 1; i <= length; i++) {
    let char=Math.floor(Math.random()*str.length+1)
    
    pass+=str.charAt(char)
  }
  setPassword(pass)

  } , [length,numberAllowed,characterAllowed,setPassword])


// for copy password ****
  const copyPasswordToClipbord=useCallback(()=>{

    passwordRef.current?.select()
    passwordRef.current?.setSelectonRange(0,990);
    window.navigator.clipboard.writeText(password)
  },[password])

//


  useEffect(()=>{
    passordGenerator()
  },[length,numberAllowed,characterAllowed,passordGenerator])

  return (
    <>
        <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-700 bg-gray-800 ">
            
                <h1 className='text-white text-center my-3'>Password Generator</h1>

          <div className="flex shadow rounded-lg overflow-hidden mb-4">
                <input type="text"
                
                value={password}

                className='outline-none w-full py-1 px-3 bg-white'

                placeholder='password'
                readOnly
                ref={passwordRef}
                
                />
           
           <button 
           
           onClick={copyPasswordToClipbord}
           className=' outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
           

          </div>

<div className='flex text-sm gap-x-2'>

  <div className='flex items-center gap-x-1'>

    <input type="range" name="" id="" 
     min={6}
     max={100}
     value={length}

     className='cursor-pointer'

     onChange={(e)=>{setLength(e.target.value)}}
    />

    <label>Length: {length}</label>
  </div>

<div className='flex items-center gap-x-1'>

  <input type="checkbox" name="" 
  defaultChecked={numberAllowed}
   
  id="numberInput"

  onChange={()=>{
    setNumberAllowed((prev)=>!prev)
  }}

  

  
  />


<label htmlFor="numberInput">Numbers</label>


</div>

<div className='flex items-center gap-x-1'>

  <input type="checkbox" name="" 
  defaultChecked={characterAllowed}
   
  id="characterInput"

  onChange={()=>{
    setCharacterAllowed((prev)=>!prev)
  }}

  

  
  />


<label htmlFor="characterInput">Characters</label>


</div>

</div>
</div>
          
    </> 
  )
}

export default App
