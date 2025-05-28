import { writeFile } from 'fs/promises';
import { join } from 'path';
import chalk from 'chalk';

interface LoremOptions {
  output: string;
  paragraphs: string;
}

const LOREM_PARAGRAPHS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
  'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
  'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.'
];

export async function generateLoremIpsum(options: LoremOptions): Promise<void> {
  const numParagraphs = Math.min(
    Math.max(1, parseInt(options.paragraphs, 10)),
    LOREM_PARAGRAPHS.length
  );

  console.log(chalk.blue('Generating Lorem Ipsum file...'));
  console.log(chalk.gray(`Paragraphs: ${numParagraphs}`));
  console.log(chalk.gray(`Output: ${options.output}`));

  const selectedParagraphs = LOREM_PARAGRAPHS
    .slice(0, numParagraphs)
    .join('\n\n');

  const outputPath = join(process.cwd(), options.output);

  try {
    await writeFile(outputPath, selectedParagraphs, 'utf-8');
  } catch (error) {
    throw new Error(`Failed to write file: ${(error as Error).message}`);
  }
} 