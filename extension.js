// Example #1

const {St, Clutter, GLib} = imports.gi
const Main = imports.ui.main
const Mainloop = imports.mainloop
const ByteArray = imports.byteArray

let panelButton;


const statuses = ["auto","fast","silent"]

function init () {
    // Create a Button with "Hello World" text
    panelButton = new St.Bin({
        style_class : "panel-button",
    });

    //Gio.monitor doesn't trigger. maybe it considier throttle_thermal_policy as a device ?
    Mainloop.timeout_add(300, function () { 
        update()
        return true
    });       
    update()
}

function readFile() {
    const array = GLib.file_get_contents("/sys/devices/platform/faustus/throttle_thermal_policy")[1]
    const status = parseInt(ByteArray.toString(array))
    GLib.free(array)
    return status
}

function update() {
    const status = readFile();
    let panelButtonText = new St.Label({
        text : statuses[status],
        y_align: Clutter.ActorAlign.CENTER,
    });
    panelButton.set_child(panelButtonText);
}

function enable () {
    // Add the button to the panel
    Main.panel._rightBox.insert_child_at_index(panelButton, 0);
}

function disable () {
    // Remove the added button from panel
    Main.panel._rightBox.remove_child(panelButton);
}

