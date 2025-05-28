export interface IApiEndpointAsync<TResponse> {
    executeAsync(...args: unknown[]): Promise<TResponse>;
}
