import { EOL } from 'os';
import path from 'path';
import { expect } from 'chai';
import { jscodeshift } from '../../../testUtils';
import transform from './input-base-props';
import readFile from '../../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@mui/codemod', () => {
  describe('deprecations', () => {
    describe('input-base-props', () => {
      it('transforms props as needed', () => {
        const actual = transform(
          { source: read('./test-cases/actual.js') },
          { jscodeshift },
          {
            printOptions: {
              lineTerminator: EOL,
            },
          },
        );

        const expected = read('./test-cases/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          { source: read('./test-cases/expected.js') },
          { jscodeshift },
          {
            printOptions: {
              lineTerminator: EOL,
            },
          },
        );

        const expected = read('./test-cases/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });

    describe('[theme] input-base-props', () => {
      it('transforms props as needed', () => {
        const actual = transform(
          { source: read('./test-cases/theme.actual.js') },
          { jscodeshift },
          { printOptions: { trailingComma: false, lineTerminator: EOL } },
        );

        const expected = read('./test-cases/theme.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          { source: read('./test-cases/theme.expected.js') },
          { jscodeshift },
          {
            printOptions: {
              lineTerminator: EOL,
            },
          },
        );

        const expected = read('./test-cases/theme.expected.js');

        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });
  });
});
