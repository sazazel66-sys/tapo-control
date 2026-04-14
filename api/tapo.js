export default async function handler(req, res) {
  try {
    const loginResp = await fetch("https://eu-wap.tplinkcloud.com", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({method: "login",params: {appType: "Tapo_Android",cloudUserName: "navepresenti@gmail.com",cloudPassword: "Presenti1",terminalUUID: "12345678-1234-1234-1234-123456789abc"}})
    });
    const loginData = await loginResp.json();
    const token = encodeURIComponent(loginData.result.token);
    const resp = await fetch("https://eu-wap.tplinkcloud.com?token=" + token, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({method: "getDeviceList"})
    });
    const data = await resp.json();
    res.json(data);
  } catch(e) {
    res.status(500).json({error: e.message});
  }
}
