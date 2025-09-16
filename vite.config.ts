import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import { copyFileSync, existsSync, mkdirSync } from 'fs'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ['src/**/*.vue', 'src/**/*.ts'],
      exclude: ['src/**/*.stories.ts', 'src/**/*.mdx', 'src/**/*.test.ts'],
      outDir: 'dist/types',
      tsconfigPath: './tsconfig.app.json',
      rollupTypes: true,
      insertTypesEntry: true
    }),
    // 自定义插件：自动复制样式类型声明文件
    {
      name: 'copy-style-types',
      writeBundle() {
        const srcFile = resolve(__dirname, 'src/types/style.d.ts')
        const distDir = resolve(__dirname, 'dist/types')
        const distFile = resolve(distDir, 'style.d.ts')
        
        if (existsSync(srcFile)) {
          if (!existsSync(distDir)) {
            mkdirSync(distDir, { recursive: true })
          }
          copyFileSync(srcFile, distFile)
          console.log('✅ 已自动复制样式类型声明文件到 dist/types/style.d.ts')
        }
      }
    }
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
