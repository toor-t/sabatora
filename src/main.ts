//
// main
//
'use strict';
import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import * as url from 'url';
import { updateAutoCompleteOptions_request, makeDummyDB } from './db_main';
const ElectronStore = require('electron-store');

export let win: BrowserWindow | null;
const _updateAutoCompleteOptions_request = updateAutoCompleteOptions_request;

// TODO: 設定
const config = new ElectronStore({
    defaults: {
        bounds: {
            width: 800,
            height: 600
        }
    }
});

const installExtensions = async () => {
    const installer = require('electron-devtools-installer');
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

    return Promise.all(
        extensions.map(name => installer.default(installer[name], forceDownload))
    ).catch(console.log);
};

const createWindow = async () => {
    if (process.env.NODE_ENV !== 'production') {
        await installExtensions();
    }

    const { width, height, x, y } = config.get('bounds');
    win = new BrowserWindow({
        width,
        height,
        x,
        y,
        minWidth: 800,
        minHeight: 400
    });

    if (process.env.NODE_ENV !== 'production') {
        win.loadURL(`http://localhost:2003`);
    } else {
        win.loadURL(
            url.format({
                pathname: path.join(__dirname, 'index.html'),
                protocol: 'file:',
                slashes: true
            })
        );
    }

    if (process.env.NODE_ENV !== 'production') {
        // Open DevTools
        win.webContents.openDevTools();
    }

    win.on('closed', () => {
        win = null;
    });

    win.on('resize', (ev: any) => {
        if (win) {
            config.set('bounds', win.getBounds());
        }
    });
    win.on('move', (ev: any) => {
        if (win) {
            config.set('bounds', win.getBounds());
        }
    });
};

// ダミーDB作成
// makeDummyDB();

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});
