# mpv.js [![](https://img.shields.io/travis/Kagami/mpv.js.svg)](http://travis-ci.org/Kagami/mpv.js) [![](https://img.shields.io/npm/v/mpv.js.svg)](https://npmjs.org/package/mpv.js)

All format embeddable player for Electron/NW.js applications powered by [mpv](https://mpv.io/).

## Get libmpv

In order to use mpv.js you need to install mpv library first.

* Windows: download [mpv-dev](https://mpv.srsfckn.biz/mpv-dev-latest.7z), unpack, put corresponding `mpv-1.dll` to `C:\Windows\system32`
* macOS: `brew install mpv`
* Linux: `apt-get install libmpv1`

## Usage

## Build

## Example

![](https://i.imgur.com/tLFkATs.png)

[Simple Electron application](example) yet capable of handling pretty much any available video thanks to mpv. Run:

```bash
git clone https://github.com/Kagami/mpv.js.git && cd mpv.js
npm install
npm run example
```

## Applications using mpv.js

* [boram](https://github.com/Kagami/boram)

## License

mpv.js is licensed under [CC0](COPYING) itself, however libmpvjs + libmpv package is meant to be distributed as GPLv2+ due to mpv [being GPL](https://github.com/mpv-player/mpv/blob/master/LICENSE) and GPL dynamic linking restrictions.

It shouldn't affect entire Electron/NW.js app though because Chromium runs plugins inside separate process and GPL FAQ [doesn't restrict that](https://www.gnu.org/licenses/gpl-faq.html#NFUseGPLPlugins). (This is not a legal advice.)

Example video is part of Tears of Steel movie (CC) Blender Foundation | mango.blender.org.
