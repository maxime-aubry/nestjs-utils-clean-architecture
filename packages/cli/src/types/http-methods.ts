export const HTTP_METHODS: readonly string[] = ['get', 'post', 'put', 'patch', 'delete'] as const;
export type HttpMethod = typeof HTTP_METHODS[number];
