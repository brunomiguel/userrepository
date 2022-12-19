import { Container } from '@pixi/display';
import { Circle } from '@pixi/math';
import { Sprite } from '@pixi/sprite';
import { SmoothGraphics as Graphics} from '@pixi/graphics-smooth';
import '@pixi/mixin-get-child-by-name';
import { colorToPixi } from '../utils/color';
import { NodeStyle } from '../utils/style';
import { TextureCache } from '../texture-cache';

const DELIMETER = '::';
const WHITE = 0xffffff;

const NODE_CIRCLE = 'NODE_CIRCLE';
const NODE_CIRCLE_BORDER = 'NODE_CIRCLE_BORDER';

export function createNode(nodeGfx: Container) {
  // nodeGfx
  nodeGfx.hitArea = new Circle(0, 0);

  // nodeGfx -> nodeCircle
  const nodeCircle = new Sprite();
  nodeCircle.name = NODE_CIRCLE;
  nodeCircle.anchor.set(0.5);
  nodeGfx.addChild(nodeCircle);

  // nodeGfx -> nodeCircleBorder
  const nodeCircleBorder = new Sprite();
  nodeCircleBorder.name = NODE_CIRCLE_BORDER;
  nodeCircleBorder.anchor.set(0.5);
  nodeGfx.addChild(nodeCircleBorder);
}

export function updateNodeStyle(nodeGfx: Container, nodeStyle: NodeStyle, textureCache: TextureCache) {
  let size = nodeStyle.size;
  const nodeOuterSize = size + nodeStyle.border.width;

  const nodeCircleTextureKey = [NODE_CIRCLE, size].join(DELIMETER);
  const nodeCircleTexture = textureCache.get(nodeCircleTextureKey, () => {
    const graphics = new Graphics();
    graphics.beginFill(WHITE, 1.0, true);
    graphics.drawCircle(size, size, size);
    return graphics;
  });

  const nodeCircleBorderTextureKey = [NODE_CIRCLE_BORDER, size, nodeStyle.border.width].join(DELIMETER);
  const nodeCircleBorderTexture = textureCache.get(nodeCircleBorderTextureKey, () => {
    const graphics = new Graphics();
    graphics.lineStyle(nodeStyle.border.width, WHITE);
    graphics.drawCircle(nodeOuterSize, nodeOuterSize, size);
    return graphics;
  });

  // nodeGfx
  (nodeGfx.hitArea as Circle).radius = nodeOuterSize;

  // nodeGfx -> nodeCircle
  const nodeCircle = nodeGfx.getChildByName!(NODE_CIRCLE) as Sprite;
  nodeCircle.texture = nodeCircleTexture;
  [nodeCircle.tint, nodeCircle.alpha] = colorToPixi(nodeStyle.color);

  // nodeGfx -> nodeCircleBorder
  const nodeCircleBorder = nodeGfx.getChildByName!(NODE_CIRCLE_BORDER) as Sprite;
  nodeCircleBorder.texture = nodeCircleBorderTexture;
  [nodeCircleBorder.tint, nodeCircleBorder.alpha] = colorToPixi(nodeStyle.border.color);
}

export function updateNodeVisibility(nodeGfx: Container, zoomStep: number) {
  // nodeGfx -> nodeCircleBorder
  const nodeCircleBorder = nodeGfx.getChildByName!(NODE_CIRCLE_BORDER) as Sprite;
  nodeCircleBorder.visible = nodeCircleBorder.visible && zoomStep >= 1;
}
