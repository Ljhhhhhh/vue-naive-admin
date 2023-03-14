<template>
  <QueryBar v-if="$slots.queryBar" mb-30 @search="handleSearch" @reset="handleReset">
    <slot name="queryBar" />
  </QueryBar>

  <n-data-table
    :remote="remote"
    :loading="loading"
    :scroll-x="scrollX"
    :columns="columns"
    :data="tableData"
    :row-key="(row) => row[rowKey]"
    :pagination="isPagination ? pagination : false"
    @update:checked-row-keys="onChecked"
    @update:page="onPageChange"
  />
</template>

<script lang="ts">
  const props = {
    /**
     * @remote true: 后端分页  false： 前端分页
     */
    remote: {
      type: Boolean,
      default: true,
    },
    /**
     * @remote 是否分页
     */
    isPagination: {
      type: Boolean,
      default: true,
    },
    scrollX: {
      type: Number,
      default: 1200,
    },
    rowKey: {
      type: String,
      default: 'id',
    },
    columns: {
      type: Array as () => any[],
      required: true,
    },
    /** queryBar中的参数 */
    queryItems: {
      type: Object,
      default() {
        return {};
      },
    },
    /** 补充参数（可选） */
    extraParams: {
      type: Object,
      default() {
        return {};
      },
    },
    /**
     * ! 约定接口入参出参
     * * 分页模式需约定分页接口入参
     *    @pageSize 分页参数：一页展示多少条，默认10
     *    @pageNo   分页参数：页码，默认1
     * * 需约定接口出参
     *    @pageData 分页模式必须,非分页模式如果没有pageData则取上一层data
     *    @total    分页模式必须，非分页模式如果没有total则取上一层data.length
     */
    getData: {
      type: Function,
      required: true,
    },
    plainData: {
      type: Boolean,
      default: false,
    },
  };

  export default defineComponent({
    name: 'CrudTable',
    props,
    emits: ['update:queryItems', 'onChecked'],
    setup(props, { emit, expose }) {
      const { remote, isPagination, columns, queryItems, extraParams, getData, plainData } = toRefs(props);
      const loading = ref(false);
      const initQuery = { ...queryItems.value };
      const tableData = ref([]);
      const pagination = reactive<{
        page: number;
        pageSize: number;
        pageCount?: number;
      }>({ page: 1, pageSize: 10 });

      async function handleQuery() {
        try {
          loading.value = true;
          let paginationParams: Record<string, any> = pagination;
          // 如果非分页模式或者使用前端分页,则无需传分页参数
          if (isPagination.value && remote.value) {
            paginationParams = { page: pagination.page, pageSize: pagination.pageSize };
          }
          if (!getData.value) return;
          const { data } = await getData.value({ ...queryItems.value, ...extraParams.value, ...paginationParams });
          if (plainData.value) {
            tableData.value = data;
          } else {
            const { pageData, total } = data;
            tableData.value = pageData;
            pagination.pageCount = total ? total : 1;
          }
        } catch (error: any) {
          window.$message?.error(error.message);
          tableData.value = [];
          pagination.pageCount = 0;
        } finally {
          loading.value = false;
        }
      }
      function handleSearch() {
        pagination.page = 1;
        handleQuery();
      }
      async function handleReset() {
        const query = { ...queryItems.value };
        for (const key in query) {
          query[key] = '';
        }
        emit('update:queryItems', { ...query, ...initQuery });
        await nextTick();
        pagination.page = 1;
        handleQuery();
      }
      function onPageChange(currentPage: number) {
        pagination.page = currentPage;
        if (remote.value) {
          handleQuery();
        }
      }
      function onChecked(rowKeys: any[]) {
        if (!columns.value) return;
        if (columns.value.some((item) => item.type === 'selection')) {
          emit('onChecked', rowKeys);
        }
      }

      expose({
        handleSearch,
        handleReset,
      });

      return {
        handleSearch,
        handleReset,
        loading,
        tableData,
        pagination,
        onChecked,
        onPageChange,
      };
    },
  });
</script>
