import { join } from "path";

export interface GeneratorOptions {
    path: string;
};

export abstract class Generator<TOptions extends GeneratorOptions> {
    protected readonly options: TOptions;

    constructor(options: TOptions) {
        this.options = options;
    }

    public abstract generateAsync(): Promise<void>;

    protected getOutputPath(): string {
        const outputPath: string = join(process.cwd(), this.options.path);
        return outputPath;
    }
}
