const gulp = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass');

// ================== CSS: ====================

var cssFormat = (done) => {
	gulp.src('css/style.scss')
		.pipe(sass({
			includePaths: ['./css/_sass'],
			outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(gulp.dest('css'));
	done();
};

gulp.task('css:format', cssFormat);

gulp.task('css:watch', () => {
	return gulp.watch('css/**/*.scss', cssFormat);
});

// gulp css
gulp.task('css', gulp.series('css:format', 'css:watch'));

// ================== Babel: ==================

const babelCompile = (done) => {
	gulp.src('babel/*.js')
		.pipe(babel({
			presets: ["@babel/preset-react"]
		}))
		.pipe(gulp.dest('js'))
	done();
};

gulp.task('babel:compile', babelCompile);

gulp.task('babel:watch', () => {
	return gulp.watch('babel/*.js', babelCompile)
});

// gulp babel
gulp.task('babel', gulp.series('babel:compile', 'babel:watch'));

// ================== Default: ===================

// gulp
gulp.task('default', gulp.parallel('css', 'babel'));