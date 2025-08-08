<template>
  <div class="container-column padding-rem bg-card radius-half-rem shadow-black">
    <h2 class="text-title margin-half-vetical">分页器组件示例</h2>

    <div class="container-column gap">
      <!-- 基本用法 -->
      <div class="container-column gap-half">
        <h3>基本用法</h3>
        <Pagination
            :current-page="currentPage"
            :total-pages="totalPages"
            @page-change="handlePageChange"
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
            @page-change="handlePageChange2"
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
</template>

<script>
import Pagination from '@/components/basic/Pagination.vue';

export default {
  name: 'PaginationExample',
  components: {
    Pagination
  },
  data() {
    return {
      currentPage: 1,
      currentPage2: 1,
      totalPages: 10
    };
  },
  methods: {
    handlePageChange(page) {
      this.currentPage = page;
    },
    handlePageChange2(page) {
      this.currentPage2 = page;
    },
    increaseTotalPages() {
      this.totalPages += 5;
    },
    decreaseTotalPages() {
      if (this.totalPages > 5) {
        this.totalPages -= 5;
      } else {
        this.totalPages = 1;
      }

      // 确保当前页不超过总页数
      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages;
      }
      if (this.currentPage2 > this.totalPages) {
        this.currentPage2 = this.totalPages;
      }
    }
  }
};
</script>
