export interface Action<T> {
  get();
  set(data: T);
}
