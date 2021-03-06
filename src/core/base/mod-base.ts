abstract class ModBase {
    priority: number = 1;
    mounted() { }
    fixedUpdate() {
        // draw at fixed fps
    }
    update() {
        // draw at synced fps
    }
    diposed() {
        // when mod is removed from stage
    }

}
export default ModBase;