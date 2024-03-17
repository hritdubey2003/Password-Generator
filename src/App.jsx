import { useState , useCallback, useEffect , useRef } from 'react'

import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed , setNumberallowed ] = useState( false )
  const [ charactersAllowed , setcharactersAllowed ] = useState( false ) 
  const [ password , setPassword ] = useState("")

  const passwordref = useRef( null )

  const passwordGenearator = useCallback( () => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if ( numberAllowed ) str += "0123456789"
    if ( charactersAllowed ) str += "!@#$%^&*(){}[]"

    for ( let i = 1 ; i <= length ; i++ ) {
        let char = Math.floor( Math.random() * str.length + 1 )

        pass += str.charAt( char );
    }
  
    setPassword( pass )
  } , [ length , numberAllowed , setcharactersAllowed , setPassword ])

  const copypasswordtoclipboard = useCallback(() => {
    passwordref.current?.select()
    window.navigator.clipboard.writeText( password )
  } , [ password ] )

  useEffect(() => {
    passwordGenearator()
  } , [ length , numberAllowed , charactersAllowed , passwordGenearator ])
  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-50'>
    <h1 className='text-center text-wrap my-3'> Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input 
          type='text'
          value={password}
          className='outline-none w-full py-1 px-3 my-3'
          placeholder='password'
          ref={passwordref}
          readOnly
        />
        <button
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 my-3 b' 
        onClick={copypasswordtoclipboard}>Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1 my-3'>
          <input 
          type='range'
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e) => setLength( e.target.value) }
          />

          <label htmlFor=''>Length: {length} </label>
        </div>
        <div className='flex items-center gap-x-1 my-3'>
          <input 
          type='checkbox'
          defaultChecked = {numberAllowed}
          id='characterInput'
          onChange={() => setNumberallowed( ( prev ) => !prev ) }
          />

          <label htmlFor=''>Numbers</label>
        </div>
        <div className='flex items-center gap-x-1 my-3'>
          <input 
          type='checkbox'
          defaultChecked = {charactersAllowed}
          onChange={() => setcharactersAllowed( ( prev ) => !prev ) }
          />

          <label htmlFor=''>Characters</label>
        </div>
      </div>
    </div>
       </>
  )
}

export default App
