[![dependencies Status](https://david-dm.org/underlost/undertasker/status.svg)](https://david-dm.org/underlost/undertasker)
[![Build Status](https://travis-ci.org/underlost/UnderTasker.svg?branch=master)](https://travis-ci.org/underlost/UnderTasker)

# UnderTasker

I built UnderTasker to help assist in developing and testing websites. More specifically, I wrote it to help develop [underlost.net](underlost.net) and [A Life Well Played](alifewellplayed.com), but have since used it for other projects. It’s mainly designed to help generate production ready static assets from their source files, as well as quickly publish sites to [Github Pages](pages.github.com). Think of it as a sort of swiss army knife for your websites. 

Out of the box, UnderTasker uses the following:

*   [JSLint](http://www.jslint.com)/[CSSLint](csslint.net)
*   [UglifyJS](http://marijnhaverbeke.nl//uglifyjs)
*   [Coffeescript](http://coffeescript.org/)
*   [SASS](http://sass-lang.com/)
*   [CSS Autoprefixer](http://github.com/ai/autoprefixer)
*   [gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin) (For image optimizations)
*   [gulp-deploy-git](https://www.npmjs.com/package/gulp-deploy-git) (For git deployment)
*   [gulp-gh-pages](https://www.npmjs.com/package/gulp-gh-pages) (Deploy easily to Github)
*   [Jekyll](http://jekyllrb.com/) (For compiling html)

If there’s a Gulp plugin, you can (probably) use it with UnderTasker. Add, remove, and extend to your heart’s content. When you&#39;re finished, you can even publish your static site to Github Pages with a single gulp command.

## Getting Started

UnderTasker requires Yarn to be installed. [Consult the Yarn site](https://yarnpkg.com/en/) for installation directions on your platform.

*  Run `yarn install` for dependencies (list located in _package.json_. This might take a little while.
*  Run `gulp install` to copy over framework dependencies, such as Bootstrap and Font Awesome to your jekyll build.
*  By default, your static assets will be called site.extension (site.css, site.js, etc).
*  If you plan on using UnderTasker for deploying a static site, you will probably want to install something like Jekyll or Jade. 
*  If you plan on deploying the site with git, make sure you update `gulpfile.js` with the correct location.

### If Using Jekyll:

*   If necessary, [install Jekyll](http://jekyllrb.com/docs/installation) (requires v2.1.x).
*   From the root /undertasker directory, run `jekyll serve` in the command line. Or if you're using bundler, `bundle exec jekyll serve`.
*   Visit [http://localhost:9005](http://localhost:9005/) in your browser.

## What’s Included

All of your work will mostly be done in the _source_ directory. All files from _source_ will be compiled and copies to the _dist_ directory upon running the specified commands in the next section. Files in the _dist_ directory will be production ready. That is, they will be compiled, minified, and ready to deployed to the web. The compiled _dist_ directory will also be copied to _source/site_, the directory used for publishing to Github Pages. Gulp will clean up and repopulate files in the _dist_ directories as necessary whenever commands are issued.
  
```
├─ source/
│ ├─ img/
│ ├─ js/
│ ├─ sass/
│ └─ site/
│    └─ dist/
│    └─ index.html
├─ dist/
│ ├─ img/
│ ├─ js/
│ └─ css/
├─ .publish/
│ ├─ dist/
│ └─ index.html
├─ _config.yml
├─ gulpfile.js
├─ Gemfile
├─ yarn.lock
└─ package.json
```

Just about everything happens in gulpfile.js. If you want to make modifications to the workflow, you’ll probably want to edit that. If you&#39;re working with a static site, as previously mentioned, package.json contains several variables you might want to change to better suit the naming conventions of your files, as well as the url to the github repo you might want to deploy your site to.

Bare minimal css elements from Bootstrap (in the form of SCSS) are also included to help you get started. These files are in no way required and can be deleted or edited however you want.

## Commands

**UnderTasker** can do everything at once, or just certain tasks. 

*   `gulp install`
Copies over frameworks/dependencies from node_modules. This should typically only ever be used at the start of setting up a project.
*   `gulp brew-coffee`
Converts coffeescript files inside _source/coffee_ to _source/js/app.js_. 
*   `gulp build-css`
Only compiles, autoprefixes, and minifies the CSS. 
*   `gulp build-js`
Minimizes and uglifies everything in the js directory into a single file (including app.js).
*   `gulp imagemin`
Attempts to optimize any JPG/PNG/GIF images in _source/img._
*   `guild build`
Build all static assets from _source_, including sass and javascript, as well as tries to optimize any JPG/PNG files in _source/img_.
*   `gulp deploy`
Builds, validates and deploys your *.publish* directory and compiled assets to the git repository specified. This might take a few minutes, depending on the size of your site and connection speed.
*   `gulp github`
Runs `gulp build` and attempts to deploy to your project's Github Pages.
*   `gulp clean`
Cleans out (deletes) the dist folders.
*   `gulp jekyll`
Runs jekyll and builds the site into *.publish*.
*   `gulp watch`
Watches for any css/HTML changes as well as changes to HTML in site/source, and updates the site accordingly.

## Usage

UnderTasker can be used for a few different things. If you're looking to use it to develop a static website, you just need to run `gulp`. UnderTasker users BrowserSync, which allows you to make edits to the CSS, Javascript, and HTML and it will automatically compile and update in the browser for you.

If you're not interested in compiling the HTML, `gulp watch` will act similar, and update CSS/JS accordingly. If you're looking to use this as a way to build/minify static files to use with your web app, it also has you covered. Just run `gulp build` and all of your compiled, minified and uglified static files can be found in `./dist`.

## Example

To see it in action, visit the [**UnderTasker**](http://tyler.codes/UnderTasker) site. To view the source, or to clone the git repo, check out [https://github.com/underlost/UnderTasker](https://github.com/underlost/UnderTasker). I also built [**tyler.codes**](http://tyler.codes/) [(source)](https://github.com/underlost/underlost.github.io) and [**underlost.net**](http://underlost.net/) [(source)](https://github.com/underlost/underlost.net) with UnderTasker.


## Support

If you&#39;re not sure what this is, it’s probably not for you. UnderTasker is provided as is, and I can not assist in helping you get it setup beyond what's written in these docs. Your best bet is to first go read up on [Gulp](http://gulpjs.com/), then come back here. If you believe you’ve encountered a bug, feel free to open an [issue on Github](https://github.com/underlost/UnderTasker/issues).


## License

UnderTasker is released under the [MIT License](https://github.com/underlost/UnderTasker/blob/master/LICENSE).


## Changes
For updates and changes to this project, please refer to [changelog.md](https://github.com/underlost/UnderTasker/blob/master/changelog.md).
