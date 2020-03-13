import React from 'react';
import styled from 'styled-components';
import { OLTopicNodeWidget } from './ol-topic-node-widget';
import { BaseProps } from '@blink-mind/renderer-react';

const OLTopicWidgetRoot = styled.div`
  
`;
const SubTopics = styled.div`
  position: relative;
  margin-left: 30px;
  border-left: 1px solid #ddd;
`;

export function OLTopicWidget(props: BaseProps) {
  const { controller, model, topicKey } = props;

  const topic = model.getTopic(topicKey);

  const renderSubTopics = props => {
    if (topic.collapse || topic.subKeys.size === 0) return null;
    return (
      <SubTopics>

        {topic.subKeys.map(subKey => {
          return controller.run('renderOLTopicWidget', {
            ...props,
            key: subKey,
            topicKey: subKey
          });
        })}
      </SubTopics>
    );
  };

  const propsMore = {
    ...props,
    topic
  };

  const topicNode = <OLTopicNodeWidget {...propsMore} />;

  return (
    <OLTopicWidgetRoot key={topicKey}>
      {topicNode}
      {renderSubTopics(propsMore)}
    </OLTopicWidgetRoot>
  );
}
