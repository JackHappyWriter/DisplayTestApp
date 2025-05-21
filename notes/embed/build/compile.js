/*
 * Compile and minify the embed code.js
 */

var fs = require('fs-extra');
var path = require('path');
var uglifyCss = require('uglifycss');
var UglifyJS = require("uglify-js");
var colors = require('colors');
// const { execSync } = require("child_process");

console.log('hello world...');

const SCRIPT_ROOT = 'src/scripts/embed/';
const PUBLIC = 'public/v2/';
const WIDGET_JS = 'widget.js';
const WIDGET_MIN_JS = 'widget.min.js';
const STYLES = 'styles/';
const WIDGET_CSS = 'widget.css';
const WIDGET_MIN_CSS = 'widget.min.css';
const BOOTSTRAP_JS = 'ecal.widget.js';
const BOOTSTRAP_MIN_JS = 'ecal.widget.min.js';

const LEGACY_V1_DEST = 'public/button/v1/';

const LEGACY_V1_MAIN = 'main.js';
const LEGACY_MAIN_SRC = 'main_v1.js';

const LEGACY_V1_ECAL_JS = 'public/js/eCal.js';
const LEGACY_V1_ECAL_JS_SRC = 'eCal-legacy.js';

const CompileSteps = {
    MERGING_JS: '1. Merging Embeddable Javascripts...',
    SAVE_MERGED_JS: '2. Saving Merged Javascripts...',
    SAVE_MINIFIED_JS: '3. Saving Minified Javascript...',
    COPY_STYLES : '4. Copying Styles...',
    MINIFY_STYLES: '5. Minfiying Styles...',
    COPY_BOOTSTRAP: '6. Copy Bootstrap Javascript...',
    MINIFY_BOOTSTRAP: '7. Minify Bootstrap Javascript...',
    MINIFY_V1_BOOTSTRAP: '8. Minifiy V1 Legacy Bootstrap...',
    MINIFY_X_CONNECT: '9. Minify Sync Display Cross Domain Connection...',
    COMPILE_SUCCESS: '10. Compile Success!',
}

var lib = require('./sources');

var PROJECT_ROOT = __dirname ;
PROJECT_ROOT = path.join(PROJECT_ROOT,  '/../../../');

console.log('Project Root: ', PROJECT_ROOT);

function compile (){
    // minifySources('/public/v2');
    console.log(CompileSteps.MERGING_JS.red);
    const merged = mergeJS();
    console.log(CompileSteps.SAVE_MERGED_JS.blue);
    saveMergedJS(merged);
   
    console.log(CompileSteps.SAVE_MINIFIED_JS.yellow);
    saveMergedMinJS(merged);
   
    console.log(CompileSteps.COPY_STYLES.cyan);
    copyCSS();
   
    console.log(CompileSteps.MINIFY_STYLES.green);
    saveMiniCSS();

    console.log(CompileSteps.COPY_BOOTSTRAP.green);
    copyBootstrap();

    console.log(CompileSteps.MINIFY_BOOTSTRAP.cyan);
    minifyBootstrap();

    console.log(CompileSteps.MINIFY_V1_BOOTSTRAP.yellow);
    minifiyV1Bootstrapper();

    console.log(CompileSteps.MINIFY_X_CONNECT.white);
    minifyXConnect();

    console.log(CompileSteps.COMPILE_SUCCESS.blue);

    
}


function mergeJS () {
    let merged = '';
    for (let i = 0; i < lib.length; i++) {
        const jsfile = lib[i];
        const  fullPath = path.join(PROJECT_ROOT, SCRIPT_ROOT + jsfile);
        const  content =  fs.readFileSync(fullPath, "utf-8");
        merged += content + '\n\n';
    }
    return merged;
}

function saveMergedJS (content = '') {
    const destination = path.join(PROJECT_ROOT, `${PUBLIC}${WIDGET_JS}`);
    fs.writeFileSync( destination , content);
}

/*
 * MINIFIED OPTIONS
    warnings: 'verbose',    
    keep_fnames: true,
    mangle: false,
 */
function saveMergedMinJS (content = '') {
    const destination = path.join(PROJECT_ROOT, `${PUBLIC}${WIDGET_MIN_JS}`);
    const options = {
        ie8: true,
        webkit: true,
    };
    const minified = UglifyJS.minify(content, options); 
    fs.writeFileSync( destination , minified.code);
}

function saveMiniCSS () {
    const fullPath = path.join(PROJECT_ROOT, SCRIPT_ROOT + STYLES + WIDGET_CSS);
    const minifiedPath = path.join(PUBLIC, WIDGET_MIN_CSS);
    const uglified = uglifyCss.processFiles([fullPath], {});
    fs.writeFileSync(minifiedPath, uglified  );
}

function copyCSS () {
    const src = path.join(PROJECT_ROOT, SCRIPT_ROOT + STYLES + WIDGET_CSS);
    const dest = path.join(PUBLIC, WIDGET_CSS);
    fs.copyFileSync(src, dest);
}

function copyBootstrap () {
    const src = path.join(PROJECT_ROOT, SCRIPT_ROOT + BOOTSTRAP_JS);
    const dest = path.join(PROJECT_ROOT, `${PUBLIC}${BOOTSTRAP_JS}`);
    fs.copyFileSync(src, dest);
}

function minifyBootstrap () {
    const src = path.join(PROJECT_ROOT, SCRIPT_ROOT + BOOTSTRAP_JS);
    const dest = path.join(PROJECT_ROOT, `${PUBLIC}${BOOTSTRAP_MIN_JS}`);
    const content =  fs.readFileSync(src, "utf-8");
    const options = {
        ie8: true,
        webkit: true,
    };
    const minified = UglifyJS.minify(content, options); 
    fs.writeFileSync( dest , minified.code);
}

function loadAndMinfiy (src) {
    const  content =  fs.readFileSync(src, "utf-8");
    const options = {
        ie8: true,
        webkit: true,
    };
    // return content;
    return UglifyJS.minify(content,options);
}

function minifyAndSave (src, dest) {
    const mini = loadAndMinfiy(src);
    // fs.writeFileSync(dest, mini);
    fs.writeFileSync(dest, mini.code);
}

function minifiyV1Bootstrapper () {
    const src = path.join(PROJECT_ROOT, SCRIPT_ROOT + LEGACY_MAIN_SRC);
    const dest = path.join(PROJECT_ROOT, `${LEGACY_V1_DEST}${LEGACY_V1_MAIN}`);
    minifyAndSave(src,dest);
    
    const src2 = path.join(PROJECT_ROOT, SCRIPT_ROOT + LEGACY_V1_ECAL_JS_SRC);
    const dest2 = path.join(PROJECT_ROOT, `${LEGACY_V1_ECAL_JS}`);
    fs.copyFileSync(src2, dest2);
    minifyAndSave(src2,dest2);
}

function minifyXConnect () {
    const xConSrc = path.join(PROJECT_ROOT, SCRIPT_ROOT + '/syncdisplay-xconnect.js');
    const xConDest = path.join(PROJECT_ROOT, 'public/js/syncdisplay-xconnect.js');
    minifyAndSave(xConSrc, xConDest);
}

compile();