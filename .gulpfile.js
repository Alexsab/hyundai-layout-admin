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