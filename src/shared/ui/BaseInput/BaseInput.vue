<script setup lang="ts" generic="T">
const props = defineProps<{
  modelValue?: T;
  validation?: {
    isInValid: boolean;
    message?: string;
  };
}>();

const attrs = useAttrs();

const vmodel = useVModel(props, 'modelValue');
</script>

<template>
  <UInput
    v-model="vmodel"
    v-bind="attrs"
    :color="validation?.isInValid ? 'red' : undefined"
  />
  <span
    v-if="validation && validation.message"
    class="text-xs text-red-600"
  >
    {{ validation.message }}
  </span>
</template>
