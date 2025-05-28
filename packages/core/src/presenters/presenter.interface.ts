export type IPresenter<TInput, TOutput> = (input: TInput) => Promise<TOutput>;
