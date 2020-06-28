import React, { useEffect, useState } from 'react'
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import AppNav from '../components/AppNav';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import GamepadIcon from '@material-ui/icons/Gamepad';
import Button from '@material-ui/core/Button';
import { ButtonGroup } from '@material-ui/core';





const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
    },
    title: {
      color: theme.palette.primary.light,
    },
    titleBar: {
      background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
  }),
);



interface CollectionClass {
    appID: number
    collectionClass: null | string
    createdAt: null | string
    image: string
    tittle: null | string
    url: null | string
    userID: string

}

const userName = localStorage.getItem( 'username' )

const getCollection = async ( collectionName:any ) => {

  const url = `http://localhost:8000/api/collections/collection/${ collectionName }`
  const body = {
                  userID: userName
                }
  try {
    const collection = await axios.post( url, body)
    return collection.data
  } catch (error) {
    console.log( error )
  }
}

const getLoveClass = async () => {

  const className = 'LOVE_CLASS'
  try {
    const colecction:any = await getCollection( className )
    console.log( className, colecction )
    return await colecction
    
  } catch (error) {
    return []
  }

}

const getFollowClass = async () => {

  const className = 'FOLLOW_CLASS'
  try {
    const colecction:any = await getCollection( className )
    console.log( className, colecction )
    return await colecction
    
  } catch (error) {
    return []
  }

}

const getPendentClass = async () => {

  const className = 'PENDENT_CLASS'
  try {
    const colecction:any = await getCollection( className )
    console.log( className, colecction )
    return await colecction
    
  } catch (error) {
    return []
  }

}

const getCollectionClass = async () => {

  const className = 'COLLECTION_CLASS'
  try {
    const colecction:any = await getCollection( className )
    console.log( className, colecction )
    return await colecction
    
  } catch (error) {
    return []
  }

}



