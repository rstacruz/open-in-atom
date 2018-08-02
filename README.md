# open-in-atom

> Open a file in Atom from the terminal without lag 🏎️

This package lets you open files from the command line. Atom already lets you do this with their `atom` CLI helper, but this one is *freaking instantaneously fast*.

![open-in-atom](https://user-images.githubusercontent.com/74385/43037729-87aeccec-8d43-11e8-8509-b64115de0f91.gif)

## Installation

Install [open-in-atom-cli] bin using npm or yarn:

```sh
npm install -g open-in-atom-cli
yarn global add open-in-atom-cli
```

> (Alternatively, you can just copy the shell script [`open-in-atom`](https://github.com/rstacruz/open-in-atom-cli/blob/master/bin/open-in-atom) to your PATH.)

Then install the companion Atom package, [open-in-atom-pkg](https://atom.io/packages/open-in-atom-pkg):

```sh
apm install open-in-atom-pkg
```

[open-in-atom-cli]: https://github.com/rstacruz/open-in-atom-cli

## Usage

Use `open-in-atom <file>` in your terminal. It will open your files instantly, instead of waiting 5 seconds for the official Atom CLI.

```sh
# Open a file
open-in-atom README.md

# Open a directory
open-in-atom .

# Open a directory and some files under it
open-in-atom . README.md package.json
```

## Using with other apps

You can set atom-open as your EDITOR for some apps. Here it is working with [ranger] (eg, `EDITOR=open-in-atom ranger`):

![open-in-atom-ranger](https://user-images.githubusercontent.com/74385/43037857-c60eabe6-8d44-11e8-9254-23c29826b045.gif)

[ranger]: https://github.com/ranger/ranger

## Thanks

**open-in-atom** © 2018, Rico Sta. Cruz. Released under the [MIT] License.<br>
Authored and maintained by Rico Sta. Cruz with help from contributors ([list][contributors]).

> [ricostacruz.com](http://ricostacruz.com) &nbsp;&middot;&nbsp;
> GitHub [@rstacruz](https://github.com/rstacruz) &nbsp;&middot;&nbsp;
> Twitter [@rstacruz](https://twitter.com/rstacruz)

[![](https://img.shields.io/github/followers/rstacruz.svg?style=social&label=@rstacruz)](https://github.com/rstacruz) &nbsp;
[![](https://img.shields.io/twitter/follow/rstacruz.svg?style=social&label=@rstacruz)](https://twitter.com/rstacruz)

[mit]: http://mit-license.org/
[contributors]: http://github.com/rstacruz/open-in-atom/contributors
