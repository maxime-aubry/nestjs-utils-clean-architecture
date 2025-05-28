export interface IUseCaseAsync<TRequest, TResponse> {
    executeAsync(params: TRequest): Promise<TResponse>;
}
