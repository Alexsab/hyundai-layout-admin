// VARIABLES & PATHS
let preprocessor = 'sass', // Preprocessor (sass, scss, less, styl)
    fileswatch   = 'html,htm,txt,json,md,woff2,php', // List of files extensions for watching & hard reload (comma separated)
    pageversion  = 'html,htm,php', // List of files extensions for watching change version files (comma separated)
    imageswatch  = 'jpg,jpeg,png,webp,svg', // List of images extensions for watching & compression (comma separated)
    online       = true, // If «false» - Browsersync will work offline without internet connection
    basename     = require('path').basename(__dirname),
    forProd      = [
					'/**',
					' * @author Alexsab.ru',
					' */',
					''].join('\n');

const { src, dest, parallel, series, watch, task } = require('gulp'),
	sass           = require('gulp-sass'),
	cleancss       = require('gulp-clean-css'),
	concat         = require('gulp-concat'),
	browserSync    = require('browser-sync').create(),
	uglify         = require('gulp-uglify-es').default,
	autoprefixer   = require('gulp-autoprefixer'),
	imagemin       = require('gulp-imagemin'),
	newer          = require('gulp-newer'),
	rsync          = require('gulp-rsync'),
	del            = require('del'),
	connect        = require('gulp-connect-php'),
	header         = require('gulp-header'),
	notify         = require('gulp-notify'),
	rename         = require('gulp-rename'),
	responsive     = require('gulp-responsive'),
	pngquant       = require('imagemin-pngquant'),
	merge          = require('merge-stream'),
	// version        = require('gulp-version-number'),
	// revAll         = require('gulp-rev-all'),
	replace        = require('gulp-replace');

if(typeof projects == 'undefined') 
	global.projects = {};
if(typeof port == 'undefined') 
	global.port = 8100;


projects.hyundai_layout_admin = {

	port: ++port,

	base: basename,
	dest: basename,

	styles: {
		src:    basename + '/resources/admin/' + preprocessor + '/main.*',
		watch:    basename + '/resources/admin/' + preprocessor + '/*',
		dest:   basename + '/public/css/admin',
		output: 'main.css',
	},
	styles_libs: {
		src:    [
			basename + '/resources/admin/libs/jquery-ui/jquery-ui.min.css',
			basename + '/resources/admin/libs/selectize/selectize.css',
		],
		watch:    basename + '/resources/libs/*',
		dest:   basename + '/public/css/admin',
		output: 'libs.css',
	},

	scripts: {
		src: [
			basename + '/resources/admin/js/common.js',
		],
		dest:       basename + '/public/js/admin',
		output:     'admin.js',
	},
	scripts_libs: {
		src: [
			basename + '/resources/libs/jquery/3.3.1.min.js',
			basename + '/resources/admin/libs/jquery-ui/jquery-ui.min.js',
			basename + '/resources/admin/libs/selectize/selectize.min.js',
		],
		dest:       basename + '/public/js/admin',
		output:     'libs.js',
	},

	code: {
		src: [
			basename  + '/**/*.{' + fileswatch + '}',
			// '!' + basename + '/base/objs.json'
		],
	},
}



/* hyundai_layout_admin BEGIN */

// Local Server
function hyundai_layout_admin_browsersync() {
	connect.server({
		port: projects.hyundai_layout_admin.port,
		base: projects.hyundai_layout_admin.base,
	}, function (){
		browserSync.init({
			// server: { baseDir: projects.hyundai_layout_admin.base + '/' },
			proxy: '127.0.0.1:' + projects.hyundai_layout_admin.port,
			notify: false,
			online: online
		});
	});
};

// Custom Styles
function hyundai_layout_admin_styles() {
	return src(projects.hyundai_layout_admin.styles.src)
	.pipe(eval(preprocessor)({ outputStyle: 'expanded' }).on("error", notify.onError()))
	.pipe(concat(projects.hyundai_layout_admin.styles.output))
	.pipe(autoprefixer({ grid: true, overrideBrowserslist: ['last 10 versions'] }))
	.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Optional. Comment out when debugging
	.pipe(dest(projects.hyundai_layout_admin.styles.dest))
	.pipe(browserSync.stream())

};
function hyundai_layout_admin_styles_libs() {
	return src(projects.hyundai_layout_admin.styles_libs.src)
	.pipe(eval(preprocessor)({ outputStyle: 'expanded' }).on("error", notify.onError()))
	.pipe(concat(projects.hyundai_layout_admin.styles_libs.output))
	.pipe(autoprefixer({ grid: true, overrideBrowserslist: ['last 10 versions'] }))
	.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Optional. Comment out when debugging
	.pipe(dest(projects.hyundai_layout_admin.styles_libs.dest))
	.pipe(browserSync.stream())

};

// Scripts & JS Libraries
function hyundai_layout_admin_scripts() {
	return src(projects.hyundai_layout_admin.scripts.src)
	.pipe(concat(projects.hyundai_layout_admin.scripts.output))
	.pipe(uglify()) // Minify js (opt.)
	.pipe(header(projects.hyundai_layout_admin.forProd))
	.pipe(dest(projects.hyundai_layout_admin.scripts.dest))
	.pipe(browserSync.stream())
};
function hyundai_layout_admin_scripts_libs() {
	return src(projects.hyundai_layout_admin.scripts_libs.src)
	.pipe(concat(projects.hyundai_layout_admin.scripts_libs.output))
	.pipe(uglify()) // Minify js (opt.)
	.pipe(header(projects.hyundai_layout_admin.forProd))
	.pipe(dest(projects.hyundai_layout_admin.scripts_libs.dest))
	.pipe(browserSync.stream())
};

function hyundai_layout_admin_watch() {
	watch(projects.hyundai_layout_admin.styles.watch, hyundai_layout_admin_styles);
	watch(projects.hyundai_layout_admin.scripts.src, hyundai_layout_admin_scripts);
	watch(projects.hyundai_layout_admin.styles_libs.watch, hyundai_layout_admin_styles_libs);
	watch(projects.hyundai_layout_admin.scripts_libs.src, hyundai_layout_admin_scripts_libs);

	watch(projects.hyundai_layout_admin.code.src).on('change', browserSync.reload);
};

module.exports = parallel(hyundai_layout_admin_styles, hyundai_layout_admin_styles_libs, hyundai_layout_admin_scripts, hyundai_layout_admin_scripts_libs, hyundai_layout_admin_browsersync, hyundai_layout_admin_watch);


/* hyundai_layout_admin END */


