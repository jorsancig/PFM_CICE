import React from 'react';
import SerachCard from "./searchCard";

import Paper from "@material-ui/core/Paper";
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";


function newsInfo ({ image, name, description, classes }) {
	return(
			<Grid container class="col-centered">
				<Grid item md={6}>
					<SerachCard image={image} name={name} />
				</Grid>
				<Grid item md={6}>
					<div class="col-centered">
						<Paper /* class="col-centered" */>
							<Typography variant='body1' component="p" /* class="col-centered" */>
								{description}
							</Typography>
						</Paper>
					</div>
				</Grid>
			</Grid>
	);
}


export default (newsInfo);