import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  root: {

    width: '100%',
   
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function TransitionAlerts() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  return (
    <div className={classes.root}>
      <Collapse in={open}>
        <Alert
        variant="filled" severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              
              onClick={() => {
                setOpen(false);
              }}
            >
            <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          Oops! Something went wrong
        </Alert>
      </Collapse>

    </div>
  );
}
