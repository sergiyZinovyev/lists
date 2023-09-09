const React = require('react');
const Card = require('@mui/material/Card').default;
const CardContent = require('@mui/material/CardContent').default;
const CardMedia = require('@mui/material/CardMedia').default;
const Typography = require('@mui/material/Typography').default;
const IconButton = require('@mui/material/IconButton').default;
const CardActionArea = require('@mui/material/CardActionArea').default;
const CardActions = require('@mui/material/CardActions').default;
const DeleteForeverIcon = require('@mui/icons-material/DeleteForever').default;
const { Link } = require('react-router-dom');
const { useTheme } = require('../../theme-context.jsx');

function MultiActionAreaCard(props) {

  const { getColor, theme } = useTheme();

  function remove() {
      console.log('remove')
      props.onRemove()
  }

  return (
    <Card sx={{ 
      backgroundColor: getColor('foreground'), 
      color: getColor('text'),
      borderRadius: '10px',
      boxShadow: 'none',
    }}>
      <CardActionArea component={Link} to={`/list/${encodeURIComponent(props.card.id)}`}>
        <CardMedia
          component="img"
          style={{ objectFit: 'cover', width: '100%', height: '200px' }}
          image={`assets/img/${theme.pathName}/${props.card.type}.png`}
          alt={props.card.type}
        />
        <CardContent sx={{ 
          backgroundColor: getColor('foreground'),
        }}>
          <Typography gutterBottom variant="h5" component="div" sx={{ color: getColor('text') }}>
            {props.card.name}
          </Typography>
          <Typography variant="body2" >
            {props.card.describe}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ backgroundColor: getColor('foreground') }}>
        <IconButton aria-label="delete" style={{color: getColor('listtext')}} onClick={remove}>
            <DeleteForeverIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

module.exports = MultiActionAreaCard;
