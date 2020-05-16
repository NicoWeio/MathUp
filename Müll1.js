import balanced from 'node-balanced';
function checkBalanced(source, open, close) {
  return balanced.matches({
    source,
    open,
    close,
    balance: true
  }) !== null;
}


const REPLACEMENTS = [
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
