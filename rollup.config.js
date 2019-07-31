import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import del from 'rollup-plugin-delete';

const DIST_DIR = 'dist';

const EXTENSIONS = ['.js', '.jsx'];

const GLOBALS = {
  react: 'React',
  'prop-types': 'PropTypes',
  'styled-components': 'styled',
};

const isProduction = process.env.BUILD === 'production';

module.exports = {
  input: 'src/index.js',
  external: Object.keys(GLOBALS),
  output: [
    {
      file: `${DIST_DIR}/bundle.cjs.js`,
      format: 'cjs',
    },
    {
      file: `${DIST_DIR}/bundle.esm.js`,
      format: 'esm',
    },
    {
      globals: GLOBALS,
      name: 'MarkDownEditor',
      file: `${DIST_DIR}/bundle.umd.js`,
      format: 'umd',
    },
  ],
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
    isProduction && terser(),
  ],
};
