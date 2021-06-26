const langMap: Map<string, string> = new Map();
export const versionMap: Map<string, string> = new Map();
export const langArr = [
  "abap",
  "apex",
  "azcli",
  "bat",
  "bicep",
  "cameligo",
  "clojure",
  "coffee",
  "cpp",
  "csharp",
  "csp",
  "css",
  "dart",
  "dockerfile",
  "ecl",
  "elixir",
  "fsharp",
  "go",
  "graphql",
  "handlebars",
  "hcl",
  "html",
  "ini",
  "java",
  "javascript",
  "json",
  "julia",
  "kotlin",
  "less",
  "lexon",
  "liquid",
  "lua",
  "m3",
  "markdown",
  "mips",
  "msdax",
  "mysql",
  "objective-c",
  "pascal",
  "pascaligo",
  "perl",
  "pgsql",
  "php",
  "postiats",
  "powerquery",
  "powershell",
  "pug",
  "python",
  "r",
  "razor",
  "redis",
  "redshift",
  "restructuredtext",
  "ruby",
  "rust",
  "sb",
  "scala",
  "scheme",
  "scss",
  "shell",
  "solidity",
  "sophia",
  "sql",
  "st",
  "swift",
  "systemverilog",
  "tcl",
  "twig",
  "typescript",
  "vb",
  "xml",
  "yaml",
];
langMap.set("js", "javascript");
langMap.set("rs", "rust");
langMap.set("ts", "typescript");
langMap.set("py", "python");
langMap.set("json", "json");
langMap.set("java", "java");
langMap.set("cpp", "c++");
langMap.set("css", "css");
langMap.set("html", "html");

versionMap.set("js", "15.10");
versionMap.set("rs", "1.5");
versionMap.set("ts", "4.2");
versionMap.set("py", "3.9");
versionMap.set("java", "15");
versionMap.set("cpp", "10");

export default langMap;
