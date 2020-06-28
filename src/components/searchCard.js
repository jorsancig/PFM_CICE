import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography } from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import GamepadIcon from '@material-ui/icons/Gamepad';
import axios from 'axios';



function SearchCard({ name, classes, image, to, appid }) {

	const updateClass = async (collection) => {
		const username = localStorage.getItem('username')
		const params = {
				userID: username,
				tittle: name,
				url: to,
				image: image,
				collectionClass: collection,
				appID: appid
		}
		let game
		try {
			const url = `http://localhost:8000/api/collections/edit/${ appid }`
			 game = await axios.post( url, params )
			console.log( 'UPDATED: ', game )
			if( !game.data.updated ){
				const urlAdded = `http://localhost:8000/api/collections/add/`
				await axios.post( urlAdded, params )
			}
			return	
		} catch (error) {
			console.log( error )
		}
		// if( game.status == 200 )
		
	}

	const handleFollow = () => {
		const toClass = 'FOLLOW_CLASS'
		updateClass( toClass )
		
	}



	const handleLove = () => {
		const toClass = 'LOVE_CLASS'
		updateClass( toClass )
		
	}

	const handlePendent = () => {
		const toClass = 'PENDENT_CLASS'
		updateClass( toClass )
		
	}

	const handleGotten = () => {
		const toClass = 'COLLECTION_CLASS'
		updateClass( toClass )
		
	}

	return(
		<Card className={classes.root}>
			<CardActionArea>
				<CardMedia
				className={classes.media}
				image={ image }
				title="Contemplative Reptile"
				/>
				<CardContent>
				<Typography gutterBottom variant="h5" component="h2">
					{name}
				</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions>
				<Button
					variant="outlined"
					// color="secondary"
					className={classes.button}
					startIcon={<FavoriteIcon />}
					onClick={handleFollow}

				>
					Seguir
				</Button>
				<Button
					variant="outlined"
					color="primary"
					className={classes.button}
					startIcon={<GamepadIcon />}
					onClick={handlePendent}

				>
					Pendiente
				</Button>
				<Button
					variant="outlined"
					color="primary"
					className={classes.button}
					startIcon={<SportsEsportsIcon />}
					onClick={handleGotten}

				>
					¡Lo tengo!
				</Button>
				<Button
					variant="outlined"
					color="secondary"
					className={classes.button}
					startIcon={<FavoriteIcon />}
					value={appid+'_'+'LOVE_CLASS'}
					onClick={handleLove}
				>
					¡Me encanta!
				</Button>
				
			</CardActions>
		</Card>
			);
}

export default withStyles({
	item:{
		minWidth: "350px",
		textAlign: "center",
		margin: "2em",
		padding: '1em'
	},
	media:{
		minHeight: "350px"
	}
})(SearchCard);