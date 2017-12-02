/* 
Intercepts  @@localize/SET_ACTIVE_LANGUAGE action types from react-localize-redux
and adds changed language to cookies. Allows persistent language selection
*/
import Cookies from 'universal-cookie'
const cookies = new Cookies()

const cookiesMiddleware = store => next => action => {
  if (action.type == '@@localize/SET_ACTIVE_LANGUAGE') {
    cookies.set('language', action.payload.languageCode, { path: '/' })
  }
  return next(action)
}

export default cookiesMiddleware
