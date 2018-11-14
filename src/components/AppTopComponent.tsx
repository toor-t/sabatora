/**
 * AppTopComponent
 */
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
import Menu from '@material-ui/core/Menu';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';

// tslint:disable-next-line:import-name
import MenuIcon from '@material-ui/icons/Menu';
// tslint:disable-next-line:import-name
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// tslint:disable-next-line:import-name
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
// tslint:disable-next-line:import-name
import MoreVertIcon from '@material-ui/icons/MoreVert';
// tslint:disable-next-line:import-name
import SettingsIcon from '@material-ui/icons/Settings';
// tslint:disable-next-line:import-name
import DescriptionIcon from '@material-ui/icons/Description';
// tslint:disable-next-line:import-name
import DashboardIcon from '@material-ui/icons/Dashboard';
// tslint:disable-next-line:import-name
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
// tslint:disable-next-line:import-name
import SaveAltIcon from '@material-ui/icons/SaveAlt';
// tslint:disable-next-line:import-name
import PrintIcon from '@material-ui/icons/Print';
// tslint:disable-next-line:import-name
import NewIcon from '@material-ui/icons/DescriptionOutlined';
// tslint:disable-next-line:import-name
import InfoIcon from '@material-ui/icons/InfoOutlined';

import CreateFormContainer from '../containers/CreateFormContainer';
import ManageDataContainer from '../containers/ManageDataContainer';
import ConfigContainer from '../containers/ConfigContainer';
import AboutContainer from '../containers/AboutContainer';

import { Title, Str, MenuTitle } from '../strings';

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
            marginRight: 36,
            outline: 0
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
            padding: theme.spacing.unit * 3,
            // marginLeft: -drawerWidth,
            transition: theme.transitions.create(['margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            })
        },
        contentShift: {
            marginLeft: drawerWidth,
            transition: theme.transitions.create(['margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen
            })
        }
    });

export namespace AppTopSelected {
    export const CreateForm = 1;
    export const ManageData = 2;
    export const Config = 3;
    export const About = 4;

    export const CreateFormTitle = Title.CreateForm;
    export const ManageDataTitle = Title.ManageData;
    export const ConfigTitle = Title.Config;
    export const AboutTitle = Title.About;
}
export interface IAppTopComponentStateProps {
    /**
     * ドロワーメニューで選択された項目のインデックス
     */
    selected: number;
    /**
     * ドロワー開閉状態
     */
    drawerOpend: boolean;
}
export interface IAppTopComponentDispatchProps {
    /**
     * ドロワーオープン
     */
    onOpenDrawer: () => void;
    /**
     * ドロワークローズ
     */
    onCloseDrawer: () => void;
    /**
     * ドロワーメニュー項目選択
     */
    onSelectMenuItem: (selected: number) => void;
    /**
     * 帳票保存
     */
    onSaveForm: () => void;
    /**
     * 帳票読込
     */
    onOpenForm: () => void;
    /**
     * 新規帳票
     */
    onNewForm: () => void;
    /**
     * 帳票印刷
     */
    onPrintForm: () => void;

    // TODO: 他画面用メニューも必要？
}
interface IAppTopComponentStates {
    anchorEl?: HTMLElement;
}
class AppTopComponent extends React.Component<
    IAppTopComponentStateProps &
        IAppTopComponentDispatchProps &
        WithStyles<typeof styles> & { theme: Theme },
    IAppTopComponentStates
