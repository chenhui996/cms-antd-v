import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ['src/**/*.vue', 'src/**/*.ts'],
      exclude: ['src/**/*.stories.ts', 'src/**/*.mdx', 'src/**/*.test.ts'],
      outDir: 'dist/types',
      tsconfigPath: './tsconfig.json',
      rollupTypes: true,
      insertTypesEntry: true
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/components/index.ts'),
      name: 'CMSUI',
      fileName: 'index'
    },
    rollupOptions: {
      external: ['vue', 'ant-design-vue', '@ant-design/icons-vue'],
      output: [
        {
          format: 'es',
          globals: {
            vue: 'Vue',
            'ant-design-vue': 'AntDesignVue',
            '@ant-design/icons-vue': 'AntDesignIconsVue'
          },
          exports: 'named'
        },
        {
          format: 'cjs',
          globals: {
            vue: 'Vue',
            'ant-design-vue': 'AntDesignVue',
            '@ant-design/icons-vue': 'AntDesignIconsVue'
          },
          exports: 'named'
        }
      ]
    },
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: `@import "@/styles/index.less";`
      }
    }
  }
})
