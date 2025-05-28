import { writeFile } from "fs/promises";
import { Generator, GeneratorOptions } from "../generator";

export interface EndpointResponseGeneratorOptions extends GeneratorOptions {
    responseType: string;
};

export class EndpointResponseGenerator extends Generator<EndpointResponseGeneratorOptions> {
    constructor(options: EndpointResponseGeneratorOptions) {
        super(options);
    }

    public async generateAsync(): Promise<void> {
        const file: string = this.getOutputPath();
        const content: string = this.fillTemplate();
        await writeFile(file, content, "utf-8");
    }

    private fillTemplate(): string {
        const content: string = `
        import { ApiProperty } from "@nestjs/swagger";

        export class ${this.options.responseType} {
            @ApiProperty({ description: "The property", type: 'string', required: true })
            public property!: string;
        };
        `;
        return content;
    }
}
