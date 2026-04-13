export default async function handler(req, res) {
  try {
    const action = req.query.action || "on";
    
    const loginResp = await fetch("https://wap.tplinkcloud.com", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        method: "login",
        params: {
          appType: "Tapo_Android",
          cloudUserName: "navepresenti@gmail.com",
          cloudPassword: "Presenti1",
          terminalUUID: "12345678-1234-1234-1234-123456789abc"
        }
      })
    });
    
    const loginData = await loginResp.json();
    const token = encodeURIComponent(loginData.result.token);
    const state = action === "on" ? 1 : 0;
    
    const resp = await fetch("https://eu-wap.tplinkcloud.com?token=" + token, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        method: "passthrough",
        params: {
          deviceId: "80227856C64550113A3799EBF9E2B7C5252BEEC6",
          requestData: JSON.stringify({system: {set_relay_state: {state: state}}})
        }
      })
    });
    
    const data = await resp.json();
    res.json(data);
  } catch(e) {
    res.status(500).json({error: e.message});
  }
}
