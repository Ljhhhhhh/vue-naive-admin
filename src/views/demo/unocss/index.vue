<template>
  <CommonPage :show-footer="true">
    <p>
      文档：<a hover-decoration-underline c-blue href="https://uno.antfu.me/" target="_blank">https://uno.antfu.me/</a>
    </p>
    <p>
      playground：
      <a c-blue hover-decoration-underline href="https://unocss.antfu.me/play/" target="_blank">
        https://unocss.antfu.me/play/
      </a>
    </p>

    <div f-c-c flex-col mt-20 w-350>
      <div flex flex-wrap justify-around p-10 rounded-10 b-1 bc-ccc>
        <div w-50 h-50 b-1 rounded-5 f-c-c p-10 m-20>
          <span w-6 h-6 rounded-3 bg-black dark:bg-white />
        </div>
        <div w-50 h-50 b-1 rounded-5 flex justify-between p-10 m-20>
          <span w-6 h-6 rounded-3 bg-black dark:bg-white />
          <span w-6 h-6 rounded-3 bg-black dark:bg-white self-end />
        </div>
        <div w-50 h-50 b-1 rounded-5 flex justify-between p-10 m-20>
          <span w-6 h-6 rounded-3 bg-black dark:bg-white />
          <span w-6 h-6 rounded-3 bg-black dark:bg-white self-center />
          <span w-6 h-6 rounded-3 bg-black dark:bg-white self-end />
        </div>
        <div w-50 h-50 b-1 rounded-5 flex justify-between p-10 m-20>
          <div flex-col justify-between>
            <span w-6 h-6 rounded-3 bg-black dark:bg-white />
            <span w-6 h-6 rounded-3 bg-black dark:bg-white />
          </div>
          <div flex-col justify-between>
            <span w-6 h-6 rounded-3 bg-black dark:bg-white />
            <span w-6 h-6 rounded-3 bg-black dark:bg-white />
          </div>
        </div>
        <div w-50 h-50 b-1 rounded-5 flex-col justify-between items-center p-10 m-20>
          <div flex w-full justify-between>
            <span w-6 h-6 rounded-3 bg-black dark:bg-white />
            <span w-6 h-6 rounded-3 bg-black dark:bg-white />
          </div>
          <div w-6 h-6 rounded-3 bg-black dark:bg-white />
          <div flex w-full justify-between>
            <span w-6 h-6 rounded-3 bg-black dark:bg-white />
            <span w-6 h-6 rounded-3 bg-black dark:bg-white />
          </div>
        </div>
        <div w-50 h-50 b-1 rounded-5 flex-col justify-between p-10 m-20>
          <div flex w-full justify-between>
            <span w-6 h-6 rounded-3 bg-black dark:bg-white />
            <span w-6 h-6 rounded-3 bg-black dark:bg-white />
          </div>
          <div flex w-full justify-between>
            <span w-6 h-6 rounded-3 bg-black dark:bg-white />
            <span w-6 h-6 rounded-3 bg-black dark:bg-white />
          </div>
          <div flex w-full justify-between>
            <span w-6 h-6 rounded-3 bg-black dark:bg-white />
            <span w-6 h-6 rounded-3 bg-black dark:bg-white />
          </div>
        </div>
      </div>
      <h2 font-normal text-14 mt-10 color-gray>Flex 骰子</h2>
      <n-button @click="search">点击</n-button>
      <div>{{ data }}</div>
    </div>
  </CommonPage>
</template>
<script lang="ts" setup>
  import { useRequest } from 'vue-request';
  import { getPosts } from '@/api/table';
  const { data, run } = useRequest(getPosts, {
    defaultParams: [
      {
        title: '',
      },
    ],
  });
  // onMounted(() => {
  //   run();
  // });

  const search = () => {
    run({
      title: '使用纯',
    });
  };
</script>
