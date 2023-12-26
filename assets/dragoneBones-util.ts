// @ts-ignore
const slot_getTexture = dragonBones.CCSlot.prototype.getTexture;
// @ts-ignore
dragonBones.CCSlot.prototype.getTexture = function () {
  if (this._customSpriteFrame) {
    return this._customSpriteFrame.getTexture();
  } else {
    return slot_getTexture.call(this);
  }
};
// @ts-ignore
dragonBones.CCSlot.prototype.setCustomTexture = function (spriteFrame: cc.SpriteFrame) {
  if (!spriteFrame) {
    return;
  }
  this._customSpriteFrame = spriteFrame;
  let texture = spriteFrame.getTexture();
  let textureAtlasWidth = texture.width;
  let textureAtlasHeight = texture.height;
  let region = spriteFrame.getRect();
  let l = region.x / textureAtlasWidth;
  let b = (region.y + region.height) / textureAtlasHeight;
  let r = (region.x + region.width) / textureAtlasWidth;
  let t = region.y / textureAtlasHeight;
  let vfOffset = 0;
  let localVertices = this._localVertices;
  localVertices[vfOffset++] = 0; // 0x
  localVertices[vfOffset++] = 0; // 0y
  localVertices[vfOffset++] = l; // 0u
  localVertices[vfOffset++] = b; // 0v

  localVertices[vfOffset++] = region.width; // 1x
  localVertices[vfOffset++] = 0; // 1y
  localVertices[vfOffset++] = r; // 1u
  localVertices[vfOffset++] = b; // 1v

  localVertices[vfOffset++] = 0; // 2x
  localVertices[vfOffset++] = region.height;; // 2y
  localVertices[vfOffset++] = l; // 2u
  localVertices[vfOffset++] = t; // 2v

  localVertices[vfOffset++] = region.width; // 3x
  localVertices[vfOffset++] = region.height;; // 3y
  localVertices[vfOffset++] = r; // 3u
  localVertices[vfOffset++] = t; // 3v
}