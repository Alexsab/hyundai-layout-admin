	
// let projects
	hyundai_layout_admin: {
		port: 8007,

		base: base.hyundai_layout_admin,
		dest: base.hyundai_layout_admin,

		styles: {
			src:    base.hyundai_layout_admin + '/resources/admin/' + preprocessor + '/main.*',
			watch:    base.hyundai_layout_admin + '/resources/admin/' + preprocessor + '/*',
			dest:   base.hyundai_layout_admin + '/public/css/admin',
			output: 'main.css',
		},
		styles_libs: {
			src:    [
				base.hyundai_layout_admin + '/resources/admin/libs/jquery-ui/jquery-ui.min.css',
				base.hyundai_layout_admin + '/resources/admin/libs/selectize/selectize.css',
			],
			watch:    base.hyundai_layout_admin + '/resources/libs/*',
			dest:   base.hyundai_layout_admin + '/public/css/admin',
			output: 'libs.css',
		},

		scripts: {
			src: [
				base.hyundai_layout_admin + '/resources/admin/js/common.js',
			],
			dest:       base.hyundai_layout_admin + '/public/js/admin',
			output:     'admin.js',
		},
		scripts_libs: {
			src: [
				base.hyundai_layout_admin + '/resources/libs/jquery/3.3.1.min.js',
				base.hyundai_layout_admin + '/resources/admin/libs/jquery-ui/jquery-ui.min.js',
				base.hyundai_layout_admin + '/resources/admin/libs/selectize/selectize.min.js',
			],
			dest:       base.hyundai_layout_admin + '/public/js/admin',
			output:     'libs.js',
		},

		code: {
			src: [
				base.hyundai_layout_admin  + '/**/*.{' + fileswatch + '}'
			],
		},
	},
// let projects END


/* hyundai_layout_admin */

// Local Server
function hyundai_layout_admin_browsersync() {
	connect.server({
		port: projects.hyundai_layout_admin.port,
		base: projects.hyundai_layout_admin.base,
	}, function (){
		browserSync.init({
			//server: { baseDir: projects.kia.base + '/' },
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

// styles_libs
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

// scripts_libs
function hyundai_layout_admin_scripts_libs() {
	return src(projects.hyundai_layout_admin.scripts_libs.src)
	.pipe(concat(projects.hyundai_layout_admin.scripts_libs.output))
	.pipe(uglify()) // Minify js (opt.)
	.pipe(header(projects.hyundai_layout_admin.forProd))
	.pipe(dest(projects.hyundai_layout_admin.scripts_libs.dest))
	.pipe(browserSync.stream())
};

function hyundai_layout_admin_watch() {
	watch(projects.hyundai_layout_admin.styles.src, hyundai_layout_admin_styles);
	watch(projects.hyundai_layout_admin.styles.src, hyundai_layout_admin_styles_libs);
	watch(projects.hyundai_layout_admin.scripts.src, hyundai_layout_admin_scripts);
	watch(projects.hyundai_layout_admin.scripts.src, hyundai_layout_admin_scripts_libs);

	watch(projects.hyundai_layout_admin.code.src).on('change', browserSync.reload);
};

exports.hyundai_layout_admin = parallel(hyundai_layout_admin_styles, hyundai_layout_admin_styles_libs, hyundai_layout_admin_scripts, hyundai_layout_admin_scripts_libs, hyundai_layout_admin_browsersync, hyundai_layout_admin_watch);

/* hyundai_layout_admin END */