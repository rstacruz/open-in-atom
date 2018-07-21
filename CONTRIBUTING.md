## Dev notes

```js
// get paths of currently open projects
atom.project.getPaths()

// subdirectories in a project
atom.project.getDirectories()

// Open a file
atom.open({
  pathsToOpen: [ path ],
  newWindow: true
})

// Close all editors
atom.workspace.getTextEditors().forEach(ed => ed.destroy())

// Open a project
atom.project.setPaths([ path ])

// Config
atom.config.get('my-package.xyz')
```
