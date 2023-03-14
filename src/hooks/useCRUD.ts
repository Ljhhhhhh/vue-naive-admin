import { AxiosResponse } from 'axios';
import { DialogOptions, FormInst } from 'naive-ui';

interface FormInfo {
  name: string;
  initForm: Record<string, any>;
  doCreate: (data: Record<string, any>) => void;
  doDelete: (id: number) => Promise<AxiosResponse<any, any>>;
  doUpdate: (id: number, data: Record<string, any>) => void;
  refresh: (query?: Record<string, any>) => void;
}

const ACTIONS: {
  view: string;
  edit: string;
  add: string;
} = {
  view: '查看',
  edit: '编辑',
  add: '新增',
};

export default function ({ name, initForm = {}, doCreate, doDelete, doUpdate, refresh }: FormInfo) {
  const modalVisible = ref<boolean>(false);
  const modalAction = ref<'view' | 'edit' | 'add'>('view');
  const modalTitle = computed(() => ACTIONS[modalAction.value] + name);
  const modalLoading = ref(false);
  const modalFormRef = ref<FormInst>();
  const modalForm = ref({ ...initForm });

  /** 新增 */
  function handleAdd() {
    modalAction.value = 'add';
    modalVisible.value = true;
    modalForm.value = { ...initForm };
  }

  /** 修改 */
  function handleEdit(row: Record<string, any>) {
    console.log(row, 'row');
    modalAction.value = 'edit';
    modalVisible.value = true;
    modalForm.value = { ...row };
  }

  /** 查看 */
  function handleView(row: Record<string, any>) {
    modalAction.value = 'view';
    modalVisible.value = true;
    modalForm.value = { ...row };
  }

  /** 保存 */
  function handleSave() {
    if (!['edit', 'add'].includes(modalAction.value)) {
      modalVisible.value = false;
      return;
    }
    modalFormRef.value?.validate(async (err) => {
      if (err) return;
      const actions: {
        add: any;
        edit: any;
        view: any;
      } = {
        add: {
          api: () => doCreate(modalForm.value),
          cb: () => window.$message?.success('新增成功'),
        },
        edit: {
          api: () => doUpdate(modalForm.value.id, modalForm.value),
          cb: () => window.$message?.success('编辑成功'),
        },
        view: {},
      };
      const action = actions[modalAction.value];

      try {
        modalLoading.value = true;
        const data = await action.api();
        action.cb();
        modalLoading.value = modalVisible.value = false;
        data && refresh(data);
      } catch (error) {
        modalLoading.value = false;
      }
    });
  }

  /** 删除 */
  function handleDelete(id: number, confirmOptions: DialogOptions = {}) {
    if (!id) return;
    window.$dialog?.warning({
      content: '确定删除？',
      title: '提示',
      positiveText: '确定',
      negativeText: '取消',
      async onPositiveClick() {
        try {
          modalLoading.value = true;
          const data = await doDelete(id);
          if (data) {
            window.$message?.success('删除成功');
            modalLoading.value = false;
            refresh();
          }
        } catch (error) {
          modalLoading.value = false;
        }
      },
      ...confirmOptions,
    });
  }

  return {
    modalVisible,
    modalAction,
    modalTitle,
    modalLoading,
    handleAdd,
    handleDelete,
    handleEdit,
    handleView,
    handleSave,
    modalForm,
    modalFormRef,
  };
}
