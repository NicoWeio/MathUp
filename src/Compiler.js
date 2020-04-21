function Vector(s) {
  return `\\vec{${s}}`;
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
    id: 'lower',
    search: /_(.*?)\b/g,
    replace: "_{$1}",
  },

];

export default function compiler(input) {
  for (let r of REPLACEMENTS) {
    if (r.replace) input = input.replace(r.search, r.replace);
    // else if (r.cb) input = cb(input);
  }
  return input;
}
