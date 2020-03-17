import { Controller } from '@blink-mind/core';
import { JsonSerializerPlugin } from '@blink-mind/plugin-json-serializer';
import TopologyDiagramPlugin from '@blink-mind/plugin-topology-diagram';
import {
  SearchPlugin,
  TagsPlugin,
  ThemeSelectorPlugin,
  TopicReferencePlugin,
  UndoRedoPlugin
} from '@blink-mind/plugins';
import { DefaultPlugin } from '@blink-mind/renderer-react';
import {
  AnaPlugin,
  I18nPlugin,
  FontPlugin,
  OutlinerPlugin,
  ToolbarPlugin,
  ExportTopicPlugin,
  InsertImagesPlugin,
  AuthPlugin,
  DebugPlugin,
  RoosterDescEditorPlugin
} from './plugins';

const isDev = require('electron-is-dev');

const plugins = [
  AnaPlugin(),
  isDev && DebugPlugin(),
  // AuthPlugin(),
  OutlinerPlugin(),
  RoosterDescEditorPlugin(),
  ToolbarPlugin(),
  I18nPlugin(),
  FontPlugin(),
  ThemeSelectorPlugin(),
  TopicReferencePlugin(),
  SearchPlugin(),
  UndoRedoPlugin(),
  TagsPlugin(),
  InsertImagesPlugin(),
  // TopologyDiagramPlugin(),
  ExportTopicPlugin(),
  JsonSerializerPlugin(),
  DefaultPlugin()
];

export function createBlinkMindController(onChange?): Controller {
  return new Controller({ plugins, onChange });
}

export const BlinkMindController: Controller = createBlinkMindController();
