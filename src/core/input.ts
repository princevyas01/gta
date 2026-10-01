export interface InputState {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  sprint: boolean;
  jump: boolean;
  jumpPressed: boolean;
  crouch: boolean;
  interact: boolean;
  interactPressed: boolean;
  reload: boolean;
  reloadPressed: boolean;
  fire: boolean;
  aim: boolean;
  weaponWheel: boolean;
  toggleMap: boolean;
  togglePhone: boolean;
  toggleDebug: boolean;
  cycleCamera: boolean;
  weaponSlot: number | null;
  mouseX: number;
  mouseY: number;
  isPointerLocked: boolean;
}

export class InputManager {
  public readonly state: InputState = {
    forward: false,
    backward: false,
    left: false,
    right: false,
    sprint: false,
    jump: false,
    jumpPressed: false,
    crouch: false,
    interact: false,
    interactPressed: false,
    reload: false,
    reloadPressed: false,
    fire: false,
    aim: false,
    weaponWheel: false,
    toggleMap: false,
    togglePhone: false,
    toggleDebug: false,
    cycleCamera: false,
    weaponSlot: null,
    mouseX: 0,
    mouseY: 0,
    isPointerLocked: false
  };

  private targetElement: HTMLElement | null = null;
  private attached = false;

  private readonly onKeyDown = (e: KeyboardEvent) => this.handleKeyDown(e);
  private readonly onKeyUp = (e: KeyboardEvent) => this.handleKeyUp(e);
  private readonly onMouseDown = (e: MouseEvent) => this.handleMouseDown(e);
  private readonly onMouseUp = (e: MouseEvent) => this.handleMouseUp(e);
  private readonly onMouseMove = (e: MouseEvent) => this.handleMouseMove(e);
  private readonly onBlur = () => this.resetHeldInputs();
  private readonly onVisibility = () => {
    if (typeof document !== 'undefined' && document.hidden) {
      this.resetHeldInputs();
    }
  };
  private readonly onPointerLock = () => {
    if (typeof document !== 'undefined') {
      this.state.isPointerLocked = document.pointerLockElement === this.targetElement;
      if (!this.state.isPointerLocked) {
        this.state.mouseX = 0;
        this.state.mouseY = 0;
        this.state.fire = false;
        this.state.aim = false;
      }
    }
  };

