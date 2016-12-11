/* eslint-disable import/no-extraneous-dependencies */

import 'babel-register';

import gulp from 'gulp';
import del from 'del';

import eslint from 'gulp-eslint';
import excludeGitignore from 'gulp-exclude-gitignore';
import babel from 'gulp-babel';

import webpack from 'webpack-stream';
import webpackConfig from './webpack.config';

gulp.task('lint', () =>
  gulp.src('src/**/*.js')
    .pipe(excludeGitignore())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError()),
);

gulp.task('babel', ['clean'], () =>
  gulp.src('src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('lib')),
);

gulp.task('pack', ['clean', 'babel'], () =>
  gulp.src('lib/index.js')
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('dist')),
);

gulp.task('clean', () =>
  del(['dist', 'lib']),
);

gulp.task('watch', () => {
  gulp.watch('src/**/*.js', ['lint']);
});

gulp.task('build', ['clean', 'lint', 'babel', 'pack']);

gulp.task('prepublish', ['build']);

gulp.task('default', ['lint']);
