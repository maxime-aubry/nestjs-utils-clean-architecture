import { writeFile } from "node:fs/promises";
import { HttpMethod } from "../../types/http-methods";
import { Generator, GeneratorOptions } from "../generator";
import { EndpointRequestGenerator } from "./endpoint-body.generator";
import { EndpointResponseGenerator } from "./endpoint-response.generator";

export interface EndpointGeneratorOptions extends GeneratorOptions {
    module: string;
    name: string;
    route: string;
    protocol: HttpMethod;
    bodyType?: string;
    responseType: string;
}

export class ApiEndpointGenerator extends Generator<EndpointGeneratorOptions> {
    constructor(options: EndpointGeneratorOptions) {
        super(options);
    }

    public async generateAsync(): Promise<void> {
        const outputPath: string = this.getOutputPath();
        if (this.options.bodyType) await ApiEndpointGenerator.generateRequestAsync(this.options.bodyType, outputPath);
        if (this.options.responseType !== "void") await ApiEndpointGenerator.generateResponseAsync(this.options.responseType, outputPath);
        const content: string = this.fillTemplate();
        await writeFile(outputPath, content, "utf-8");
    }

    private fillTemplate(): string {
        const content: string = `
        import { IApiEndpointAsync } from "@nestjs-utils/clean-architecture";
        import { Controller, Get, Inject } from "@nestjs/common";
        ${this.options.bodyType && `import { ${this.options.bodyType} } from "./${this.options.bodyType}";`}
        ${this.options.responseType !== "void" && `import { ${this.options.responseType} } from "./${this.options.responseType}";`}

        @Controller("${this.options.route}")
        export class ${this.options.name} implements IApiEndpointAsync<${this.options.responseType}> {
            @${ApiEndpointGenerator.getMethod(this.options.protocol)}()
            public async executeAsync(): Promise<${this.options.responseType}> {
            
            }
        }
        `;
        return content;
    }

    private static getMethod(protocol: HttpMethod): string {
        const method: string = `${protocol.charAt(0).toUpperCase()}${protocol.slice(1).toLowerCase()}`;
        return method;
    }

    private static async generateRequestAsync(bodyType: string, path: string): Promise<void> {
        const generator: EndpointRequestGenerator = new EndpointRequestGenerator({
            bodyType,
            path,
        });
        await generator.generateAsync();
    }

    private static async generateResponseAsync(responseType: string, path: string): Promise<void> {
        const generator: EndpointResponseGenerator = new EndpointResponseGenerator({
            responseType,
            path,
        });
        await generator.generateAsync();
    }
}