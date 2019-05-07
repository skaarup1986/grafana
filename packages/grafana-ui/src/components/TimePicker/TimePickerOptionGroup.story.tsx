import React, { ComponentType } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { TimePickerOptionGroup } from './TimePickerOptionGroup';
import { TimeRange } from '../../types/time';
import { withRighAlignedStory } from '../../utils/storybook/withRightAlignedStory';
import { popoverOptions } from './TimePicker.story';
import { momentWrapper } from '../../utils/moment_wrapper';

const TimePickerOptionGroupStories = storiesOf('UI/TimePicker/TimePickerOptionGroup', module);

TimePickerOptionGroupStories.addDecorator(withRighAlignedStory);

const data = {
  isPopoverOpen: false,
  onPopoverOpen: () => {
    action('onPopoverOpen fired')();
  },
  onPopoverClose: (timeRange: TimeRange) => {
    action('onPopoverClose fired')(timeRange);
  },
  popoverProps: {
    value: { from: momentWrapper(), to: momentWrapper(), raw: { from: 'now/d', to: 'now/d' } },
    options: popoverOptions,
    isTimezoneUtc: false,
    onChange: (timeRange: TimeRange) => {
      action('onChange fired')(timeRange);
    },
  },
};

TimePickerOptionGroupStories.add('default', () => (
  <TimePickerOptionGroup
    clearValue={() => {}}
    className={''}
    cx={() => {}}
    getStyles={(name, props) => ({})}
    getValue={() => {}}
    hasValue
    isMulti={false}
    options={[]}
    selectOption={() => {}}
    selectProps={''}
    setValue={(value, action) => {}}
    label={'Custom'}
    children={null}
    Heading={(null as any) as ComponentType<any>}
    data={data}
  />
));
