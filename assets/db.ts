const { ccclass, property } = cc._decorator;

@ccclass
export default class Test extends cc.Component {
  @property()
  atlasName: string = "";

  start() {
    if (!this.atlasName) {
      return;
    }
    this.node.on(cc.Node.EventType.TOUCH_START, () => {
      cc.resources.load(this.atlasName, cc.SpriteAtlas, (err, spAtlas: cc.SpriteAtlas) => {
        if (!err) {
          const armatureName = "yu";
          const armatureDisplay = this.getComponent(dragonBones.ArmatureDisplay);
          this.replaceArmature(armatureDisplay, armatureName, spAtlas);
        }
      }
      );
    })
  }
  /**
   * 
   * @param armatureDisplay 龙骨组件
   * @param armatureName 要替换的龙骨名称
   * @param spAtlas 将指定龙骨的纹理替换为该图集
   */
  private replaceArmature(armatureDisplay: dragonBones.ArmatureDisplay, armatureName: string, spAtlas: cc.SpriteAtlas) {
    const slotArray: dragonBones.Slot[] = armatureDisplay.armature().getSlots();
    const frames = spAtlas.getSpriteFrames();
    for (let i = 0; i < slotArray.length; i++) {
      const slot = slotArray[i];
      slot.displayList.forEach((display) => {
        if (display instanceof dragonBones.Armature) {
          if (display.name === armatureName) {
            frames.forEach(item => {
              const s: any = display.getSlot(item.name);
              if (s) {
                s.setSpriteFrame(item);
              } else {
                cc.log(`can't find any slot use sprite frame: ${item.name}`)
              }
            });
          }
        }
      })
    }
  }
}
