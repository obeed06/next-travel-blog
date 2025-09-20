import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas/schema'
import { colorInput } from '@sanity/color-input'

export default defineConfig({
  name: 'default',
  title: 'react-travel-blog',

  projectId: 'ho3u0oh3',
  dataset: 'production',

  plugins: [colorInput(), structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})