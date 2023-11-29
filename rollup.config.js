import esbuild from 'rollup-plugin-esbuild'
import scss from 'rollup-plugin-scss'
import { defineConfig } from "rollup"

export default defineConfig({
  input: 'src/index.ts',
  output: [
    {
      format: 'iife',
      file: 'dist/index.iife.js',
      name: 'FluentReveal'
    },
    {
      format: 'cjs',
      file: 'dist/index.cjs'
    },
    {
      format: 'esm',
      file: 'dist/index.mjs'
    }
  ],
  plugins: [
    esbuild({ minify: true }),
    scss({ insert: true })
  ]
})