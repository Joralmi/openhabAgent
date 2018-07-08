exports.interactions = {
  "color" : "adapters:LightColor",
  "color_temperature" : "adapters:LightColor",
  "brightness" : "adapters:Luminance",
  "battery_level" : "adapters:StoredEnergy",
  "battery_low" : "adapters:LowerStateOfChargeBoundary"
}

exports.types = {
  "tradfri:0210" : {"type" : "adapters:Lightbulb", "write" : true},
  "tradfri:0220" : {"type" : "adapters:Lightbulb", "write" : true},
  "tradfri:0830" : {"type" : "adapters:Battery", "write" : false},
}

exports.schema = {
  "Dimmer" : {},
  "Color" : {},
  "Number" : {},
  "Switch" : {}
}
