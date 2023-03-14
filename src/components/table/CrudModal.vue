<template>
  <n-modal v-model:show="show" :style="{ width }" preset="card" :title="title" size="huge" :bordered="false">
    <slot />
    <template v-if="showFooter" #footer>
      <footer flex justify-end>
        <slot name="footer">
          <n-button @click="show = false">取消</n-button>
          <n-button :loading="loading" ml-20 type="primary" @click="emit('onSave')">保存</n-button>
        </slot>
      </footer>
    </template>
  </n-modal>
</template>

<script lang="ts">
  const props = {
    width: { String, default: '600px' },
    title: { String, default: '' },
    showFooter: { Boolean, default: true },
    visible: { Boolean, default: false },
    loading: { Boolean, default: false },
  };

  export default defineComponent({
    name: 'CrudModal',
    props,
    emits: ['update:visible', 'onSave'],
    setup(props, { emit }) {
      const show = computed({
        get() {
          return props.visible;
        },
        set(v) {
          emit('update:visible', v);
        },
      });

      return {
        show,
        emit,
      };
    },
  });
</script>
