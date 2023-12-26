const { ccclass, property } = cc._decorator;
@ccclass("ReplaceData")
class ReplaceData {
  @property(cc.String)
  public spriteFrameName: string = "";
  @property(cc.String)
  public slotName: string = "";
}

@ccclass
export default class Test extends cc.Component {
  @property()
  atlasName: string = "";

  @property({ type: [ReplaceData] })
  data: ReplaceData[] = [];

  start() {
    if (!this.atlasName) {
      return;
    }
    cc.resources.load(this.atlasName, cc.SpriteAtlas, (err, spAtlas: cc.SpriteAtlas) => {
      if (!err) {
        this.data.forEach((item) => {
          this.replaceSlot(spAtlas, item.slotName, item.spriteFrameName);
        });
      }
    }
    );
  }
  private replaceSlot(spAtlas: cc.SpriteAtlas, slotName: string, spriteFrameName: string): boolean {
    if (!slotName || !spriteFrameName) {
      return;
    }
    const spriteFrame = spAtlas.getSpriteFrame(spriteFrameName);
    if (!spriteFrame) {
      console.log(`not find ${spriteFrameName} in ${spAtlas.name}`);
      return false;
    }

    const armatureDisplay = this.getComponent(dragonBones.ArmatureDisplay);
    if (!armatureDisplay) {
      return false;
    }
    const slot = armatureDisplay.armature().getSlot(slotName);

    if (!slot) {
      console.log(`not find ${slotName} in ${armatureDisplay.name}`);
      return false;
    }
    slot.setCustomTexture(spriteFrame);
    return true;
  }
}
