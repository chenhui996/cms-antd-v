// .storybook/decorators/antdTheme.ts
import type { StoryFn, VueRenderer } from '@storybook/vue3';
import { defineComponent, h, ref } from 'vue';
import VxeUIAll,{VxeUI} from "vxe-pc-ui"
import VxeUITable from "vxe-table";
import { ConfigProvider as AConfigProvider } from 'ant-design-vue';
import { themes } from '../../src/theme/antdTheme';

// import "../../src/components/CTable/plugins/pro/vxe-table-extend-cell-area.es6.min";
// import "../../src/components/CTable/plugins/pro/vxe-table-extend-cell-area.min.css";
import 'vxe-table/lib/style.css'

VxeUI.setConfig({
  authId:'krjckwp2wcfxufmr',
  onAuth(e){
      console.log(e)
  }
})
export const withAntdTheme = (story: StoryFn<VueRenderer>,context) => {
  console.log('装饰器已应用，包裹 ConfigProvider');
  const themeMode = ref(context.globals.themeMode || 'dark')
  // 监听全局主题变化
  return defineComponent({
    setup() {
      return () => h(
        AConfigProvider,
        { theme: themes[themeMode.value] }, // 使用默认主题进行测试
        { default: () => h(story()) }
      );
    },
  });
};