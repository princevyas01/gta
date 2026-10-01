import * as RAPIER from '@dimforge/rapier3d-compat';

export interface RaycastHitResult {
  hit: boolean;
  toi: number;
  point: { x: number; y: number; z: number };
  normal: { x: number; y: number; z: number };
}

export class PhysicsWorld {
  public readonly world: RAPIER.World;
  private readonly characterController: RAPIER.KinematicCharacterController;
  private disposed: boolean = false;

  private constructor() {
    this.world = new RAPIER.World({ x: 0, y: -24, z: 0 });
    this.characterController = this.world.createCharacterController(0.02);
    this.characterController.setUp({ x: 0, y: 1, z: 0 });
    this.characterController.setMaxSlopeClimbAngle((Math.PI * 45) / 180);
    this.characterController.setMinSlopeSlideAngle((Math.PI * 30) / 180);
    this.characterController.enableAutostep(0.35, 0.2, true);
  }

  public static async create(): Promise<PhysicsWorld> {
    await RAPIER.init();
    return new PhysicsWorld();
  }

  public step(): void {
    if (this.disposed) return;
    this.world.step();
  }

  public getCharacterController(): RAPIER.KinematicCharacterController {
    return this.characterController;
  }

  public createPlayerControllerBody(pos: [number, number, number]): {
    rigidBody: RAPIER.RigidBody;
    collider: RAPIER.Collider;
  } {
    const bodyDesc = RAPIER.RigidBodyDesc.kinematicPositionBased().setTranslation(pos[0], pos[1], pos[2]);
    const rigidBody = this.world.createRigidBody(bodyDesc);
    // Capsule: halfHeight 0.65, radius 0.35 -> total height ~2.0m, standard human scale
    const colliderDesc = RAPIER.ColliderDesc.capsule(0.65, 0.35);
    const collider = this.world.createCollider(colliderDesc, rigidBody);
    return { rigidBody, collider };
  }

  public setPlayerTranslation(
    body: RAPIER.RigidBody,
    position: [number, number, number]
  ): void {
    if (this.disposed) return;
    body.setNextKinematicTranslation({
      x: position[0],
      y: position[1],
      z: position[2]
    });
  }


  public moveCharacter(
    collider: RAPIER.Collider,
    desiredTranslation: { x: number; y: number; z: number }
  ): { x: number; y: number; z: number; isGrounded: boolean } {
    if (this.disposed) return { x: 0, y: 0, z: 0, isGrounded: false };
    this.characterController.computeColliderMovement(collider, desiredTranslation);
    const computed = this.characterController.computedMovement();
    const isGrounded = this.characterController.computedGrounded();
    return {
      x: computed.x,
      y: computed.y,
      z: computed.z,
      isGrounded
    };
  }

  public castRay(
    origin: { x: number; y: number; z: number },
    dir: { x: number; y: number; z: number },
    maxToi: number = 1000,
    solid: boolean = true
  ): RaycastHitResult | null {
    if (this.disposed) return null;
    const ray = new RAPIER.Ray(origin, dir);
    const hit = this.world.castRayAndGetNormal(ray, maxToi, solid);
    if (!hit) return null;

    const hitPoint = {
      x: origin.x + dir.x * hit.timeOfImpact,
      y: origin.y + dir.y * hit.timeOfImpact,
      z: origin.z + dir.z * hit.timeOfImpact
    };

    return {
      hit: true,
      toi: hit.timeOfImpact,
      point: hitPoint,
      normal: { x: hit.normal.x, y: hit.normal.y, z: hit.normal.z }
    };
  }

  public createStaticCuboid(
    halfX: number,
    halfY: number,
    halfZ: number,
    posX: number,
    posY: number,
    posZ: number
  ): RAPIER.Collider {
    const bodyDesc = RAPIER.RigidBodyDesc.fixed().setTranslation(posX, posY, posZ);
    const rigidBody = this.world.createRigidBody(bodyDesc);
    const colliderDesc = RAPIER.ColliderDesc.cuboid(halfX, halfY, halfZ);
    return this.world.createCollider(colliderDesc, rigidBody);
  }

  public removeCollider(collider: RAPIER.Collider): void {
    if (this.disposed) return;
    try {
      const parent = collider.parent();
      if (parent) {
        this.world.removeRigidBody(parent);
      } else {
        this.world.removeCollider(collider, false);
      }
    } catch {
      // Ignore if already removed
    }
  }

  public dispose(): void {
    if (this.disposed) return;
    this.disposed = true;
    try {
      this.world.free();
    } catch {
      // Ignore free errors on shutdown
    }
  }
}