  public attach(element: HTMLElement): void {
    this.detach();
    this.targetElement = element;
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', this.onKeyDown, { passive: false });
      window.addEventListener('keyup', this.onKeyUp);
      window.addEventListener('mousedown', this.onMouseDown);
      window.addEventListener('mouseup', this.onMouseUp);
      window.addEventListener('mousemove', this.onMouseMove);
      window.addEventListener('blur', this.onBlur);
    }
    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', this.onVisibility);
      document.addEventListener('pointerlockchange', this.onPointerLock);
    }
    this.attached = true;
  }

  public detach(): void {
    if (!this.attached) return;
    if (typeof window !== 'undefined') {
      window.removeEventListener('keydown', this.onKeyDown);
      window.removeEventListener('keyup', this.onKeyUp);
      window.removeEventListener('mousedown', this.onMouseDown);
      window.removeEventListener('mouseup', this.onMouseUp);
      window.removeEventListener('mousemove', this.onMouseMove);
      window.removeEventListener('blur', this.onBlur);
    }
    if (typeof document !== 'undefined') {
      document.removeEventListener('visibilitychange', this.onVisibility);
      document.removeEventListener('pointerlockchange', this.onPointerLock);
    }
    this.resetHeldInputs();
    this.flush();
    this.targetElement = null;
    this.attached = false;
  }

  public requestPointerLock(): void {
    if (!this.targetElement || this.state.isPointerLocked) return;
    const target = this.targetElement;
    try {
      const result = (target.requestPointerLock as unknown as (options?: { unadjustedMovement?: boolean }) => Promise<void> | void)({
        unadjustedMovement: true
      });
      if (result && typeof (result as Promise<void>).catch === 'function') {
        void (result as Promise<void>).catch(() => {
          // Graceful fallback to standard requestPointerLock
          try {
            target.requestPointerLock();
          } catch {
            // Ignored
          }
        });
      }
    } catch {
      try {
        target.requestPointerLock();
      } catch {
        // User gesture or browser support may be required
      }
    }
  }

  public releasePointerLock(): void {
    if (typeof document !== 'undefined' && document.pointerLockElement === this.targetElement) {
      document.exitPointerLock();
    }
  }

  public queueInteract(): void {
    this.state.interactPressed = true;
  }

  public queueJump(): void {
    this.state.jumpPressed = true;
  }

  public queueFire(): void {
    this.state.fire = true;
  }

  public releaseQueuedFire(): void {
    this.state.fire = false;
  }

  private handleKeyDown(e: KeyboardEvent): void {
    if (this.isTypingTarget(e.target)) return;

    switch (e.code) {
      case 'KeyW':
      case 'ArrowUp':
        this.state.forward = true;
        break;
      case 'KeyS':
      case 'ArrowDown':
        this.state.backward = true;
        break;
      case 'KeyA':
      case 'ArrowLeft':
        this.state.left = true;
        break;
      case 'KeyD':
      case 'ArrowRight':
        this.state.right = true;
        break;
      case 'ShiftLeft':
      case 'ShiftRight':
        this.state.sprint = true;
        break;
      case 'Space':
        if (!this.state.jump) this.state.jumpPressed = true;
        this.state.jump = true;
        e.preventDefault();
        break;
      case 'KeyC':
        this.state.crouch = true;
        break;
      case 'KeyE':
      case 'KeyF':
        if (!this.state.interact) this.state.interactPressed = true;
        this.state.interact = true;
        break;
      case 'KeyR':
        if (!this.state.reload) this.state.reloadPressed = true;
        this.state.reload = true;
        break;
      case 'Tab':
        this.state.weaponWheel = true;
        e.preventDefault();
        break;
      case 'KeyM':
        if (!e.repeat) this.state.toggleMap = true;
        break;
      case 'KeyP':
        if (!e.repeat) this.state.togglePhone = true;
        break;
      case 'F3':
        if (!e.repeat) this.state.toggleDebug = true;
        break;
      case 'KeyV':
        if (!e.repeat) this.state.cycleCamera = true;
        break;
      case 'Digit1':
        this.state.weaponSlot = 0;
        break;
      case 'Digit2':
        this.state.weaponSlot = 1;
        break;
      case 'Digit3':
        this.state.weaponSlot = 2;
        break;
      case 'Digit4':
        this.state.weaponSlot = 3;
        break;
      case 'Digit5':
        this.state.weaponSlot = 4;
        break;
      case 'Digit6':
        this.state.weaponSlot = 5;
        break;
    }
  }

  private handleKeyUp(e: KeyboardEvent): void {
    switch (e.code) {
      case 'KeyW':
      case 'ArrowUp':
        this.state.forward = false;
        break;
      case 'KeyS':
      case 'ArrowDown':
        this.state.backward = false;
        break;
      case 'KeyA':
      case 'ArrowLeft':
        this.state.left = false;
        break;
      case 'KeyD':
      case 'ArrowRight':
        this.state.right = false;
        break;
      case 'ShiftLeft':
      case 'ShiftRight':
        this.state.sprint = false;
        break;
      case 'Space':
        this.state.jump = false;
        break;
      case 'KeyC':
        this.state.crouch = false;
        break;
      case 'KeyE':
      case 'KeyF':
        this.state.interact = false;
        break;
      case 'KeyR':
        this.state.reload = false;
        break;
      case 'Tab':
        this.state.weaponWheel = false;
        break;
    }
  }

  private handleMouseDown(e: MouseEvent): void {
    if (e.button === 0 && this.state.isPointerLocked) {
      this.state.fire = true;
    }
    if (e.button === 2 && this.state.isPointerLocked) {
      this.state.aim = true;
      e.preventDefault();
    }
  }

  private handleMouseUp(e: MouseEvent): void {
    if (e.button === 0) this.state.fire = false;
    if (e.button === 2) this.state.aim = false;
  }

  private handleMouseMove(e: MouseEvent): void {
    if (!this.state.isPointerLocked) return;
    this.state.mouseX += e.movementX;
    this.state.mouseY += e.movementY;
  }

  private isTypingTarget(target: EventTarget | null): boolean {
    const el = target as HTMLElement | null;
    if (!el) return false;
    return el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable;
  }

  public resetHeldInputs(): void {
    this.state.forward = false;
    this.state.backward = false;
    this.state.left = false;
    this.state.right = false;
    this.state.sprint = false;
    this.state.jump = false;
    this.state.crouch = false;
    this.state.interact = false;
    this.state.reload = false;
    this.state.fire = false;
    this.state.aim = false;
    this.state.weaponWheel = false;
  }

  public flush(): void {
    this.state.mouseX = 0;
    this.state.mouseY = 0;
    this.state.jumpPressed = false;
    this.state.interactPressed = false;
    this.state.reloadPressed = false;
    this.state.toggleMap = false;
    this.state.togglePhone = false;
    this.state.toggleDebug = false;
    this.state.cycleCamera = false;
    this.state.weaponSlot = null;
  }
}

export const inputManager = new InputManager();
