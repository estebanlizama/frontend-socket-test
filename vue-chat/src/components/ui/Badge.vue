<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '../../lib/utils';

interface Props {
  variant?: 'success' | 'warning' | 'error' | 'neutral';
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'neutral'
});

const variants = {
  success: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  warning: 'bg-amber-100 text-amber-700 border-amber-200',
  error: 'bg-red-100 text-red-700 border-red-200',
  neutral: 'bg-slate-100 text-slate-700 border-slate-200',
};

const dotClasses = computed(() => cn(
  "mr-1.5 h-1.5 w-1.5 rounded-full",
  props.variant === 'success' && "bg-emerald-600 animate-pulse",
  props.variant === 'warning' && "bg-amber-600",
  props.variant === 'error' && "bg-red-600",
  props.variant === 'neutral' && "bg-slate-600"
));
</script>

<template>
  <div :class="cn('inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors', variants[variant])">
    <span :class="dotClasses" />
    <slot />
  </div>
</template>
