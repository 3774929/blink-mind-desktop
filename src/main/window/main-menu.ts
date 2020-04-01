import { Menu, shell, BrowserWindow } from 'electron';
import {
  I18nTextKey,
  IpcChannelName,
  IpcType,
  PasteType,
  ProductName
} from '../../common';
import { isMacOS, isWindows, IsDev } from '../utils';
import { openFile, redo, save, saveAs, undo } from './menu-event-handler';
import { subscribeMgr } from '../subscribe';

const log = require('debug')('bmd:menu');

function getMenu(i18n, windowMgr) {
  const t = key => i18n.t(key);
  const preferencesMenu = {
    label: t(I18nTextKey.PREFERENCES),
    role: 'preferences',
    click() {
      windowMgr.showPreferencesWindow();
    }
  };
  const productName = {
    label: ProductName,
    submenu: [
      preferencesMenu,
      {
        label: `About ${ProductName}`,
        selector: 'orderFrontStandardAboutPanel:'
      }
    ]
  };

  const file = {
    label: t(I18nTextKey.FILE),
    submenu: [
      {
        label: t(I18nTextKey.NEW_FILE),
        click() {
          windowMgr.showWelcomeWindow();
        }
      },
      {
        label: t(I18nTextKey.OPEN_FILE),
        click() {
          openFile(windowMgr);
        }
      },
      {
        id: I18nTextKey.SAVE,
        label: t(I18nTextKey.SAVE),
        accelerator: 'CmdOrCtrl+S',
        click() {
          console.log('save');
          save(windowMgr);
        }
      },
      {
        id: I18nTextKey.SAVE_AS,
        label: t(I18nTextKey.SAVE_AS),
        accelerator: 'CmdOrCtrl+Shift+S',
        click() {
          saveAs(windowMgr);
        }
      }
    ]
  };

  const edit = {
    label: t(I18nTextKey.EDIT),
    submenu: [
      {
        label: t(I18nTextKey.UNDO),
        accelerator: 'CmdOrCtrl+Z',
        click() {
          undo();
        }
      },
      {
        label: t(I18nTextKey.REDO),
        accelerator: 'CmdOrCtrl+Shift+Z',
        click() {
          redo();
        }
      },
      { type: 'separator' },
      {
        label: t(I18nTextKey.SELECT_ALL),
        role: 'selectAll'
      },
      {
        label: t(I18nTextKey.COPY),
        role: 'copy'
      },
      {
        label: t(I18nTextKey.CUT),
        role: 'cut'
      },
      {
        label: t(I18nTextKey.PASTE),
        // role: 'paste as plaintext',
        accelerator: 'CmdOrCtrl+V',
        role: 'paste',
        // click(menuItem, browserWindow: BrowserWindow) {
        //   console.log('PASTE_AS_PLAIN_TEXT');
        //   browserWindow.webContents.send(IpcChannelName.MR_FILE_WINDOW, {
        //     type: IpcType.MR_PASTE,
        //     pasteType: PasteType.PASTE_PLAIN_TEXT
        //   });
        // }
      },
      {
        label: t(I18nTextKey.PASTE_AS_PLAIN_TEXT),
        // role: 'paste as plaintext',
        accelerator: 'CmdOrCtrl+Shift+V',
        role: 'pasteAndMatchStyle',
        // click(menuItem, browserWindow: BrowserWindow) {
        //   console.log('PASTE_WITH_STYLE');
        //   browserWindow.webContents.send(IpcChannelName.MR_FILE_WINDOW, {
        //     type: IpcType.MR_PASTE,
        //     pasteType: PasteType.PASTE_WITH_STYLE
        //   });
        // }
      }
    ]
  };
  //@ts-ignore
  isWindows && edit.submenu.push(preferencesMenu);

  const view = {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forcereload' },

      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  };
  const envDevTools = parseInt(process.env.DEV_TOOLS, 10) === 1;
  if (IsDev) {
    view.submenu.push({ role: 'toggledevtools' });
  }

  const account = {
    label: 'account',
    submenu: []
  };
  const { user } = subscribeMgr;
  user
    ? account.submenu.push(
        {
          labal: user.email,
          click() {}
        },
        {
          labal: 'Sign Out',
          click() {}
        }
      )
    : account.submenu.push({
        label: 'Sign In',
        click() {
          windowMgr.showSignInWindow();
        }
      });

  const help = {
    label: 'Help',
    role: 'help',
    submenu: [
      {
        label: 'Website',
        click() {
          shell.openExternal('https://github.com/awehook/blink-mind-package');
        }
      },
      {
        label: 'Watch BlinkMindDesktop for update info',
        click() {
          shell.openExternal('https://github.com/awehook/blink-mind-package');
        }
      },
      {
        label: 'Follow @awehook on Github',
        click() {
          shell.openExternal('https://github.com/awehook');
        }
      }
    ]
  };

  const menu = isMacOS
    ? [
        productName,
        file,
        edit,
        view,
        //account,
        help
      ]
    : [
        file,
        edit,
        view,
        // account,
        help
      ];
  // console.log(JSON.stringify(menu,null,2));
  return menu;
}

export function buildMenu(i18n, windowMgr) {
  //@ts-ignore
  const menu = Menu.buildFromTemplate(getMenu(i18n, windowMgr));
  Menu.setApplicationMenu(menu);
  if (isWindows) {
    windowMgr.welcomeWindow && windowMgr.welcomeWindow.setMenu(null);
    windowMgr.preferenceWindow && windowMgr.preferenceWindow.setMenu(null);
  }
}
