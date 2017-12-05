const gulp = require('gulp');
const del = require('del');
var runSequence = require('run-sequence');

const DIST_DIR = './dist';
const ANTD_ORIGINAL = 'ant-design/**/*';
const WORKSPACE_DIR = 'antd-changed/';

const MODIFIED_THEMES = ['./index.less', 'themes/*', '!themes/.gitkeep'];
const MODIFIED_COMPONENTS = ['components/**', '!components/.gitkeep'];

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

gulp.task('clean:deep', function(cb){
    return del([WORKSPACE_DIR], cb);    
});

gulp.task('clean', function(cb) {
    return del([WORKSPACE_DIR +'/**/*', '!'+WORKSPACE_DIR +'/node_modules/**'], cb);    
});

gulp.task('setup', function(cb) {
    runSequence('clean', 'copy:original', 'copy:components', 'copy:themes', cb);
});