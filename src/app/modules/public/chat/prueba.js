const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://10.8.8.81:9010",{
    username: 'crmops',
    password: 'crm@&0ps)#',
    clientId: 'mqttx_597046f5'
});

client.on("connect", () => {
  client.subscribe("crmchat_RECIVE", (err) => {
    if (!err) {
      client.publish("crmchat_SEND", "U2FsdGVkX1/K+gOmVyatKQae7EnP0aXIjRpwjprWDD9YEp88myo8l5cZIGuDNyKaG9FIB6qPMSZEFIpIeIbdUzKD75/8sYkTQcXoNN2fxc3z3MHKF2oNfA68BUmEIKbcFDBs17UEAfZNS1xV0royG09xMtRBTc9l6n1J7UbwVQ0=");
    }
  });
});

client.on("message", (topic, message) => {
  // message is Buffer
  console.log(topic + " " + message.toString());
  client.end();
});