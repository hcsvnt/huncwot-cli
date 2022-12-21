var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import chalk from 'chalk';
import sharp from 'sharp';
import * as fs from 'fs';
import * as path from 'node:path';
import { paths } from './config/paths.js';
import compressionSettings from './config/imageCompressionSettings.js';
const { parse } = path;
export function imageCompression(silent = false) {
    return __awaiter(this, void 0, void 0, function* () {
        const inputDir = paths.images.source;
        const outputDir = paths.images.dest;
        const { inputFormats, outputFormats } = paths.images;
        const toPercent = value => `${100 - Math.round(value * 100)}%`;
        const bytesToMegaBytes = size => Math.floor(size / (Math.pow(1024, 2)) * 100) / 100;
        const getPaths = (dirPath, imagePaths, formats = inputFormats) => {
            imagePaths = imagePaths || [];
            const filePaths = fs.readdirSync(dirPath, { withFileTypes: true });
            filePaths.forEach(filePath => {
                const fileName = parse(filePath.name).base;
                const fileExt = parse(filePath.name).ext;
                if (filePath.isDirectory()) {
                    const outputPath = `${dirPath.replace(inputDir, outputDir)}/${fileName}`;
                    if (!fs.existsSync(outputPath))
                        fs.mkdirSync(outputPath);
                    imagePaths = getPaths(`${dirPath}/${fileName}`, imagePaths);
                }
                else if (formats.includes(fileExt)) {
                    imagePaths.push(`${dirPath}/${fileName}`);
                }
            });
            return imagePaths;
        };
        const getMetadata = (filePath) => __awaiter(this, void 0, void 0, function* () { return sharp(filePath).metadata(); });
        const jpg = (filePath, outputPath) => __awaiter(this, void 0, void 0, function* () {
            yield sharp(filePath)
                .jpeg(compressionSettings.jpg)
                .toFile(outputPath);
        });
        const png = (filePath, outputPath) => __awaiter(this, void 0, void 0, function* () {
            yield sharp(filePath)
                .png(compressionSettings.png)
                .toFile(outputPath);
        });
        const webp = (filePath, extension, outputPath) => __awaiter(this, void 0, void 0, function* () {
            yield sharp(filePath)
                .toFormat('webp')
                .webp(compressionSettings.webp)
                .toFile(outputPath.replace(extension, '.webp'));
        });
        const avif = (filePath, extension, outputPath) => __awaiter(this, void 0, void 0, function* () {
            yield sharp(filePath)
                .toFormat('avif')
                .avif(compressionSettings.avif)
                .toFile(outputPath.replace(extension, '.avif'));
        });
        function runJPG(filePath) {
            return __awaiter(this, void 0, void 0, function* () {
                const outputPath = filePath.replace(inputDir, outputDir);
                return Promise.all([
                    jpg(filePath, outputPath),
                    webp(filePath, '.jpg', outputPath),
                    avif(filePath, '.jpg', outputPath)
                ]);
            });
        }
        function runPNG(filePath) {
            return __awaiter(this, void 0, void 0, function* () {
                const outputPath = filePath.replace(inputDir, outputDir);
                return Promise.all([
                    png(filePath, outputPath),
                    webp(filePath, '.png', outputPath),
                    avif(filePath, '.png', outputPath)
                ]);
            });
        }
        function processImages(filePaths) {
            return __awaiter(this, void 0, void 0, function* () {
                if (!silent)
                    console.log(chalk.green('Image Compression starting up!'));
                const startTime = Date.now();
                for (const filePath of filePaths) {
                    if (!fs.existsSync(filePath.replace(inputDir, outputDir))) {
                        if (!silent)
                            console.log(`Image Compression: processing ${filePath}`);
                        const fileSizeMb = bytesToMegaBytes(fs.statSync(filePath).size);
                        const { width, height } = yield getMetadata(filePath);
                        // even if silent
                        if (width > 2800)
                            console.log(chalk.red(`WARNING!: Image ${filePath} exceeds the recommended 2800px limit at ${width}px \n please reference readme.md for guidance`));
                        if (height > 2800)
                            console.log(chalk.red(`WARNING!: Image ${filePath} exceeds the recommended 2800px limit at ${height}px \n please reference readme.md for guidance`));
                        if (fileSizeMb > 3)
                            console.log(chalk.red(`WARNING!: Image ${filePath} exceeds the recommended 3MB limit at ${fileSizeMb}MB \n please reference readme.md for guidance`));
                        const extension = path.extname(filePath);
                        if (extension === '.jpg')
                            yield runJPG(filePath);
                        else
                            yield runPNG(filePath);
                    }
                }
                const endTime = Date.now();
                return endTime - startTime;
            });
        }
        function compressionRatio(inputPaths, outputPaths) {
            return __awaiter(this, void 0, void 0, function* () {
                const inputSizes = { jpg: 0, png: 0 };
                const outputSizes = { jpg: 0, png: 0, webp: 0, avif: 0 };
                function sumSizes(sizes, paths) {
                    return __awaiter(this, void 0, void 0, function* () {
                        for (const key in sizes) {
                            sizes[key] = paths.filter(path => parse(path).ext === `.${key}`)
                                .map(file => (!fs.statSync(file).size ? 0 : fs.statSync(file).size))
                                .reduce((prev, current) => prev + current, 0);
                        }
                    });
                }
                yield sumSizes(inputSizes, inputPaths);
                yield sumSizes(outputSizes, outputPaths);
                const compressionStats = {
                    jpg: inputSizes.jpg ? toPercent(outputSizes.jpg / inputSizes.jpg) : 'no jpgs',
                    png: inputSizes.png ? toPercent(outputSizes.png / inputSizes.png) : 'no pngs',
                    webp: toPercent(outputSizes.webp / (inputSizes.png + inputSizes.jpg)),
                    avif: toPercent(outputSizes.avif / (inputSizes.png + inputSizes.jpg))
                };
                if (!silent)
                    console.log('Image Compression: file sizes reduced by: ', compressionStats);
                // return compressionStats
            });
        }
        function runCompression() {
            return __awaiter(this, void 0, void 0, function* () {
                const pathsToProcess = getPaths(inputDir);
                yield processImages(pathsToProcess).then(time => {
                    if (!silent)
                        console.log(`Image Compression: all files processed in ${time}ms`);
                    compressionRatio(getPaths(inputDir), getPaths(outputDir, [], outputFormats));
                }).catch(error => console.log(error));
            });
        }
        if (!fs.existsSync(outputDir))
            fs.mkdirSync(outputDir);
        return runCompression();
    });
}
//# sourceMappingURL=old-index.js.map