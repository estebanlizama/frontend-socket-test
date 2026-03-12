<script setup lang="ts">
import { cn } from '../../lib/utils';

interface Props {
  glass?: boolean;
}

withDefaults(defineProps<Props>(), {
  glass: false
});
</script>

<template>
  <div :class="cn(
    'rounded-xl border border-slate-200 bg-white p-4 shadow-sm',
    glass && 'bg-white/70 backdrop-blur-md border-white/20'
  )">
    <slot />
  </div>
</template>
