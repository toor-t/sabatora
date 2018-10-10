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
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
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
import ManageDataContainer from '../containers/ManageDataContainer';
import ConfigContainer from '../containers/ConfigContainer';
import AboutContainer from '../containers/AboutContainer';

const drawerWidth = 240;

const styles = (theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            // height: 440,
            zIndex: 1,
            overflow: 'hidden',
            position: 'relative'
            // display: 'flex'	// 'flex' だとウィンドウの横幅変更に正しく追従しない。なぜ？
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
            position: 'fixed',
            // whiteSpace: 'nowrap',
            width: drawerWidth
            // transition: theme.transitions.create('width', {
            // 	easing: theme.transitions.easing.sharp,
            // 	duration: theme.transitions.duration.enteringScreen
            // })
        },
        // drawerPaperClose: {
        // 	overflowX: 'hidden',
        // 	transition: theme.transitions.create('width', {
        // 		easing: theme.transitions.easing.sharp,
        // 		duration: theme.transitions.duration.leavingScreen
        // 	}),
        // 	width: theme.spacing.unit * 7,
        // 	[theme.breakpoints.up('sm')]: {
        // 		width: theme.spacing.unit * 9
        // 	}
        // },
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
            // marginLeft: -drawerWidth,
        }
    });

export namespace AppTopSelected {
    export const CreateForm = 1;
    export const ManageData = 2;
    export const Config = 3;
    export const About = 4;

    export const CreateFormTitle = '帳票作成';
    export const ManageDataTitle = 'データ管理';
    export const ConfigTitle = '設定';
    export const AboutTitle = 'About';
}
export interface IAppTopComponentStateProps {
    // TODO:
    selected: number;
    drawerOpend: boolean;
}
export interface IAppTopComponentDispatchProps {
    // TODO:
    onOpenDrawer: () => void;
    onCloseDrawer: () => void;
    onSelectCreateForm: () => void;
    onSelectManageData: () => void;
    onSelectConfig: () => void;
    onSelectAbout: () => void;
}

class AppTopComponent extends React.Component<
    IAppTopComponentStateProps &
        IAppTopComponentDispatchProps &
        WithStyles<typeof styles> & { theme: Theme }
> {
    handleListButton(callback: () => void): () => void {
        return () => {
            callback();
            this.props.onCloseDrawer();
        };
    }
    render() {
        const { classes, theme, selected } = this.props;

        let Content: any = {};
        let AppBarTitle: string = '';
        switch (selected) {
            case AppTopSelected.CreateForm:
                // TODO:
                Content = CreateFormContainer;
                AppBarTitle = AppTopSelected.CreateFormTitle;
                break;
            case AppTopSelected.ManageData:
                // TODO:
                Content = ManageDataContainer;
                AppBarTitle = AppTopSelected.ManageDataTitle;
                break;
            case AppTopSelected.Config:
                // TODO:
                Content = ConfigContainer;
                AppBarTitle = AppTopSelected.ConfigTitle;
                break;
            case AppTopSelected.About:
                // TODO:
                Content = AboutContainer;
                AppBarTitle = AppTopSelected.AboutTitle;
                break;
            default:
                break;
        }
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
                            {AppBarTitle}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="persistent"
                    // classes={{
                    // 	paper: classNames(
                    // 		classes.drawerPaper,
                    // 		// !this.props.drawerOpend && classes.drawerPaperClose
                    // 	)
                    // }}
                    classes={{
                        paper: classes.drawerPaper
                    }}
                    open={this.props.drawerOpend}
                    anchor="left"
                >
                    <div className={classes.toolbar}>
                        <IconButton onClick={this.props.onCloseDrawer}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List component="nav">
                        <ListItem
                            button={true}
                            onClick={this.handleListButton(this.props.onSelectCreateForm)}
                            selected={this.props.selected === AppTopSelected.CreateForm}
                        >
                            <ListItemText primary={AppTopSelected.CreateFormTitle} />
                        </ListItem>
                        <ListItem
                            button={true}
                            onClick={this.handleListButton(this.props.onSelectManageData)}
                            selected={this.props.selected === AppTopSelected.ManageData}
                        >
                            <ListItemText primary={AppTopSelected.ManageDataTitle} />
                        </ListItem>
                        <ListItem
                            button={true}
                            onClick={this.handleListButton(this.props.onSelectConfig)}
                            selected={this.props.selected === AppTopSelected.Config}
                        >
                            <ListItemText primary={AppTopSelected.ConfigTitle} />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem
                            button={true}
                            onClick={this.handleListButton(this.props.onSelectAbout)}
                            selected={this.props.selected === AppTopSelected.About}
                        >
                            <ListItemText primary={AppTopSelected.AboutTitle} />
                        </ListItem>
                    </List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar} />

                    <Content />
                </main>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(AppTopComponent);
