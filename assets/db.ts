const { ccclass, property } = cc._decorator;

@ccclass
export default class DB extends cc.Component {

    @property([cc.Prefab])
    prefabs: cc.Prefab[] = [];

    @property({ type: cc.Node, visible: false })
    slotNode: cc.Node = null;

    @property()
    slotName: string = "dao";

    private curIndex = 0;
    start() {
        if (this.slotName) {
            const fullName = `ATTACHED_NODE:${this.slotName}`;
            this.node.walk((node: cc.Node) => {
                if (node.name === fullName) {
                    this.slotNode = node;
                }
            }, null);
            if (!this.slotNode) {
                return;
            }
        }
        const len = this.prefabs.length;
        this.node.on(cc.Node.EventType.TOUCH_START, () => {
            if (!this.slotNode) {
                return;
            }
            if (this.curIndex >= len) {
                this.curIndex = 0;
            }
            this.slotNode.destroyAllChildren();
            const prefab = this.prefabs[this.curIndex];
            const newNode = cc.instantiate(prefab);
            newNode.parent = this.slotNode;
            this.curIndex++;
        });
    }

}
