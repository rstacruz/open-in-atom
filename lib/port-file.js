'use babel'
/* @flow */

import cachedir from 'cachedir'
import mkdirp from 'mkdirp'
import thenify from 'thenify'
import { writeFile, unlinkFileSync } from 'fs'

/**
 * Writes a port file to `~/.cache/open-in-atom/port`.
 * Returns the filename of the file written to.
 */

export async function write ({ port }) {
  const dir = cachedir('open-in-atom')
  const filepath = require('path').resolve(dir, 'port')
  const data = `${port}\n`

  await thenify(mkdirp)(dir)
  await thenify(writeFile)(filepath, data, 'utf-8')

  return filepath
}

/**
 * Deletes the portfile.
 */

export function remove (file) {
  unlinkFileSync(file)
}
