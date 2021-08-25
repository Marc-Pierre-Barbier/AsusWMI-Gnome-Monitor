# Faustus-Gnome-Monitor
a fan monitor for the asus tuf faustus driver https://github.com/hackbnw/faustus
this simple gnome extension will only display if your laptop support /sys/devices/platform/faustus/throttle_thermal_policy
you can check this by simply doing ```ls /sys/devices/platform/faustus/throttle_thermal_policy``` if there is no error then you are fine.

# Installation
```
mkdir -p ~/.local/share/gnome-shell/extensions/fan_status@Marc-Pierre-Barbier.github.com
git clone https://github.com/Marc-Pierre-Barbier/Faustus-Gnome-Monitor ~/.local/share/gnome-shell/extensions/fan_status@Marc-Pierre-Barbier.github.com
```