import path from 'path'
import { fileURLToPath } from 'url'
import { withPayload } from '@payloadcms/next/withPayload'

const dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  // A lockfile in the home directory otherwise makes Next treat that folder as the app root.
  outputFileTracingRoot: dirname,
}

export default withPayload(nextConfig)
