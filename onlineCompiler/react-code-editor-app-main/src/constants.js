export const LANGUAGE_VERSIONS = {
  javascript: "18.15.0",
  typescript: "5.0.3",
  python: "3.10.0",
  java: "15.0.2",
  csharp: "6.12.0",
  php: "8.2.3",
  Rust:"1.78.0",
  Solidity :"v0.8.0+commit.c7dfd78e",
  Motoko :"0.11.0"
};
export const LANGUAGE_INFO = {
  javascript: {
    extensions: [".js", ".jsx"],
    version: "18.15.0"
  },
  typescript: {
    extensions: [".ts", ".tsx"],
    version: "5.0.3"
  },
  python: {
    extensions: [".py"],
    version: "3.10.0"
  },
  java: {
    extensions: [".java"],
    version: "15.0.2"
  },
  csharp: {
    extensions: [".cs"],
    version: "6.12.0"
  },
  php: {
    extensions: [".php"],
    version: "8.2.3"
  },
  rust: {
    extensions: [".rs"],
    version: "1.78.0"
  },
  solidity: {
    extensions: [".sol"],
    version: "0.8.25"
  },
  motoko: {
    extensions: [".mo"],
    version: "0.11.0"
  }
};

export const CODE_SNIPPETS = {
  javascript: `\nfunction greet(name) {\n\tconsole.log("Hello, " + name + "!");\n}\n\ngreet("Alex");\n`,
  typescript: `\ntype Params = {\n\tname: string;\n}\n\nfunction greet(data: Params) {\n\tconsole.log("Hello, " + data.name + "!");\n}\n\ngreet({ name: "Alex" });\n`,
  python: `\ndef greet(name):\n\tprint("Hello, " + name + "!")\n\ngreet("Alex")\n`,
  java: `\npublic class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World");\n\t}\n}\n`,
  csharp:
    'using System;\n\nnamespace HelloWorld\n{\n\tclass Hello { \n\t\tstatic void Main(string[] args) {\n\t\t\tConsole.WriteLine("Hello World in C#");\n\t\t}\n\t}\n}\n',
  php: "<?php\n\n$name = 'Alex';\necho $name;\n",
};
