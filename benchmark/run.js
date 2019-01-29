const { Suite } = require('benchmark');
const { table } = require('table');
const prettyMs = require('pretty-ms');
const { bold } = require('chalk');

const VerEx = require('../dist/verbalexpressions');

const benchmarks = {};
const todo = {};

benchmarks.constructor = {
    VerEx: () => { VerEx(); },
    RegExp: () => { RegExp(); },
};

benchmarks.startOfLine = {
    VerEx: () => { VerEx().startOfLine('a').test('alpha'); },
    RegExp: () => { /^a/gm.test('alpha'); },
};

benchmarks.endOfLine = {
    VerEx: () => { VerEx().endOfLine('a').test('alpha'); },
    RegExp: () => { /a$/gm.test('alpha'); },
};

benchmarks['then|find'] = {
    VerEx: () => { VerEx().find('alpha').test('alpha'); },
    RegExp: () => { /alpha/gm.test('alpha'); },
};

benchmarks.maybe = {
    VerEx: () => {
        const expr = VerEx().maybe('a');
        expr.test('a'); expr.test('');
    },
    RegExp: () => {
        const expr = /a?/gm;
        expr.test('a'); expr.test('');
    },
};

benchmarks.anything = {
    VerEx: () => { VerEx().anything().test('alpha'); },
    RegExp: () => { /.*/gm.test('alpha'); },
};

benchmarks.anythingBut = {
    VerEx: () => {
        const expr = VerEx().anythingBut('a');
        expr.test('a'); expr.test('e');
    },
    RegExp: () => {
        const expr = /.*/gm;
        expr.test('a'); expr.test('e');
    },
};

benchmarks.something = {
    VerEx: () => {
        const expr = VerEx().something();
        expr.test('a'); expr.test('');
    },
    RegExp: () => {
        const expr = /.+/gm;
        expr.test('a'); expr.test('');
    },
};

benchmarks.somethingBut = {
    VerEx: () => {
        const expr = VerEx().somethingBut('a');
        expr.test('a'); expr.test('e'); expr.test('');
    },
    RegExp: () => {
        const expr = /.+/gm;
        expr.test('a'); expr.test('e'); expr.test('');
    },
};

benchmarks['anyOf|any'] = {
    VerEx: () => {
        const expr = VerEx().anyOf(['a', 'b', 'c']);
        expr.test('b'); expr.test('f');
    },
    RegExp: () => {
        const expr = /[abc]/gm;
        expr.test('b'); expr.test('f');
    },
};

benchmarks.not = {
    VerEx: () => {
        const expr = VerEx().not('foo');
        expr.test('foo'); expr.test('bar');
    },
    RegExp: () => {
        const expr = /(!=foo)/gm;
        expr.test('foo'); expr.test('bar');
    },
};

benchmarks.range = {
    VerEx: () => {
        const expr = VerEx().range(0, 9, 'a', 'f');
        expr.test('d'); expr.test('g');
    },
    RegExp: () => {
        const expr = /[0-9a-f]/gm;
        expr.test('d'); expr.test('g');
    },
};

benchmarks['lineBreak|br'] = {
    VerEx: () => {
        const expr = VerEx().lineBreak();
        expr.test('\n'); expr.test('lf');
    },
    RegExp: () => {
        const expr = /\r\n|\r|\n/gm;
        expr.test('\n'); expr.test('lf');
    },
};

benchmarks.tab = {
    VerEx: () => {
        const expr = VerEx().tab();
        expr.test('\t'); expr.test('tab');
    },
    RegExp: () => {
        const expr = /\t/gm;
        expr.test('\t'); expr.test('tab');
    },
};

benchmarks.word = {
    VerEx: () => {
        const expr = VerEx().word();
        expr.test('word_1'); expr.test('@#!$');
    },
    RegExp: () => {
        const expr = /\w+/gm;
        expr.test('word_1'); expr.test('@#!$');
    },
};

benchmarks.digit = {
    VerEx: () => {
        const expr = VerEx().digit();
        expr.test('3'); expr.test('a');
    },
    RegExp: () => {
        const expr = /\w+/gm;
        expr.test('3'); expr.test('a');
    },
};

benchmarks.whitespace = {
    VerEx: () => {
        const expr = VerEx().whitespace();
        expr.test(' '); expr.test('w');
    },
    RegExp: () => {
        const expr = /\s/gm;
        expr.test(' '); expr.test('w');
    },
};

todo.addModifier = { VerEx: () => {}, RegExp: () => {} };
todo.removeModifier = { VerEx: () => {}, RegExp: () => {} };
todo.withAnyCase = { VerEx: () => {}, RegExp: () => {} };
todo.stopAtFirst = { VerEx: () => {}, RegExp: () => {} };
todo.searchOneLine = { VerEx: () => {}, RegExp: () => {} };
todo.repeatPrevious = { VerEx: () => {}, RegExp: () => {} };
todo.oneOrMore = { VerEx: () => {}, RegExp: () => {} };
todo.multiple = { VerEx: () => {}, RegExp: () => {} };
todo.capture = { VerEx: () => {}, RegExp: () => {} };
todo.replace = { VerEx: () => {}, RegExp: () => {} };

benchmarks.toRegExp = {
    VerEx: () => { const expr = VerEx.find('foo').toRegExp(); },
    RegExp: () => { const expr = /foo/gm; },
};

const suite = new Suite();

for (const [name, bench] of Object.entries(benchmarks)) {
    const VerExRun = bench.VerEx;
    const RegExpRun = bench.RegExp;

    suite
        .add(`VerEx  ${name}`, VerExRun)
        .add(`RegExp ${name}`, RegExpRun);
}

const tableData = [];

tableData.push([
    bold('Description'), bold('Time'), bold('Uncertainty'),
]);

suite.on('cycle', (event) => {
    const { name, stats } = event.target;

    tableData.push([
        name,
        prettyMs(stats.mean * 1000, { formatSubMs: true }),
        `±${stats.rme.toFixed(2)}%`,
    ]);
});

suite.run();

const tableConfig = {
    // Draw a line for the 0-th index and every odd index
    drawHorizontalLine: index => index === 0 || index % 2 !== 0,
};

console.log(table(tableData, tableConfig));
