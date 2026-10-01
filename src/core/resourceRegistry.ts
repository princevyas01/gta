export type Disposer = () => void;

export class ResourceRegistry {
  private disposers = new Set<Disposer>();

  public add(disposer: Disposer): void {
    this.disposers.add(disposer);
  }

  public remove(disposer: Disposer): void {
    this.disposers.delete(disposer);
  }

  public disposeAll(): void {
    for (const dispose of this.disposers) {
      try {
        dispose();
      } catch (err) {
        console.warn('[ResourceRegistry] Error during dispose:', err);
      }
    }
    this.disposers.clear();
  }
}
