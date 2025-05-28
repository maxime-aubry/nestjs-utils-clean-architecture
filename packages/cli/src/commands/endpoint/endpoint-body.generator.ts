import { writeFile } from "fs/promises";
import { Generator, GeneratorOptions } from "../generator";

export interface EndpointRequestGeneratorOptions extends GeneratorOptions {
    bodyType: string;
};

export class EndpointRequestGenerator extends Generator<EndpointRequestGeneratorOptions> {
    constructor(options: EndpointRequestGeneratorOptions) {
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

        export class ${this.options.bodyType} {
            @ApiProperty({ description: "The property", type: 'string', required: true })
            public property!: string;
        };
        `;
        return content;
    }
}
