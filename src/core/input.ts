export interface InputState {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  sprint: boolean;
  jump: boolean;
  crouch: boolean;
  interact: boolean; // E or F
  reload: boolean;
  fire: boolean;
  aim: boolean;
  weaponWheel: boolean;
  toggleMap: boolean;
  togglePhone: boolean;
  toggleDebug: boolean;
  cycleCamera: boolean;
  weaponSlot: number | null; // 0 to 5
  mouseX: number;
  mouseY: number;
  isPointerLocked: boolean;
}

export class InputManager {
  public state: InputState = {
    forward: false,
    backward: false,
    left: false,
    right: false,
    sprint: false,
    jump: false,
    crouch: false,
    interact: false,
    reload: false,
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
  private pointerLockedElement: Element | null = null;

  constructor() {
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handlePointerLockChange = this.handlePointerLockChange.bind(this);
  }

  public attach(element: HTMLElement): void {
    this.targetElement = element;
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
    window.addEventListener('mousedown', this.handleMouseDown);
    window.addEventListener('mouseup', this.handleMouseUp);
    window.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('pointerlockchange', this.handlePointerLockChange);
  }

  public detach(): void {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
    window.removeEventListener('mousedown', this.handleMouseDown);
    window.removeEventListener('mouseup', this.handleMouseUp);
    window.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('pointerlockchange', this.handlePointerLockChange);
    this.targetElement = null;
  }

  public requestPointerLock(): void {
    if (this.targetElement && !this.state.isPointerLocked) {
      try {
        this.targetElement.requestPointerLock();
      } catch (e) {
        // Pointer lock might be blocked by browser policy without user gesture
      }
    }
  }

  public releasePointerLock(): void {
    if (document.pointerLockElement) {
      document.exitPointerLock();
    }
  }

  private handlePointerLockChange(): void {
    this.state.isPointerLocked = !!document.pointerLockElement;
  }

  private handleKeyDown(e: KeyboardEvent): void {
    // If typing in an input element, do not capture game hotkeys
    if ((e.target as HTMLElement)?.tagName === 'INPUT' || (e.target as HTMLElement)?.tagName === 'TEXTAREA') {
      return;
    }

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
        this.state.jump = true;
        e.preventDefault();
        break;
      case 'KeyC':
        this.state.crouch = true;
        break;
      case 'KeyE':
      case 'KeyF':
        this.state.interact = true;
        break;
      case 'KeyR':
        this.state.reload = true;
        break;
      case 'Tab':
        this.state.weaponWheel = true;
        e.preventDefault();
        break;
      case 'KeyM':
        this.state.toggleMap = true;
        break;
      case 'KeyP':
      case 'Escape':
        this.state.togglePhone = true;
        break;
      case 'Backquote':
      case 'F3':
        this.state.toggleDebug = true;
        e.preventDefault();
        break;
      case 'KeyV':
        this.state.cycleCamera = true;
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
    if (e.button === 0) {
      this.state.fire = true;
    } else if (e.button === 2) {
      this.state.aim = true;
    }
  }

  private handleMouseUp(e: MouseEvent): void {
    if (e.button === 0) {
      this.state.fire = false;
    } else if (e.button === 2) {
      this.state.aim = false;
    }
  }

  private handleMouseMove(e: MouseEvent): void {
    if (this.state.isPointerLocked) {
      this.state.mouseX += e.movementX;
      this.state.mouseY += e.movementY;
    }
  }

  /**
   * Resets single-frame impulse events (e.g. mouse deltas and toggle triggers)
   */
  public flush(): void {
    this.state.mouseX = 0;
    this.state.mouseY = 0;
    this.state.toggleMap = false;
    this.state.togglePhone = false;
    this.state.toggleDebug = false;
    this.state.cycleCamera = false;
    this.state.weaponSlot = null;
  }
}

export const inputManager = new InputManager();
