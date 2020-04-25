function Root(s) {
  let lines = s.split('\n');
  return lines.map(line => Line(line)).join('\n');
}

function Line(s) {
  // .replace(/\s+/g, ' ')
  if (s.trim().length === 0) return '\\\\';
  return s.split(' ').map(line => Expression(line)).join(' ');
}

function Expression(s) {
  if (s.length === 1) {
    return Char(s);
  } else if (s.match(/^\((.*)\)$/) && checkParenthesesWrap(s, '(', ')')) { //visible brackets
    return Brackets(s.slice(1, -1));
  } else if (s.match(/^\{(.*)\}$/) && checkParenthesesWrap(s, '{', '}')) { //invisible brackets
    return InvisibleBrackets(s.slice(1, -1));
  } else if (s.includes('/')) {
    let matches = s.match(/^(.*)\/(.*)$/);
    return Fraction(matches[1], matches[2]);
  } else if (s.startsWith('$')) {
    return Command(s.slice(1));
  }
  // else return "**" + s + "**";
  else return s;
}

// checks whether there are mathing parentheses at top level
function checkParenthesesWrap(source, open, close) {
  if (!(source.startsWith(open) && source.endsWith(close))) return false;

  let counter = 1;
  for (let c of source.slice(1, -1).split('')) {
    if (c === open) counter++;
    else if (c === close) counter--;
    if (counter === 0) return false;
  }
  return counter === 1;
}

function Brackets(s) {
  return '\\left(' + Expression(s) + '\\right)';
}

function InvisibleBrackets(s) {
  return Expression(s);
}

function Char(s) {
  switch (s) {
    case '*':
      return '\\cdot';
    default:
      return s;
  }
}

function Command(s) {
  // if (s.includes('{')) { //has arguments
  let name = s.includes('{') ? s.slice(0, s.indexOf('{')) : s;
  let args = s.substring(s.indexOf('{')).slice(1, -1).split('}{');
  // } else {
  // let name = s;
  // }
  switch (name) {
    case 'mat':
      {
        let columns = args[0].split(',').map(c => Expression(c.trim()));
        return `\\begin{pmatrix} ${columns.join(' \\\\ ')} \\end{pmatrix}`;
      }
    default:
      return '?CMD?';
  }
}

function Vector(s) {
  return `\\vec{${s}}`;
}

function TexChar(s) {
  return `\\${s}`;
}

function Fraction(top, bottom) {
  return `\\frac{${Expression(top)}}{${Expression(bottom)}}`;
}

const REPLACEMENTS = [{
    id: 'ROOT',
    search: /ROOT\[(.*)\]/g,
    replace: (_, c) => Root(c),
  },

  {
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
  console.log(REPLACEMENTS);
  // for (let r of REPLACEMENTS) {
  //   if (r.replace) input = input.replace(r.search, r.replace);
  //   // else if (r.cb) input = cb(input);
  // }
  return Root(input);
  // return input;
}
