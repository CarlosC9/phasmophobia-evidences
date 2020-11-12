import React, { Component } from 'react';
import 'fontsource-roboto';
import {
  makeStyles,
  Theme,
  Typography,
  AppBar,
  Toolbar,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from '@material-ui/core';
import GhostEvidencesScreen from './screens/GhostEvidencesScreen';
import information from './json/information.json';

const useStyles = makeStyles((theme: Theme) => ({
  root: {

  },
  title: {
    flexGrow: 1,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

interface Props {
  classes: any;
}

interface State {
  language: 'english' | 'spanish';
}

class AppComponent extends Component<Props, State> {

  constructor(public props: Props) {
    super(props);
    this.state = {
      language: 'english',
    }

    this.languageChange = this.languageChange.bind(this);
  }

  languageChange(event: React.ChangeEvent<{ value: unknown }>) {
    const languageEvent: any = event.target.value;
    this.setState({
      language: languageEvent,
    });
  }


  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              {information.text.title[this.state.language]}
            </Typography>
          </Toolbar>
        </AppBar>
        <FormControl className={classes.formControl} style={{ float: "right", marginRight: '30px' }}>
          <InputLabel id="demo-simple-select-label">{information.text.language[this.state.language]}</InputLabel>
          <Select
            value={this.state.language}
            onChange={this.languageChange}
          >
            <MenuItem value={'spanish'}>{information.text.spanish[this.state.language]}</MenuItem>
            <MenuItem value={'english'}>{information.text.english[this.state.language]}</MenuItem>
          </Select>
        </FormControl>
        <GhostEvidencesScreen language={this.state.language}></GhostEvidencesScreen>
      </div>
    );
  }

  
}

export default function App() {
  const classes = useStyles();
  return (
    <AppComponent classes={classes} />
  )
}
