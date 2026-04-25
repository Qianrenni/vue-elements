<script lang="ts" setup>
import { QIcon } from 'qyani-components';
import DemoBlock from '@/DemoBlock.vue';

defineOptions({
  name: 'DisplayIcon',
});
const icons = [
  'Aim',
  'Bell',
  'Book',
  'Calender',
  'Card',
  'Catalog',
  'ChatDotRound',
  'ChatLineSquare',
  'CircleMinus',
  'CirclePlus',
  'Clock',
  'Close',
  'Copy',
  'Down',
  'Download',
  'Edit',
  'Emotion',
  'EyeClose',
  'EyeOpen',
  'Female',
  'Find',
  'ForbiddenBell',
  'FullScreen',
  'Heart',
  'History',
  'House',
  'Larger',
  'Left',
  'Link',
  'Loading',
  'Location',
  'Lock',
  'Male',
  'Menu',
  'Message',
  'Minus',
  'Moon',
  'More',
  'Picture',
  'Plus',
  'Position',
  'RectangularClose',
  'Refresh',
  'Right',
  'Save',
  'Scissor',
  'Search',
  'Select',
  'Service',
  'Setting',
  'Share',
  'Smaller',
  'Star',
  'Sun',
  'Switch',
  'Tag',
  'Trash',
  'Unlock',
  'Up',
  'Upload',
  'User',
  'VideoPause',
  'VideoPlay',
  'Warning',
  'Wifi',
];
const code = `
\`\`\`html
<QIcon icon="IconName"/>
\`\`\`
`;
const copy = (value: string) => {
  navigator.clipboard.writeText(value);
};
</script>

<template>
  <DemoBlock :code="code">
    <div class="container">
      <div
        v-for="value in icons"
        :key="value"
        class="container-column"
        @click="copy(value)"
      >
        <QIcon :icon="value" />
        <span>{{ value }}</span>
      </div>
    </div>
  </DemoBlock>
</template>

<style scoped></style>
