exports.interactions = {
  "color" : [{type: "adapters:LightColor", write: true}, {type:"adapters:Luminance", write: true}],
  "color_temperature" : [{type: "adapters:LightColor", write: true}],
  "brightness" : [{type:"adapters:Luminance", write: true}],
  "battery_level" : [{type:"adapters:StoredEnergy", write: false}],
  "battery_low" : [{type:"adapters:LowerStateOfChargeBoundary", write: false}]
};

exports.types = {
  "tradfri:0220" : {"type" : "adapters:Lightbulb", "keywords": ["ikea", "bulb", "dimmable", "white spectrum"]},
  "tradfri:0210" : {"type" : "adapters:Lightbulb", "keywords": ["ikea", "bulb", "dimmable", "color"]},
  "tradfri:0830" : {"type" : "adapters:Battery", "keywords": ["ikea", "controller"]}
};

exports.schema = {
  "Dimmer" :
    {
      "adapters:Luminance" : {"type": "integer", "description": "Integer 0 to 100"},
      "adapters:LightColor": {"type": "integer", "description": "0=coldest, 100=warmest"},
    },
  "Color" :
    {
      "adapters:LightColor": {"type": "integer", "description": "1=red, 10=..."},
      "adapters:Luminance": {"type": "integer", "description": "0=OFF to 100=MAX"}
    },
  "Number" :
    {
      "adapters:StoredEnergy" : {"type": "integer", "description": "Remaining battery in %"}
    },
  "Switch" :
    {
      "adapters:LowerStateOfChargeBoundary" : {"type": "boolean", "description": "On=lowBattery, off=batteryOk"}
    }
};
