import {createStore} from '../lib/redux.min.js'

const cartReducer =(state={
  cart:[]
},action)=>{
  switch(action.type){
    default:
      return state
  }
}

export default createStore(cartReducer)