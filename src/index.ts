// Imports
import * as process from 'process';
import PageCreator from './PageCreator';


// Setting project root
const __baseDir = "./source";//__dirname.replace(/\/source.*/gi, "");

// Setting config options
const outputDir =  "./dist";

export default class Start {
    public static async bootstrap() {
        let buildTimeStart = process.hrtime();

		const pageCreator = new PageCreator(__baseDir, outputDir);
		pageCreator.buildSite();

//		let buildTimeStop = process.hrtime(buildTimeStart);
		// Logger.success(
		// 	`Built the wiki in ${Formatter.blockquote(`~${Math.round(
		// 		buildTimeStop[0] * 1000 + buildTimeStop[1] / 1000000,
		// 	)}ms`)}`,
		// );
		// runServer();
    }
}

(async () => {
   
    await Start.bootstrap();
})();