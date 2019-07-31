/**
 * Used to prevent a usage of type `T` from being inferred in other generics.
 *
 * @example
 * declare function assertEqual<T>(actual: T, expected: NoInfer<T>): boolean
 *
 * @description
 * Type `T` will now only be inferred based on the type of the `actual` param, and
 * the `expected` param is required to be assignable to the type of `actual`.
 * This allows you to give one particular usage of type `T` full control over how the
 * compiler infers type `T`.
 *
 * @see https://github.com/Microsoft/TypeScript/issues/14829#issuecomment-322267089
 */
export type NoInfer<T> = T & {[K in keyof T]: T[K]}
