<script lang="ts" setup>
import {SqlField} from "../../src";
import ConditionSelect from "../../src/components/Sql/ConditionSelect.vue";
import dayjs from 'dayjs'
// === 定义字段配置 ===
const LOG_FIELDS: SqlField[] = [
  {
    name: 'id',
    label: 'userIduserIduserIduserId',
    type: 'string'
  },
  {
    name: 'count',
    label: '数量',
    type: 'number'
  },
  {
    name: 'datetime',
    label: '创建时间',
    type: 'datetime',
    formatter: (value: string) => {
      return dayjs(value).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  {
    name: 'valid',
    label: '是否有效',
    type: 'boolean'
  }
]
</script>

<template>
  <ConditionSelect :fields="LOG_FIELDS"/>
</template>
