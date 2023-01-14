import { useReducer, useCallback } from 'react'

/** define request status in three types */
const REQUEST_INIT = 'REQUEST_INIT'
const REQUEST_SUCCESS = 'REQUEST_SUCCESS'
const REQUEST_FAILURE = 'REQUEST_FAILURE'

/** define default initial state */
const defaultInitialState = {
  loading: false,
  data: null,
  error: null,
}

function reducer (state,action) {
  switch (action.type) {
    case REQUEST_INIT:
      return { ...defaultInitialState, loading: true }
    case REQUEST_SUCCESS:
      return { ...state, loading: false, data: action.payload }
    case REQUEST_FAILURE:
      return { ...state, loading: false, error: action.error }
    default:
      throw new Error('error')
  }
}

async function request (
  instance,
  dispatch
) {
  try {
    dispatch({ type: REQUEST_INIT })
    const result = await instance()
    dispatch({ type: REQUEST_SUCCESS, payload: result })
    return result
  } catch (error) {
    dispatch({ type: REQUEST_FAILURE, error })
    throw error
  }
}

function useRequest (
  instance,
  initialState
) {
  const initialIState = {
    ...defaultInitialState,
    ...initialState,
  }
  const [state, dispatch] = useReducer(reducer, initialIState)

  function requestCallback (...args) {
    return request(() => instance(...args), dispatch)
  }

  const memoizedRequestCallback = useCallback(requestCallback, [])

  return [state, memoizedRequestCallback]
}

export default useRequest