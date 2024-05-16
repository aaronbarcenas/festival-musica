
// function tarea( cb ) {
//   console.log('mi primer tarea')

//   cb()
// }

// exports.primerTarea = tarea;

const { src, dest, watch, parallel } = require('gulp') // *** src sirve para identificar un archivo,  dest sirve para guardarlo

// ?? *** CSS ***
const sass = require('gulp-sass')(require('sass'))
const plumber = require('gulp-plumber')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const postcss = require('gulp-postcss')
const sourcemaps = require('gulp-sourcemaps')


// ?? *** IMAGENES ***
const cache = require('gulp-cache')
const imagemin = require('gulp-imagemin')
const webp = import('gulp-webp')

// ?? *** Javascript ***
const terser = require('gulp-terser-js')

function css( cb ) {
  src('src/scss/**/*.scss') // *** Identificar el archivo SASS
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass()) // *** Compilarlo
    .pipe(postcss([ autoprefixer(), cssnano() ]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('build/css')) // *** Almacenarla en el disco duro

  cb() // *** Callback que avisa a gulp cuando llegamos al final
}

function imagenes( cb ) {
  const opciones = {
    optimizationLevel: 3
  }

  src('src/img/**/*.{png,jpg}')
    .pipe( cache( imagemin(opciones)))
    .pipe( dest('build/img'))
  cb()
}

async function versionWebp(done) {
  const opciones = {
      quality: 50
  };
  //Aquí está la clave para que funcione y evitar los problemas que ya había 
  const webpModule = await webp;
  src('src/img/**/*.{png,jpg}')
      .pipe(webpModule.default(opciones))
      .pipe(dest('build/img'));
  done();
}

function javascript ( cb ) {
  src('src/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(terser())
    .pipe(sourcemaps.write('.'))
    .pipe(dest('build/js'));

  cb()
}

function dev( cb ) {
  watch('src/scss/**/*.scss', css)
  watch('src/js/**/*.js', javascript)
  cb()
}

exports.css = css
exports.js = javascript
exports.imagenes = imagenes
exports.versionWebp = versionWebp
exports.dev = parallel( imagenes, versionWebp, javascript, dev )