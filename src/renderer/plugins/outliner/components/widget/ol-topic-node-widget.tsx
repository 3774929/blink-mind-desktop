import React from 'react';
import styled from 'styled-components';
import { OLTopicCollapseIcon } from './ol-topic-collapse-icon';
import { BaseProps } from '@blink-mind/renderer-react';
import { ContextMenuTarget } from '@blueprintjs/core';

const TopicNodeWidgetRoot = styled.div`
  display: flex;
  align-content: flex-start;
`;

const OLNodeRows = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const OLNodeRow = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
`;

interface State {
  hover: boolean;
}

@ContextMenuTarget
export class OLTopicNodeWidget extends React.Component<BaseProps, State> {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };
  }

  public renderContextMenu() {
    return null;
  }

  onMouseEnter = () => {
    this.setState({ hover: true });
  };

  onMouseLeave = () => {
    this.setState({ hover: false });
  };

  render() {
    const props = this.props;
    const { controller } = props;
    const rootProps = {
      onMouseEnter: this.onMouseEnter,
      onMouseLeave: this.onMouseLeave
    };
    const collpaseProps = {
      ...props,
      hover: this.state.hover
    };
    return (
      <TopicNodeWidgetRoot {...rootProps}>
        <OLTopicCollapseIcon {...collpaseProps} />
        <OLNodeRows>
          {controller.run('renderTopicNodeRows', props)}
          {/*<OLNodeRow>*/}
          {/*  {controller.run('renderTopicBlocks', props)}*/}
          {/*  {controller.run('renderTopicNodeLastRowOthers', props)}*/}
          {/*</OLNodeRow>*/}
        </OLNodeRows>
      </TopicNodeWidgetRoot>
    );
  }
}
