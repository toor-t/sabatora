//
// AppTopComponent
//
'use strict';
import * as React from 'react';
import * as classNames from 'classnames';
import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

// tslint:disable-next-line:import-name
import MenuIcon from '@material-ui/icons/Menu';
// tslint:disable-next-line:import-name
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// tslint:disable-next-line:import-name
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CreateFormContainer from '../containers/CreateFormContainer';

const drawerWidth = 240;

const styles = (theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            // height: 440,
            zIndex: 1,
            overflow: 'hidden',
            position: 'relative',
            display: 'flex'
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            })
        },
        appBarShift: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen
            })
        },
        menuButton: {
            marginLeft: 12,
            marginRight: 36
        },
        hide: {
            display: 'none'
        },
        drawerPaper: {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen
            })
        },
        drawerPaperClose: {
            overflowX: 'hidden',
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            }),
            width: theme.spacing.unit * 7,
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing.unit * 9
            }
        },
        toolbar: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: '0 8px',
            ...theme.mixins.toolbar
        },
        content: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.default,
            padding: theme.spacing.unit * 3
        }
    });

export interface IAppTopComponentStateProps {
    // TODO:
    selected: number;
    drawerOpend: boolean;
}
export interface IAppTopComponentDispatchProps {
    // TODO:
    onOpenDrawer: () => void;
    onCloseDrawer: () => void;
}

class AppTopComponent extends React.Component<
    IAppTopComponentStateProps &
        IAppTopComponentDispatchProps &
        WithStyles<typeof styles> & { theme: Theme }
> {
    // handleDrawerOpen = () => {
    // 	this.setState({ open: true });
    // };

    // handleDrawerClose = () => {
    // 	this.setState({ open: false });
    // };

    render() {
        const { classes, theme } = this.props;

        return (
            <div className={classes.root}>
                <AppBar
                    position="fixed"
                    className={classNames(
                        classes.appBar,
                        this.props.drawerOpend && classes.appBarShift
                    )}
                >
                    <Toolbar disableGutters={!this.props.drawerOpend}>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.props.onOpenDrawer}
                            className={classNames(
                                classes.menuButton,
                                this.props.drawerOpend && classes.hide
                            )}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="title" color="inherit" noWrap={true}>
                            帳票作成
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: classNames(
                            classes.drawerPaper,
                            !this.props.drawerOpend && classes.drawerPaperClose
                        )
                    }}
                    open={this.props.drawerOpend}
                >
                    <div className={classes.toolbar}>
                        <IconButton onClick={this.props.onCloseDrawer}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    {/* <List>{mailFolderListItems}</List> */}
                    <Divider />
                    {/* <List>{otherMailFolderListItems}</List> */}
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar} />

                    <CreateFormContainer />
                </main>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(AppTopComponent);
