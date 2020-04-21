function Vector(s) {
  return `\\vec{${s}}`;
}

function TexChar(s) {
  return `\\${s}`;
}

function Fraction(top, bottom) {
  return `\\frac{${top}}{${bottom}}`;
}

const REPLACEMENTS = [{
    id: 'multiply',
    search: /\*/g,
    replace: ` \\cdot `,
  },
  {
    id: 'frac',
    search: /(\b.+?)\s?\/\s?(.+?\b)/g,
    replace: `\\frac{$1}{$2}`,
  },
  // {
  //   id: 'list',
  //   search: /LIST \[(.*?)\]/g,
  //   replace: (match, contents) => {
  //     let list = contents.split(',').map(i => "\\item " + i.trim() + "\n").join('');
  //     return "\\begin{itemize}\n" + list + "\\end{itemize}";
  //   },
  // },
  {
    id: 'vector',
    search: /vec\{(.*?)\}/g,
    replace: (match, contents) => Vector(contents),
  },
  {
    id: 'vector2',
    search: /\$vec(.)/g,
    replace: (match, contents) => Vector(contents),
  },
  {
    id: 'lower',
    search: /_(.*?)\b/g,
    replace: "_{$1}",
  },
  {
    id: 'nabla-to-vec',
    search: /\$Nabla/g,
    replace: Vector('\\nabla'),
  },
  {
    id: 'cross-product',
    search: /kreuz/g,
    replace: TexChar('times'),
  },
  {
    id: 'pmatrix',
    search: /\$mat\{(.*?)\}/g,
    replace: (_, c) => {
      let columns = c.split(',').map(c => c.trim());
      return `\\begin{pmatrix} ${columns.join(' \\\\ ')} \\end{pmatrix}`;
    },
  },
  {
    id: 'partielle-ableitung',
    search: /\$del(.)/g,
    replace: (_, c) => {
      return Fraction('\\partial', `\\partial ${c}`);
    },
  },
  {
    id: 'plusminus',
    search: /\+-/g,
    replace: TexChar('pm'),
  },

];

export default function compiler(input) {
  for (let r of REPLACEMENTS) {
    if (r.replace) input = input.replace(r.search, r.replace);
    // else if (r.cb) input = cb(input);
  }
  return input;
}
