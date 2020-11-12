import React, { Component } from 'react';
import {
    Grid,
    makeStyles,
    Theme,
    Paper,
    FormControlLabel,
    FormGroup,
    FormControl,
    Checkbox,
    Snackbar,
    List,
    ListItem,
    ListItemText,
    Typography,
} from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import information from '../json/information.json';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        padding: '10px',
    },
    paper: {
        padding: theme.spacing(1),
    },
    formControl: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        marginLeft: theme.spacing(3),
    },
}));

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface Props {
    classes: any;
    language: 'english' | 'spanish';
}

class GhostEvidencesScreenComponent extends Component<Props, any> {

    possibleGhosts: Array<string>;

    constructor(public props: Props) {
        super(props);
        this.possibleGhosts = [];
        for (let key in information.ghosts) {
            this.possibleGhosts.push(key);
        }
        this.state = {
            snackBarEvidencesError: false,
            efmLvl5: false,
            freezingTemp: false,
            spiritBox: false,
            ghostWriting: false,
            ghostOrbs: false,
            fingerprints: false,
        }
        this.changeEvidence = this.changeEvidence.bind(this);
        this.closeSnackbarErrorEvidence = this.closeSnackbarErrorEvidence.bind(this);
    }

    changeEvidence(event: React.ChangeEvent<HTMLInputElement>) {
        const name = event.target.name;
        if (!event.target.checked) {
            this.setState({
                snackBarEvidencesError: false,
                [name]: false,
            }, () => {
                this.possibleGhosts = [];
                let evidencesActive = [];
                const ghost: any = information.ghosts;
                for (let key in information.evidences) {
                    if (this.state[key]) evidencesActive.push(key);
                }
                if (evidencesActive.length === 0) {
                    for (let key in information.ghosts) {
                        this.possibleGhosts.push(key);
                    }
                } else {
                    for (let key in ghost) {
                        let possibleGhostValidate = true;
                        for (let i in evidencesActive) {
                            if (!ghost[key].evidences.includes(evidencesActive[i])) {
                                possibleGhostValidate = false;
                                break;
                            }
                        }
                        if (possibleGhostValidate) this.possibleGhosts.push(key);
                    }
                }
                this.setState({});
            });
        } else {
            let amountActive = 0;
            for (let key in information.evidences) {
                if (this.state[key]) amountActive++;
            }
            if (amountActive <= 2) {
                this.setState({
                    snackBarEvidencesError: false,
                    [name]: true,
                }, () => {
                    this.possibleGhosts = [];
                    let evidencesActive = [];
                    const ghost: any = information.ghosts;
                    for (let key in information.evidences) {
                        if (this.state[key]) evidencesActive.push(key);
                    }
                    for (let key in ghost) {
                        let possibleGhostValidate = true;
                        for (let i in evidencesActive) {
                            if (!ghost[key].evidences.includes(evidencesActive[i])) {
                                possibleGhostValidate = false;
                                break;
                            }
                        }
                        if (possibleGhostValidate) this.possibleGhosts.push(key);
                    }

                    this.setState({});
                });
            } else {
                this.setState({ snackBarEvidencesError: true });
            }
        }
    }

    closeSnackbarErrorEvidence(event?: React.SyntheticEvent, reason?: string) {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ snackBarEvidencesError: false });
    };

    render() {
        const classes = this.props.classes;
        return (
            <div className={classes.root}>
                <Grid container spacing={2}>

                    <Grid item xs={12} sm={12} lg={6}>
                        <Paper className={classes.paper}>
                            <Typography variant="h6" style={{ marginLeft: '20px', color: '#9A9595' }}>{information.text.checkboxEvidencesLabel[this.props.language]}</Typography>
                            <FormControl className={classes.formControl}>
                                <FormGroup>
                                    <FormControlLabel
                                        control={<Checkbox name='efmLvl5' color='primary' checked={this.state.efmLvl5} onChange={this.changeEvidence} />}
                                        label={information.evidences.efmLvl5.text[this.props.language]}
                                    />
                                    <FormControlLabel
                                        control={<Checkbox name='freezingTemp' color='primary' checked={this.state.freezingTemp} onChange={this.changeEvidence} />}
                                        label={information.evidences.freezingTemp.text[this.props.language]}
                                    />
                                    <FormControlLabel
                                        control={<Checkbox name='spiritBox' color='primary' checked={this.state.spiritBox} onChange={this.changeEvidence} />}
                                        label={information.evidences.spiritBox.text[this.props.language]}
                                    />
                                    <FormControlLabel
                                        control={<Checkbox name='ghostWriting' color='primary' checked={this.state.ghostWriting} onChange={this.changeEvidence} />}
                                        label={information.evidences.ghostWriting.text[this.props.language]}
                                    />
                                    <FormControlLabel
                                        control={<Checkbox name='ghostOrbs' color='primary' checked={this.state.ghostOrbs} onChange={this.changeEvidence} />}
                                        label={information.evidences.ghostOrbs.text[this.props.language]}
                                    />
                                    <FormControlLabel
                                        control={<Checkbox name='fingerprints' color='primary' checked={this.state.fingerprints} onChange={this.changeEvidence} />}
                                        label={information.evidences.fingerprints.text[this.props.language]}
                                    />
                                </FormGroup>
                            </FormControl>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={12} lg={6}>
                        <Paper className={classes.paper}>
                            <Typography variant="h6" style={{ marginLeft: '20px', color: '#9A9595' }}>
                                {information.text.labelPossibleGhost[this.props.language]}
                            </Typography>
                            <List component="nav" className={classes.root} aria-label="mailbox folders">
                                {
                                    this.possibleGhosts.map((item: any, index: number, array: Array<string>) => {
                                        const ghost: any = information.ghosts;
                                        if (index === (array.length - 1)) {
                                            return (
                                                <ListItem button>
                                                    <ListItemText primary={ghost[item].text[this.props.language]} />
                                                </ListItem>
                                            )
                                        }
                                        return (
                                            <ListItem button divider>
                                                <ListItemText primary={ghost[item].text[this.props.language]} />
                                            </ListItem>
                                        )
                                    })
                                }
                            </List>
                        </Paper>
                    </Grid>

                </Grid>
                <Snackbar open={this.state.snackBarEvidencesError} autoHideDuration={6000} onClose={this.closeSnackbarErrorEvidence}>
                    <Alert onClose={this.closeSnackbarErrorEvidence} severity="error">
                        {information.text.snackbarEvidenceError[this.props.language]}
                    </Alert>
                </Snackbar>
            </div>
        );
    }
}

export default function GhostEvidencesScreen(props: { language: 'english' | 'spanish' }) {
    const classes = useStyles();
    return (
        <GhostEvidencesScreenComponent classes={classes} language={props.language} />
    )
}