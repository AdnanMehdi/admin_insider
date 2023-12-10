import {parseCookies} from 'nookies'
import jwt from 'jsonwebtoken'

export async function getServerSideProps(ctx){
  const {token} = parseCookies(ctx)

  // const verifyToken = jwt.verify(token,'deeninsider')

  const TOKEN = jwt.verify(token,'deeninsider',function(err,decode){
    decode
    err.name
  })

  if(!TOKEN){
    return {
      redirect: {
        permanent: false,
        destination: '/login'
      }
    }
  }

  return{
    props:{}
  }

}