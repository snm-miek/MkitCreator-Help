//import { marked, Marked } from 'marked';
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from 'highlight.js';
import * as fs from 'fs';
import * as path from 'path';
//import Logger, { Formatter } from './log';
const marked = new Marked(
    markedHighlight({
      langPrefix: 'hljs language-',
        highlight(code, lang, info) {
         
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language }).value;
      }
    })
  );
export default class PageCreator {
    source: string;
    output: string;

    constructor(sourceDir: string, outputDir: string) {
        this.source = sourceDir;
        this.output = outputDir;
        this.createOutputDir(outputDir);
    }

    createOutputDir(dir: string) {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, {recursive: true});
        } else {
            fs.rmSync(dir, {recursive: true, force: true})
        }
    }

    // pagePath is relative to {output}
    async createPage(pagePath: string) {
        console.log("createPage",pagePath)
        let destinationFile = this.output + '/' + pagePath;
        let sourceFile = this.source + '/' + pagePath;
        if (!fs.existsSync(path.dirname(destinationFile))) {
            fs.mkdirSync(path.dirname(destinationFile), {recursive: true});
        }
        if (path.extname(pagePath) == '.md') {
            // parse md
            let outputFile = destinationFile.replace('.md', '.html');
            outputFile = outputFile.replace(/README/i, 'index');
            let html = await marked.parse(fs.readFileSync(sourceFile).toString());
            






            let fixedLinksHTML = html;
            let mdLinkPattern = new RegExp(/href=".*?"/gi);
            if (fixedLinksHTML.match(mdLinkPattern)) {
                fixedLinksHTML.match(mdLinkPattern).forEach(match => {
                    let newString = match.replace(/\.md/, '.html');
                    newString = newString.replace(/README/i, 'index');
                    fixedLinksHTML = fixedLinksHTML.replace(match, newString);
                });
            }

/*             <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet">
 */            
            fixedLinksHTML = `<html>
            <head>
<link rel="stylesheet" href="st.css">
</head>
<body>${fixedLinksHTML}</body>
            </html>`;
            fs.writeFileSync(outputFile, fixedLinksHTML);
        } else {
            // passthrough other assets
            fs.copyFileSync(sourceFile, destinationFile);
            //Logger.info(`Passed through ${path.basename(pagePath)} ${Formatter.italic('(not a markdown file)')}`);
        }
    }

    buildDirectoryRecursive(workingDir: string) {
        let readDir = this.source + '/' + workingDir;

        fs.readdirSync(readDir, {withFileTypes: true}).forEach(dirEnt => {

            // ignore dotfiles and wiki directory
            if (dirEnt.name.startsWith('.') || dirEnt.name == 'wiki') {
                return;
            }

            if (fs.lstatSync(readDir + '/' + dirEnt.name).isDirectory()) {
                this.buildDirectoryRecursive(workingDir + '/' + dirEnt.name);
            } else {
                this.createPage(workingDir + '/' + dirEnt.name);
            }
        })
    }

    buildSite() {
        this.buildDirectoryRecursive('');
    }
}