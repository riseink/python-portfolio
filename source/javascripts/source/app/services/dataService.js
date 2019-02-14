const dataService = store => next => action => {
  /*
  Pass all actions through by default
  */
  next(action)
  switch (action.type) {
  case 'GET_CART_COUNT':
        next({
          type: 'GET_CART_COUNT_RECEIVED',
          count: 3
        })
  
    break
  /*
  Do nothing if the action does not interest us
  */
  default:
    break
  }

};

export default dataService