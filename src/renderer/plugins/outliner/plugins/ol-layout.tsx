import { IControllerRunContext } from '@blink-mind/core';
import { olTopicWidgetRootRefKey, ViewModeOutliner } from '../utils';

export function OlLayoutPlugin() {
  return {
    moveTopicToCenter(ctx: IControllerRunContext, next) {
      const { topicKey, getRef, controller } = ctx;
      const model = controller.model;
      if (model.config.viewMode === ViewModeOutliner) {
        const focusTopicDiv: HTMLElement = getRef(
          olTopicWidgetRootRefKey(topicKey)
        );
        focusTopicDiv && focusTopicDiv.scrollIntoView();
        return;
      }
      next();
    }
  };
}
