const validateUser = () => {
    const username = localStorage.getItem('username')
    let actived
    if( username ) actived = localStorage.getItem('status_'+username)
    if ( actived ){
      if( actived === '1' ) return true
    }
    return false
  
}

export default validateUser

