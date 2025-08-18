<template>
  <DemoBlock :code="code">
    <div class="container-column padding-rem bg-card radius-half-rem shadow-black">
      <div class="container-column gap">
        <!-- 基本用法 -->
        <div class="container-column gap-half">
          <h3>基本用法</h3>
          <Pagination
              :current-page="currentPage"
              :total-pages="totalPages"
              @change="handlePageChange"
          />
          <div class="text-description">
            当前页: {{ currentPage }} / {{ totalPages }}
          </div>
        </div>

        <!-- 自定义最大可见页数 -->
        <div class="container-column gap-half margin-vetical">
          <h3>自定义最大可见页数</h3>
          <Pagination
              :current-page="currentPage2"
              :max-visible-pages="3"
              :total-pages="totalPages"
              @change="handlePageChange2"
          />
          <div class="text-description">
            当前页: {{ currentPage2 }} / {{ totalPages }}
          </div>
        </div>

        <!-- 控制面板 -->
        <div class="container-column gap-half bg-gray-100 padding-rem radius-third-rem margin-vetical">
          <h3>测试控制</h3>
          <div class="container container-align-center gap">
            <div class="button-primary padding-24rem radius-third-rem mouse-cursor" @click="decreaseTotalPages">
              减少总页数
            </div>
            <div class="button-primary padding-24rem radius-third-rem mouse-cursor" @click="increaseTotalPages">
              增加总页数
            </div>
            <div class="text-description">
              总页数: {{ totalPages }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </DemoBlock>
</template>
<script lang="ts" setup>
import Pagination from '@/components/basic/Pagination.vue';
import DemoBlock from "@/components/display/DemoBlock.vue";
import {ref} from "vue";

const currentPage = ref(1);
const currentPage2 = ref(1);
const totalPages = ref(10);

const handlePageChange = (page: number) => {
  currentPage.value = page;
};

const handlePageChange2 = (page: number) => {
  currentPage2.value = page;
};

const increaseTotalPages = () => {
  totalPages.value += 5;
};

const decreaseTotalPages = () => {
  if (totalPages.value > 5) {
    totalPages.value -= 5;
  } else {
    totalPages.value = 1;
  }

  // 确保当前页不超过总页数
  if (currentPage.value > totalPages.value) {
    currentPage.value = totalPages.value;
  }
  if (currentPage2.value > totalPages.value) {
    currentPage2.value = totalPages.value;
  }
};

</script>
