import React, { useReducer, useRef } from 'react';
import '../Components/reducer.css'

const initialState = [];

const reducer = (state, action) => {
  switch (action.type) {
    case 'input':
      return [...state, { id: state.length, val: action.val, toggle: false }];
    case 'toggle':
      const newstate = state.map((item) => {
        if (item.id === action.id) {
          return { ...item, toggle: !item.toggle }
        }
        else {
          return item
        }
      })
      return newstate;
    default:
      return state;
  }
};

function UseReducer() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const inpref = useRef()

  function storeInput(e) {
    if (e.code === 'Enter' && e.target.value.trim() !== "") {
      dispatch({ type: 'input', val: e.target.value });
      e.target.value = " ";
    }
  };


  function focus1() {
    inpref.current.focus()
  }

  return (
    <div className='body'>
      <input
        type="text"
        onKeyDown={(e) => storeInput(e)} ref={inpref}
      />
      <div className='text'>
        {state.map((item, ind) => (
          <div key={ind}>
            {item.toggle ? <h1>Content is Hidden</h1> : <h1>{item.val}</h1>}
            <div>
              <button onClick={() => dispatch({ type: 'toggle', id: item.id })}>Toggle</button>
            </div>
          </div>
        ))}
      </div>

      <button onClick={focus1} className='focus'>Focus</button>
    </div>
  );
}

export default UseReducer;
