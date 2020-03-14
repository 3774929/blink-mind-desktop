import { MenuDivider, MenuItem } from '@blueprintjs/core';
import * as React from 'react';
import { ViewModeOutliner } from '../utils';
import { getI18nText, I18nKey, Icon } from '@blink-mind/renderer-react';
import { OlOpType } from '../op';

export function ContextMenuPlugin() {
  return {
    customizeTopicContextMenu(props, next) {
      const { controller, model } = props;
      if (model.config.viewMode !== ViewModeOutliner) return next();

      function onClickIndent(e) {
        controller.run('operation', {
          ...props,
          opType: OlOpType.INDENT
        });
      }
      function onClickOutdent(e) {
        controller.run('operation', {
          ...props,
          opType: OlOpType.OUTDENT
        });
      }
      return (
        <>
          <MenuItem
            key="indent"
            icon={Icon('indent')}
            text={getI18nText(props, I18nKey.INDENT)}
            labelElement={<kbd>Tab</kbd>}
            onClick={onClickIndent}
          />
          <MenuItem
            key="outdent"
            icon={Icon('outdent')}
            text={getI18nText(props, I18nKey.OUTDENT)}
            labelElement={<kbd>Shift + Tab</kbd>}
            onClick={onClickOutdent}
          />
          {next()}
        </>
      );
    }
  };
}
