export class GameClock {
  private lastTime: number = performance.now();
  private accumulator: number = 0;
  private readonly fixedDelta: number = 1 / 60; // 60Hz fixed simulation step
  
  // Accelerated time of day (0.0 to 24.0 hours)
  // Default: 12.0 (Noon). 24 in-game hours elapse every 16 minutes of real time.
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

    this.accumulator += delta;
    let fixedSteps = 0;
    while (this.accumulator >= this.fixedDelta && fixedSteps < 5) {
      this.accumulator -= this.fixedDelta;
      fixedSteps++;
    }

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
