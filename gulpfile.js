const gulp = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const clean = require('gulp-clean');

// ================== CSS: ====================

const cssFormat = (done) => {
	gulp.src('css/style.scss')
		.pipe(sass({
			includePaths: ['./css/_sass'],
			outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(gulp.dest('css'));
	done();
};

const cssClean = (done) => {
	gulp.src('css/style.css', {allowEmpty: true})
			.pipe(clean());
	done();
};

gulp.task('css:format', cssFormat);

gulp.task('css:watch', () => {
	return gulp.watch('css/**/*.scss', cssFormat);
});

gulp.task('css:clean', cssClean);

// gulp css
gulp.task('css', gulp.series('css:clean', 'css:format', 'css:watch'));

// ================== Babel: ==================

const babelCompile = (done) => {
	gulp.src('babel/*.js')
		.pipe(babel({
			presets: ["@babel/preset-react"]
		}))
		.pipe(concat('main.js'))
		.pipe(gulp.dest('js'))
	done();
};

const babelClean = (done) => {
	gulp.src('js/*.js', {allowEmpty: true})
		.pipe(clean());
	done();
};

gulp.task('babel:compile', babelCompile);

gulp.task('babel:watch', () => {
	return gulp.watch('babel/*.js', babelCompile)
});

gulp.task('babel:clean', babelClean);

// gulp babel
gulp.task('babel', gulp.series('babel:clean', 'babel:compile', 'babel:watch'));


// ================== Default: ===================

// gulp
gulp.task('default', gulp.parallel('css', 'babel'));

// ----------------------------------------------------------

// Special tasks!!!

// concatenate HTML:
const htmlPartials = (filepath, outname, done) => {
	gulp.src(['html/partials/head.html', filename, 'html/partials/react-foot.html'])
		.pipe(concat(outname));
});

// jk I give up on this for now!!
// here's a link for more info: https://www.npmjs.com/package/gulp-file-include