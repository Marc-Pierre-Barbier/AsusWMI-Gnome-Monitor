const {St, Clutter, GLib} = imports.gi
const Main = imports.ui.main
const Mainloop = imports.mainloop
const ByteArray = imports.byteArray

let panelButton;
let loopId;
let panelButtonText;

//unstable WILL lead to thermal throttling and is relatively a bad idea
// instead of calling it turbo i through to would be more honest to call it unstable
const statuses = ["performance","unstable","silent","err","loading"]

function init () {

}

function readFile() {
    try {
        const array = GLib.file_get_contents("/sys/devices/platform/asus-nb-wmi/throttle_thermal_policy")[1]
        const status = parseInt(ByteArray.toString(array))
        GLib.free(array)
        return status
    } catch (e) {
        return 3
    }
}

function update() {
    const status = readFile();
    panelButtonText.set_text(statuses[status])
}

function enable () {
    // Add the button to the panel
    panelButton = new St.Bin({
        style_class : "panel-button",
    });
    panelButtonText = new St.Label({
        text : statuses[4],
        y_align: Clutter.ActorAlign.CENTER,
    });
    panelButton.set_child(panelButtonText);

    Main.panel._rightBox.insert_child_at_index(panelButton, 0);

    //Gio.monitor doesn't trigger. maybe it considier throttle_thermal_policy as a device ?
    loopId = Mainloop.timeout_add(300, function () {
        update();
        return GLib.SOURCE_CONTINUE;
    });
    update()
}

function disable () {
    // Remove the added button from panel
    Main.panel._rightBox.remove_child(panelButton);
    GLib.Source.remove(loopId)
    loopId = null
    panelButton = null;
}
