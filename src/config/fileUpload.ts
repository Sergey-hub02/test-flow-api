import type { Options } from 'express-fileupload'
import path from 'path'

const fileUploadConfig: Options = {
    createParentPath: true,
    useTempFiles: true,
    tempFileDir: path.join(process.cwd(), 'dist/tmp'),
    debug: true,
}

export default fileUploadConfig
