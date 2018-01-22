const gulp = require('gulp');
const del = require('del');
var runSequence = require('run-sequence');

const DIST_DIR = 'dist';
const ANTD_ORIGINAL = 'ant-design/**/*';
const WORKSPACE_DIR = 'antd-changed/';

const MODIFIED_THEMES = ['themes/*', /*'!themes/.gitkeep'*/];
const MODIFIED_FONTS = ['fonts/**/*', /*'!fonts/.gitkeep'*/];
const MODIFIED_COMPONENTS = ['components/**', /*'!components/.gitkeep'*/];

gulp.task('copy:original', function(cb){
    return gulp.src(ANTD_ORIGINAL)
        .pipe(gulp.dest(WORKSPACE_DIR));
});

gulp.task('copy:components', function(cb){
    return gulp.src(MODIFIED_COMPONENTS, {base: './'})
        .pipe(gulp.dest(WORKSPACE_DIR));
});

gulp.task('copy:themes', function(cb){
    return gulp.src(MODIFIED_THEMES, {base: './'})
        .pipe(gulp.dest(WORKSPACE_DIR + 'components/style'));
});

gulp.task('copy:fonts', function(cb){
    return gulp.src(MODIFIED_FONTS, {base: './'})
        .pipe(gulp.dest(WORKSPACE_DIR + 'components/style'));
});

gulp.task('copy:dist', function(cb){
    return gulp.src(WORKSPACE_DIR + DIST_DIR + '/*')
        .pipe(gulp.dest(DIST_DIR));
});

gulp.task('dist', function(cb){
    runSequence('clean:dist', 'copy:dist', cb);    
});

gulp.task('clean:dist', function(cb){
    return del([DIST_DIR], cb);        
});

gulp.task('clean:deep', function(cb){
    return del([WORKSPACE_DIR], cb);    
});

gulp.task('clean', function(cb) {
    return del([WORKSPACE_DIR +'/**/*', '!'+WORKSPACE_DIR +'/node_modules/**'], cb);    
});

gulp.task('setup', function(cb) {
    runSequence('clean', 'copy:original', 'copy:components', 'copy:themes', 'copy:fonts', cb);
});