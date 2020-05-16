import Compiler from './Compiler.js';

export default function(s) {
  return Document({
    title: 'TEST',
    author: 'TEST',
    date: 'TEST',
    content: Compiler(s),
  })
}

function Document(o) {
  return `\\documentclass{article}
\\usepackage[utf8]{inputenc}

\\usepackage[ngerman]{babel}
\\usepackage[utf8]{inputenc}
\\usepackage[T1]{fontenc}

\\usepackage{amsmath}
\\usepackage{amssymb}
\\usepackage{amsthm}

\\usepackage{physics}

\\title{${o.title}}
\\author{${o.author}}
\\date{${o.date}}

\\begin{document}

\\maketitle

\\section{Test section}

${AlignEnvironment(o.content)}

\\end{document}`
}

function AlignEnvironment(s) {
return `\\begin{align*}
${s}
\\end{align*}`
}
