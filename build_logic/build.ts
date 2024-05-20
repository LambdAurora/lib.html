import * as esbuild from "https://deno.land/x/esbuild@v0.21.3/mod.js";
import {httpImports} from "https://deno.land/x/esbuild_serve@1.3.4/features/httpImports.ts";

const SOURCES_DIR = "./lib/";
const ENTRYPOINT = "./mod.ts";

const BUILD_DIR = "dist";
const TSCONFIG = {
	compilerOptions: {
		declaration: true
	}
};

try {
	await Deno.remove(BUILD_DIR, {recursive: true});
} catch(e) {
	if (!(e instanceof Deno.errors.NotFound)) {
		throw e;
	}
}

const files: string[] = [];

for await (const file of Deno.readDir(SOURCES_DIR)) {
	if (file.isFile && file.name.endsWith(".ts")) {
		files.push(SOURCES_DIR + file.name);
	}
}

await esbuild.build({
	entryPoints: [
		ENTRYPOINT,
		...files
	],
	format: "esm",
	bundle: true,
	sourcemap: true,
	outExtension: {
		".js": ".mjs"
	},
	outdir: BUILD_DIR,
	tsconfigRaw: JSON.stringify(TSCONFIG),
	plugins: [
		httpImports(),
		{
			name: "add-mjs",
			setup(build) {
				build.onResolve({filter: /.*/}, args => {
					if (args.importer) {
						return {path: args.path.replace(/\.ts$/, ".mjs"), external: true}
					}
				})
			},
		}
	],
});

await esbuild.build({
	entryPoints: [
		ENTRYPOINT
	],
	format: "esm",
	bundle: true,
	minify: true,
	sourcemap: true,
	outfile: `${BUILD_DIR}/mod.min.mjs`,
	plugins: [httpImports()],
});

await esbuild.stop();