const CollectionsView:React.FC = () =>{
  const [loveCollection, setLoveCollection] = useState<CollectionClass[]>([])
  const [followCollection, setFollowCollection] = useState<CollectionClass[]>([])
  const [collectCollection, setCollectCollection] = useState<CollectionClass[]>([])
  const [pendentCollection, setPendentCollection] = useState<CollectionClass[]>([]) 

  const fetchLoveClass = async () => {
    const responseLove = await getLoveClass()
    const loveClass = await responseLove
    setLoveCollection(loveClass)
  }
  useEffect(() => {
    fetchLoveClass()
  }, [])

  const fetchFollowClass = async () => {
    const responseLove = await getFollowClass()
    const loveClass = await responseLove
    setFollowCollection(loveClass)
  }
  useEffect(() => {
    fetchFollowClass()
  }, [])

  const fetchPendenteClass = async () => {
    const responseLove = await getPendentClass()
    const loveClass = await responseLove
    setPendentCollection(loveClass)
  }
  useEffect(() => {
    fetchPendenteClass()
  }, [])

  const fetchCollectionClass = async () => {
    const responseLove = await getCollectionClass()
    const loveClass = await responseLove
    setCollectCollection(loveClass)
  }
   useEffect(() => {
    fetchCollectionClass()
  }, [])

 


  const updateClass = async (newCollection:string, currentGame:any) => {
    console.log( 'CURRENT', currentGame  )
    const username = localStorage.getItem('username')
    const params = {
        userID: username,
        tittle: currentGame.tittle,
        name: currentGame.name,
        url: currentGame.url,
        image: currentGame.image,
        collectionClass: newCollection,
        appID: currentGame.appID
    }
    try {
      const url = `http://localhost:8000/api/collections/edit/${ currentGame.appID }`
       const game = await axios.post( url, params )
      console.log( 'UPDATED: ', game )

      fetchLoveClass()
      fetchFollowClass()
      fetchPendenteClass()
      fetchCollectionClass()
      return	
    } catch (error) {
      console.log( error )
    }
    // if( game.status == 200 )
    fetchLoveClass()
    fetchFollowClass()
    fetchPendenteClass()
    fetchCollectionClass()

    
  }
  
  const handleFollow = ( currentGame:any ) => {
    const toClass = 'FOLLOW_CLASS'
    updateClass( toClass, currentGame )
    
  }  
  
  
  const handleLove = ( currentGame:any ) =>{
    console.log( currentGame )
    const toClass = 'LOVE_CLASS'
    updateClass( toClass, currentGame )
    
  }
  
  const handlePendent = ( currentGame:any ) => {
    const toClass = 'PENDENT_CLASS'
    updateClass( toClass, currentGame )
    
  }
  
  const handleGotten = ( currentGame:any ) => {
    const toClass = 'COLLECTION_CLASS'
    updateClass( toClass, currentGame )
    
  }


  const checkElement = ( collection:any ) => {

      const message = collection.message
      if( message ) return false
      return true

  }


  



  // const pendentClass = getPendentClass()
  // const followClass = getFollowClass()
  // const collectionClass = getCollectionClass()
  const classes = useStyles();


  return (
    <>
      <AppNav />
      {checkElement( loveCollection ) && <h1>¡Me encanta</h1> }
      <GridList className={classes.gridList} cols={2.5}>
       {checkElement( loveCollection ) && loveCollection.map((game) => (
          <GridListTile >
            <img src={game.image} />
            <GridListTileBar
              title={game.tittle}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
              actionIcon={
                <ButtonGroup >
                  <Button variant="contained" onClick={() => handleFollow( game )}><FavoriteIcon/></Button>
                  <Button variant="contained" color="primary" onClick={() => handlePendent( game )}><GamepadIcon/></Button>
                  <Button variant="contained" color="primary" onClick={() => handleGotten( game )}><SportsEsportsIcon/></Button>
                  <Button variant="contained" color="secondary" onClick={() => handleLove( game )}><FavoriteIcon/></Button>
                </ButtonGroup>
              }
            />
          </GridListTile>
        ))}      
      </GridList>
      {checkElement( followCollection ) && <h1>Siguiendo</h1> }
      <GridList className={classes.gridList} cols={2.5}>
       {checkElement( followCollection ) && followCollection.map((game) => (
          <GridListTile >
            <img src={game.image} />
            <GridListTileBar
              title={game.tittle}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
              actionIcon={
                <ButtonGroup >
                  <Button variant="contained" onClick={() => handleFollow( game )}><FavoriteIcon/></Button>
                  <Button variant="contained" color="primary" onClick={() => handlePendent( game )}><GamepadIcon/></Button>
                  <Button variant="contained" color="primary" onClick={() => handleGotten( game )}><SportsEsportsIcon/></Button>
                  <Button variant="contained" color="secondary" onClick={() => handleLove( game )}><FavoriteIcon/></Button>
                </ButtonGroup>
              }
            />
          </GridListTile>
        ))}      
      </GridList>
      {checkElement( pendentCollection ) && <h1>Pendiente</h1> }
      <GridList className={classes.gridList} cols={2.5}>
       {checkElement( pendentCollection ) && pendentCollection.map((game) => (
          <GridListTile >
            <img src={game.image} />
            <GridListTileBar
              title={game.tittle}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
              actionIcon={
                <ButtonGroup >
                  <Button variant="contained" onClick={() => handleFollow( game )}><FavoriteIcon/></Button>
                  <Button variant="contained" color="primary" onClick={() => handlePendent( game )}><GamepadIcon/></Button>
                  <Button variant="contained" color="primary" onClick={() => handleGotten( game )}><SportsEsportsIcon/></Button>
                  <Button variant="contained" color="secondary" onClick={() => handleLove( game )}><FavoriteIcon/></Button>
                </ButtonGroup>
              }
              // } 
            />
          </GridListTile>
        ))}      
      </GridList>
      {checkElement( collectCollection ) && <h1>Lo tengo</h1> }
      <GridList className={classes.gridList} cols={2.5}>
       {checkElement( collectCollection ) && collectCollection.map((game) => (
          <GridListTile >
            <img src={game.image} />
            <GridListTileBar
              title={game.tittle}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
              actionIcon={
                <ButtonGroup >
                  <Button variant="contained" onClick={() => handleFollow( game )}><FavoriteIcon/></Button>
                  <Button variant="contained" color="primary" onClick={() => handlePendent( game )}><GamepadIcon/></Button>
                  <Button variant="contained" color="primary" onClick={() => handleGotten( game )}><SportsEsportsIcon/></Button>
                  <Button variant="contained" color="secondary" onClick={() => handleLove( game )}><FavoriteIcon/></Button>
                </ButtonGroup>
              }
            />
          </GridListTile>
        ))}      
      </GridList>

    </>
  )


}

export default CollectionsView;