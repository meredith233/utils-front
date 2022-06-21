<!--
 * @Description: 文件说明
 * @FilePath: \vue-base\src\views\home\index.vue
-->
<template>
  <div class="home">
    <van-notice-bar text="要记得抢九价" />
    <van-list>
      <van-cell title="这么多天了" :value="days" />
      <van-cell title="今天是" :value="`${currentDate}`" />
      <van-cell title="今年进度" :value="yearRate" />
      <van-cell title="距离下一次抢九价" value="知苗易约：海棠晓月">
        <template #label>
          <van-count-down :time="countdown" format="DD天HH时mm分ss秒" />
        </template>
      </van-cell>
      <van-cell
        title="点击使用confirm装饰器"
        value="还有更多装饰器哦"
        @click="$_handleUseDecorator"
      />
      <van-cell title="加载数据" @click="$_loadData" />

      <van-cell title="你看，右下角有一个vConsole,用来调试的" />
      <van-cell title="你再看，地址栏有一个?VNK=xxx,这是路由缓存" />
      <van-cell title="点击跳转about页面" @click="goJump" />
    </van-list>
  </div>
</template>

<script>
// 使用vant 组件
import { Cell, List, NoticeBar, Notify, CountDown } from 'vant'

// 使用装饰器
import { confirm } from '@/decorator'

// 使用日期工具类
import { DATE_FMT, format } from '@/utils/date'

// 接口
import { getDemoData } from '@/api/home'

export default {
  name: 'Home',
  components: {
    [List.name]: List,
    [Cell.name]: Cell,
    [NoticeBar.name]: NoticeBar,
    [CountDown.name]: CountDown
  },
  data() {
    return {
      currentDate: format(new Date(), DATE_FMT)
    }
  },
  computed: {
    days: function () {
      return this.getBetweenDays(Date.parse('2018-03-29'), new Date().getTime())
    },
    yearRate: function () {
      const a = this.getBetweenDays(
        new Date(new Date().getFullYear(), 0, 0).getTime(),
        new Date().getTime()
      )
      const b = this.getYearDays()
      return ((a / b) * 100).toFixed(2) + '%'
    },
    countdown: function () {
      return new Date(2022, 5, 24, 9, 35, 0).getTime() - new Date().getTime()
    }
  },

  methods: {
    @confirm('这是通过装饰器添加的确认信息', '提示')
    $_handleUseDecorator() {
      console.log(`
                你还可以使用
                @alert 提示框
                @throttle 函数节流
                @debounce 函数防抖
                更多装饰器正在完善中
              `)
    },
    // 加载数据
    async $_loadData() {
      const loading = this.$loading()
      try {
        console.log(await getDemoData())
        Notify({
          message: '数据加载成功',
          type: 'success'
        })
      } catch (error) {
        console.error(error)
      } finally {
        loading.close()
      }
    },
    goJump() {
      this.$router.push({ name: 'TestAbout' })
    },
    getBetweenDays(sDate, eDate) {
      if (sDate > eDate) {
        return 0
      }
      if (sDate === eDate) {
        return 1
      }
      return Math.round((eDate - sDate) / (24 * 60 * 60 * 1000))
    },
    getYearDays() {
      const pro = new Date().getFullYear()
      if (pro >= 1000 && pro < 10000) {
        if ((pro % 4 === 0 && pro % 100 !== 0) || pro % 400 === 0) {
          return 366
        } else {
          return 365
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.home {
  /** 审查元素，这个样式会转换为 font-size: 4.267vw; */
  font-size: 16px;
}
</style>
