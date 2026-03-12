<script setup lang="ts">
import { cn } from '../../lib/utils';

interface Props {
  modelValue?: string | number;
  label?: string;
  error?: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
}

defineProps<Props>();
defineEmits(['update:modelValue']);
</script>

<template>
  <div class="w-full space-y-1.5">
    <label v-if="label" class="text-sm font-medium text-slate-700 px-0.5">
      {{ label }}
    </label>
    <input
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :class="cn(
        'flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm transition-all duration-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50',
        error && 'border-red-500 focus:ring-red-500/20 focus:border-red-500'
      )"
      :placeholder="placeholder"
      :disabled="disabled"
    />
    <p v-if="error" class="text-xs font-medium text-red-500 px-0.5">{{ error }}</p>
  </div>
</template>
