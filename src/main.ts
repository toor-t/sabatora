'use strict';
import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import * as url from 'url';

import { updateAutoCompleteOptions } from './db_main';

let win: BrowserWindow | null;

// const _updateAutoCompleteOptions_request = updateAutoCompleteOptions_request;

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

    win = new BrowserWindow({ width: 800, height: 600 });

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
};

// TODO:
ipcMain.on('updateAutoCompleteOptions-request', (event: any, arg: any) => {
    // TODO:
    console.log(`updateAutoCompleteOptions-request=${arg}`);
    updateAutoCompleteOptions(arg[0], arg[1]).then(
        result => {
            if (win) {
                win.webContents.send('updateAutoCompleteOptions-result', result);
            }
        },
        reject => {
            // TODO:
            if (win) {
                win.webContents.send('updateAutoCompleteOptions-reject', reject);
            }
        }
    );
    event.sender.send('updateAutoCompleteOptions-reply', 'Request received.');
});

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
