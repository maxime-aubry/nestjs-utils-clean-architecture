import chalk from 'chalk';
import { Command, Option } from 'commander';
import { ApiEndpointGenerator, EndpointGeneratorOptions } from './commands/endpoint/endpoint.generator';
import { HTTP_METHODS } from './types/http-methods';

const program: Command = new Command();

program
  .name('nutils')
  .description('NestJS Clean Architecture CLI')
  .version('1.0.0');

const generate: Command = program
  .command('generate')
  .alias('g')
  .description('Generate various artifacts')
  .showHelpAfterError('(add --help for additional information)');

generate
  .command('endpoint')
  .alias('e')
  .description('Generate an API endpoint file')
  .requiredOption('-m, --module <module-path>', 'module path')
  .requiredOption('-p, --path <path>', 'endpoint path')
  .requiredOption('-n, --name <name>', 'endpoint name')
  .requiredOption('-r, --route <route>', 'endpoint route')
  .requiredOption('-b, --body <body>', 'endpoint body')
  .requiredOption('-r, --responseType <response-type>', 'endpoint response type', "void")
  .addOption(
    new Option('-pr, --protocol <method>', 'HTTP method')
      .choices(HTTP_METHODS)
      .default('get')
  )
  //.requiredOption('-u, --useCaseName <use-case-name>', 'use case name')
  //.requiredOption('-u, --useCasePath <use-case-path>', 'use case path')
  //.requiredOption('-u, --useCaseRequestType <use-case-request-type>', 'use case request type')
  //.requiredOption('-u, --useCaseResponseType <use-case-response-type>', 'use case response type')
  .action(async (options: EndpointGeneratorOptions) => {
    try {
      const generator: ApiEndpointGenerator = new ApiEndpointGenerator(options);
      await generator.generateAsync();
      console.log(chalk.green('✓ API endpoint file generated successfully!'));
    } catch (error) {
      console.error(chalk.red('Error generating API endpoint file:'), error);
      process.exit(1);
    }
  });

program.parse(); 
