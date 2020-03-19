import { ipcRenderer, remote } from 'electron';
import { I18nTextKey, IpcChannelName } from '../../common';

export function getFileContent({ path }) {
  return ipcRenderer.sendSync(IpcChannelName.RM_GET_FILE_CONTENT, {
    path
  });
}

export function getFontList() {
  return ipcRenderer.sendSync(IpcChannelName.RM_GET_FONT_LIST)
}

export function getStoreItem(key) {
  return ipcRenderer.sendSync(IpcChannelName.RM_GET_STORE_ITEM, { key });
}

export function setStoreItem(key, value) {
  return ipcRenderer.sendSync(IpcChannelName.RM_SET_STORE_ITEM, { key, value });
}

export function newFile(arg) {
  ipcRenderer.send(IpcChannelName.RM_NEW_FILE, arg);
}

export function openFile() {
  ipcRenderer.send(IpcChannelName.RM_OPEN_FILE);
}

export function saveFile({ id, path, content }) {
  ipcRenderer.send(IpcChannelName.RM_SAVE, { id, path, content });
}

export function saveFileWithFileModel(fileModel, t) {
  const dialog = remote.dialog;
  const res = dialog.showMessageBoxSync(remote.getCurrentWindow(), {
    type: 'question',
    title: t(I18nTextKey.SAVE_TIP_TITLE),
    message: t(I18nTextKey.SAVE_TIP_CONTENT),
    buttons: [
      t(I18nTextKey.SAVE),
      t(I18nTextKey.CANCEL),
      t(I18nTextKey.DONT_SAVE)
    ]
  });

  switch (res) {
    case 0:
      const path = fileModel.path;
      const id = fileModel.id;
      const content = fileModel.getContent();
      return ipcRenderer.sendSync(IpcChannelName.RM_SAVE_SYNC, {
        id,
        path,
        content
      });
    case 1:
      return 'cancel';
    case 2:
      return 'dontSave';
    default:
      break;
  }
}

export const isDev = ipcRenderer.sendSync(IpcChannelName.RM_GET_IS_DEV);
