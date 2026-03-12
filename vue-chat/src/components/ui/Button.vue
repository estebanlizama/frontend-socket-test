<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '../../lib/utils';

interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button'
});

const variants = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm active:scale-95',
  secondary: 'bg-slate-200 text-slate-900 hover:bg-slate-300 active:scale-95',
  outline: 'border border-slate-300 bg-transparent hover:bg-slate-50 active:scale-95',
  ghost: 'bg-transparent hover:bg-slate-100 text-slate-700 active:scale-95',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2',
  lg: 'px-6 py-3 text-lg',
};

const classes = computed(() => cn(
  'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  variants[props.variant],
  sizes[props.size]
));
</script>

<template>
  <button :type="type" :class="classes" :disabled="isLoading || disabled">
    <div v-if="isLoading" class="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
    <slot />
  </button>
</template>
