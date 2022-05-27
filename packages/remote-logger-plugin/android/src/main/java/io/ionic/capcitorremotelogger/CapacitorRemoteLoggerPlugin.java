package io.ionic.capcitorremotelogger;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.DataOutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

@CapacitorPlugin(name = "CapacitorRemoteLogger")
public class CapacitorRemoteLoggerPlugin extends Plugin {
    String host = "";
    Integer port = 8942;

    private CapacitorRemoteLogger implementation = new CapacitorRemoteLogger();

    @PluginMethod
    public void initialize(PluginCall call) {
        String hostName = call.getString("hostName");
        Integer portNumber = call.getInt("port");
        host = hostName;
        port = portNumber;
        call.resolve();
    }

    @PluginMethod
    public void write(PluginCall call) throws JSONException {
        String level = call.getString("level");
        String message = call.getString("message");
        JSONObject jsonParam = new JSONObject();
        jsonParam.put("level", level);
        jsonParam.put("message", message);
        String url = "http://" + host + ":" + port.toString() + "/log";
        sendPost(url, jsonParam.toString());
        call.resolve();
    }

    private void sendPost(String urlAddress, String data) {
        Thread thread = new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    URL url = new URL(urlAddress);
                    HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                    conn.setRequestMethod("POST");
                    conn.setRequestProperty("Content-Type", "application/json;charset=UTF-8");
                    conn.setRequestProperty("Accept","application/json");
                    conn.setDoOutput(true);
                    conn.setDoInput(true);

                    DataOutputStream os = new DataOutputStream(conn.getOutputStream());
                    //os.writeBytes(URLEncoder.encode(jsonParam.toString(), "UTF-8"));
                    os.writeBytes(data);
                    os.flush();
                    os.close();
                    conn.disconnect();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });

        thread.start();
    }
}
