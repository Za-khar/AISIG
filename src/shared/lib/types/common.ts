type TEnumerate<
  N extends number,
  Acc extends number[] = [],
> = Acc['length'] extends N
  ? Acc[number]
  : TEnumerate<N, [...Acc, Acc['length']]>

export type TIntRange<F extends number, T extends number> = Exclude<
  TEnumerate<T>,
  TEnumerate<F>
>
