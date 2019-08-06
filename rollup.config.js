import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import del from 'rollup-plugin-delete';
import scss from 'rollup-plugin-scss';

const DIST_DIR = 'dist';
const INPUT_FILE = 'src/index.js';
const CSS_FILE = `${DIST_DIR}/style.css`;
const EXTENSIONS = ['.js'];
const isDevelopment = process.env.BUILD === 'development';

const GLOBALS = {
  react: 'React',
  codemirror: 'CodeMirror',
};

const output = isProduction => {
  return [
    {
      file: `${DIST_DIR}/bundle.cjs${isProduction ? '.min' : ''}.js`,
      format: 'cjs',
    },
    {
      file: `${DIST_DIR}/bundle.esm${isProduction ? '.min' : ''}.js`,
      format: 'esm',
    },
    {
      globals: GLOBALS,
      name: 'MarkDownEditor',
      file: `${DIST_DIR}/bundle.umd${isProduction ? '.min' : ''}.js`,
      format: 'umd',
    },
  ];
};

const developmentBuild = {
  input: INPUT_FILE,
  external: Object.keys(GLOBALS),
  output: output(),
  plugins: [
    resolve({
      extensions: EXTENSIONS,
    }),
    babel({
      extensions: EXTENSIONS,
      exclude: 'node_modules/**',
    }),
    commonjs(),
    scss({
      output: CSS_FILE,
    }),
  ],
};

const productionBuild = {
  input: INPUT_FILE,
  external: Object.keys(GLOBALS),
  output: output(true),
  plugins: [
    del({ targets: 'dist/*' }),
    resolve({
      extensions: EXTENSIONS,
    }),
    babel({
      extensions: EXTENSIONS,
      exclude: 'node_modules/**',
    }),
    commonjs(),
    scss({
      output: CSS_FILE,
    }),
    terser(),
  ],
};

const builds = [developmentBuild];

if (!isDevelopment) {
  builds.unshift(productionBuild);
}

module.exports = builds;
