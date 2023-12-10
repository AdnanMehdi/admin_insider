// ** Icon imports
import Blogs from 'mdi-material-ui/PostOutline'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import Gallery from 'mdi-material-ui/ImageMultipleOutline'
import Videos from 'mdi-material-ui/VideoVintage'
import Questions from 'mdi-material-ui/CommentQuestionOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'
import { parseCookies } from 'nookies'
import jwt from 'jsonwebtoken'


// const {token} = parseCookies()
// const verifyUser = jwt.decode(token)
// const role = verifyUser?.role

// var condition = role == "member" ? {
//   title: 'Add Member',
//   icon: AccountPlusOutline,
//   path: '/members',
// }: ""

// console.log(token,"asd")

const navigation = () => {

  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/dashboard'
    },
    {
      title: 'Account Settings',
      icon: AccountCogOutline,
      path: '/account-settings'
    },
    {
      sectionTitle: 'Pages'
    },

    //auth/..
    // condition,
    // {role  "root" ? 
    // {
    //   title: 'Add Member',
    //   icon: AccountPlusOutline,
    //   path: '/members',
    // } : ""},
    {
      title: 'Add Member',
      icon: AccountPlusOutline,
      path: '/members',
    },
        
    {
      title: 'Blogs',
      icon: Blogs,
      path: '/blogs',
      
    },
    {
      title: 'Gallery',
      icon: Gallery,
      path: '/gallery',
      
    },
    {
      title: 'Videos',
      icon: Videos,
      path: '/videos',
  
    },
    {
      title: 'Questions',
      icon: Questions,
      path: '/questions',
      
    },
    
    // {
    //   title: 'LogOut',
    //   icon: Questions,
    //   path: '/questions',
      
    // },
    
    // {
    //   sectionTitle: 'User Interface'
    // },
    // {
    //   title: 'Typography',
    //   icon: FormatLetterCase,
    //   path: '/typography'
    // },
    // {
    //   title: 'Icons',
    //   path: '/icons',
    //   icon: GoogleCirclesExtended
    // },
    // {
    //   title: 'Cards',
    //   icon: CreditCardOutline,
    //   path: '/cards'
    // },
    // {
    //   title: 'Tables',
    //   icon: Table,
    //   path: '/tables'
    // },
    // {
    //   icon: CubeOutline,
    //   title: 'Form Layouts',
    //   path: '/form-layouts'
    // }
  ]
}

export default navigation