> {
    constructor(
        props: IAppTopComponentStateProps &
            IAppTopComponentDispatchProps &
            WithStyles<typeof styles> & { theme: Theme }
    ) {
        super(props);
        this.state = {
            anchorEl: undefined
        };
        // this.handleListButton.bind(this);
        // this.handleMenuOpen.bind(this);
        // this.handleMenuClose.bind(this);
        // this.handleMenuItemButton.bind(this);
    }
    handleListButton(selected: number, callback: (selected: number) => void): () => void {
        return () => {
            callback(selected);
            this.props.onCloseDrawer();
        };
    }
    handleMenuOpen = (event: any) => {
        this.setState({ anchorEl: event.currentTarget });
    };
    handleMenuClose = () => {
        this.setState({ anchorEl: undefined });
    };
    handleMenuItemButton(callback: () => void): () => void {
        return () => {
            this.handleMenuClose();
            callback();
        };
    }
    render() {
        const { classes, theme, selected } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        let Content: any = {};
        let AppBarTitle: string = '';
        let MoreVartMenuContent: JSX.Element = <div />;
        switch (selected) {
            case AppTopSelected.CreateForm:
                // 帳票作成
                Content = CreateFormContainer;
                AppBarTitle = AppTopSelected.CreateFormTitle;
                MoreVartMenuContent = (
                    <div style={{ outline: 0 }}>
                        <MenuItem onClick={this.handleMenuItemButton(this.props.onOpenForm)}>
                            <OpenInNewIcon />
                            {MenuTitle.OpenForm}
                        </MenuItem>
                        <MenuItem onClick={this.handleMenuItemButton(this.props.onSaveForm)}>
                            <SaveAltIcon />
                            {MenuTitle.SaveForm}
                        </MenuItem>
                        <MenuItem onClick={this.handleMenuItemButton(this.props.onNewForm)}>
                            <NewIcon />
                            {MenuTitle.NewForm}
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={this.handleMenuItemButton(this.props.onPrintForm)}>
                            <PrintIcon />
                            {MenuTitle.PrintForm}
                        </MenuItem>
                    </div>
                );
                break;
            case AppTopSelected.ManageData:
                // TODO: データ管理
                Content = ManageDataContainer;
                AppBarTitle = AppTopSelected.ManageDataTitle;
                MoreVartMenuContent = (
                    <div style={{ outline: 0 }}>
                        <MenuItem>ダミー</MenuItem>
                    </div>
                );
                break;
            case AppTopSelected.Config:
                // TODO: 設定
                Content = ConfigContainer;
                AppBarTitle = AppTopSelected.ConfigTitle;
                MoreVartMenuContent = (
                    <div style={{ outline: 0 }}>
                        <MenuItem>ダミー</MenuItem>
                    </div>
                );
                break;
            case AppTopSelected.About:
                // TODO: About
                Content = AboutContainer;
                AppBarTitle = AppTopSelected.AboutTitle;
                MoreVartMenuContent = (
                    <div style={{ outline: 0 }}>
                        <MenuItem>ダミー</MenuItem>
                    </div>
                );
                break;
            default:
                break;
        }
        return (
            <div className={classes.root}>
                <div id="app-top-component-app-bar">
                    <AppBar
                        position="fixed"
                        className={classNames(
                            classes.appBar,
                            this.props.drawerOpend && classes.appBarShift
                        )}
                    >
                        <Toolbar disableGutters={!this.props.drawerOpend}>
                            {/* 左上アイコン */}
                            <IconButton
                                color="inherit"
                                aria-label="Open drawer"
                                onClick={this.props.onOpenDrawer}
                                className={classNames(
                                    classes.menuButton,
                                    this.props.drawerOpend && classes.hide
                                )}
                                // tslint:disable-next-line:jsx-no-lambda
                                onFocus={(e: any) => e.currentTarget.blur()}
                            >
                                <MenuIcon />
                            </IconButton>
                            {/* タイトル */}
                            <Typography
                                variant="title"
                                color="inherit"
                                style={{ flexGrow: 1 }}
                                noWrap={true}
                            >
                                {AppBarTitle}
                            </Typography>
                            {/* 右上ボタン */}
                            <div>
                                <IconButton
                                    aria-owns={open ? 'menu-appbar' : undefined}
                                    aria-haspopup="true"
                                    onClick={this.handleMenuOpen}
                                    color="inherit"
                                    // tslint:disable-next-line:jsx-no-lambda
                                    onFocus={(e: any) => e.currentTarget.blur()}
                                >
                                    <MoreVertIcon />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right'
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right'
                                    }}
                                    open={open}
                                    onClose={this.handleMenuClose}
                                >
                                    {MoreVartMenuContent}
                                </Menu>
                            </div>
                        </Toolbar>
                    </AppBar>
                </div>
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
                        <IconButton
                            onClick={this.props.onCloseDrawer}
                            // tslint:disable-next-line:jsx-no-lambda
                            onFocus={(e: any) => e.currentTarget.blur()}
                        >
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List component="nav">
                        <ListItem
                            button={true}
                            onClick={this.handleListButton(
                                AppTopSelected.CreateForm,
                                this.props.onSelectMenuItem
                            )}
                            selected={this.props.selected === AppTopSelected.CreateForm}
                        >
                            <DescriptionIcon />
                            <ListItemText primary={AppTopSelected.CreateFormTitle} />
                        </ListItem>
                        <ListItem
                            button={true}
                            onClick={this.handleListButton(
                                AppTopSelected.ManageData,
                                this.props.onSelectMenuItem
                            )}
                            selected={this.props.selected === AppTopSelected.ManageData}
                        >
                            <DashboardIcon />
                            <ListItemText primary={AppTopSelected.ManageDataTitle} />
                        </ListItem>
                        <ListItem
                            button={true}
                            onClick={this.handleListButton(
                                AppTopSelected.Config,
                                this.props.onSelectMenuItem
                            )}
                            selected={this.props.selected === AppTopSelected.Config}
                        >
                            <SettingsIcon />
                            <ListItemText primary={AppTopSelected.ConfigTitle} />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem
                            button={true}
                            onClick={this.handleListButton(
                                AppTopSelected.About,
                                this.props.onSelectMenuItem
                            )}
                            selected={this.props.selected === AppTopSelected.About}
                        >
                            <InfoIcon />
                            <ListItemText primary={AppTopSelected.AboutTitle} />
                        </ListItem>
                    </List>
                </Drawer>
                <main
                    className={classNames(
                        classes.content
                        // this.props.drawerOpend && classes.contentShift
                    )}
                >
                    <div className={classes.toolbar} id="app-top-component-toolbar" />

                    <Content />
                </main>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(AppTopComponent);
