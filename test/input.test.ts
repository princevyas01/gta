import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { InputManager } from '../src/core/input';

describe('InputManager Architecture & Pulse Semantics', () => {
  let input: InputManager;

  beforeEach(() => {
    input = new InputManager();
  });

  afterEach(() => {
    input.detach();
  });

  it('queues one jump pulse without sticking held jump', () => {
    input.queueJump();
    expect(input.state.jumpPressed).toBe(true);
    expect(input.state.jump).toBe(false);

    input.flush();
    expect(input.state.jumpPressed).toBe(false);
    expect(input.state.jump).toBe(false);
  });

  it('queues one interact pulse without sticking held interact', () => {
    input.queueInteract();
    expect(input.state.interactPressed).toBe(true);
    expect(input.state.interact).toBe(false);

    input.flush();
    expect(input.state.interactPressed).toBe(false);
    expect(input.state.interact).toBe(false);
  });

  it('blur clears held controls', () => {
    input.state.fire = true;
    input.state.forward = true;
    input.state.sprint = true;

    input.resetHeldInputs();

    expect(input.state.fire).toBe(false);
    expect(input.state.forward).toBe(false);
    expect(input.state.sprint).toBe(false);
  });

  it('a single queued interaction consumed across fixed steps triggers exactly once', () => {
    input.queueInteract();

    let triggerCount = 0;
    // Simulate 5 fixed steps in a single render frame
    for (let step = 0; step < 5; step++) {
      if (input.state.interactPressed) {
        triggerCount++;
        input.state.interactPressed = false; // Consumer consumes pulse
      }
    }
    input.flush();

    expect(triggerCount).toBe(1);
    expect(input.state.interactPressed).toBe(false);
    expect(input.state.interact).toBe(false);
  });
});
