export class GameClock {
  public static readonly FIXED_DELTA = 1 / 60;
  public readonly fixedDelta = GameClock.FIXED_DELTA; // 60Hz fixed simulation step

  private lastTime: number = performance.now();
  private accumulator: number = 0;

  // Accelerated time of day (0.0 to 24.0 hours)
  public timeOfDay: number = 14.5; // Afternoon golden hour
  public timeSpeed: number = 24 / 960; // 24 hours per 960 seconds (16 min)

  public isPaused: boolean = false;
  public totalPlayTime: number = 0;

  public update(): { delta: number; fixedSteps: number } {
    const now = performance.now();
    let delta = (now - this.lastTime) / 1000;
    this.lastTime = now;

    // Guard against huge delta spikes from tab switching
    if (delta > 0.1) delta = 0.1;

    if (this.isPaused) {
      return { delta: 0, fixedSteps: 0 };
    }

    this.totalPlayTime += delta;
    this.timeOfDay = (this.timeOfDay + delta * this.timeSpeed) % 24;

    this.accumulator = Math.min(this.accumulator + delta, this.fixedDelta * 5);
    const fixedSteps = Math.min(
      5,
      Math.floor(this.accumulator / this.fixedDelta)
    );
    this.accumulator -= fixedSteps * this.fixedDelta;

    return { delta, fixedSteps };
  }

  public getFormattedTime(): string {
    const hours = Math.floor(this.timeOfDay);
    const minutes = Math.floor((this.timeOfDay - hours) * 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }

  public reset(): void {
    this.lastTime = performance.now();
    this.accumulator = 0;
  }
}

export const gameClock = new GameClock();
