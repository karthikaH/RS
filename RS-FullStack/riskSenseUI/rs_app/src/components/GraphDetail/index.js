import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

function GraphDetailCard(props) {
  const { classes } = props;
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="headline" component="h3">
              Scatter/Bubble Chart using the top vulnerable ports data from D-Shield
          </Typography>
          <Typography className={classes.title} color="textSecondary">
               <span>Color shows the RS<sup>3 </sup>ranges</span><br/>
               <span>Size shows the host count</span>
          </Typography>
          <Typography className={classes.title} color="textSecondary">
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

GraphDetailCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GraphDetailCard);
